import { Share } from "@capacitor/share";
import {
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  useIonAlert,
  useIonPopover,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import { ellipsisHorizontal } from "ionicons/icons";
import { memo } from "react";
import { PopoverSavedItem } from "src/components/molecules";
import { HERPLAN_WEB_URL, ISavedQuiz, MenuSavedActionType } from "src/shared";
import { QuizService } from "src/shared/services";
import { useAppDispatch } from "src/store/config-store";
import { setQuizAnswerState, deleteSavedQuizSuccess } from "src/store/quiz";

interface Props {
  item: ISavedQuiz;
}

const SavedQuizItem = ({ item }: Props) => {
  const dispatch = useAppDispatch();
  const navigation = useIonRouter();
  const [presentAlert] = useIonAlert();
  const [presentToast] = useIonToast();
  const [presentSavedQuizItemP, dismissSavedQuizItemP] = useIonPopover(PopoverSavedItem, {
    onDismiss: (data: any, role: MenuSavedActionType) => dismissSavedQuizItemP(data, role),
  });

  const onOpenPopover = (e: any, item: ISavedQuiz) => {
    presentSavedQuizItemP({
      event: e,
      onDidDismiss: (e: CustomEvent) => {
        if (!item) return;
        const { role } = e.detail;
        if ((role as MenuSavedActionType) === "open") {
          if (item.url) {
            dispatch(setQuizAnswerState(JSON.parse(item.url)));
            navigation.push("/tabs/tab-dashboard/quiz-result");
          }
        } else if ((role as MenuSavedActionType) === "share") {
          console.log("Debug popover dismissed.", `${HERPLAN_WEB_URL}/quiz-result?${item.url}`);
          // `${HERPLAN_WEB_URL}/quiz-result?${item.url}`
          Share.share({
            title: "Share",
            text: `${HERPLAN_WEB_URL}/quiz-result?${item.url}`,
            dialogTitle: "Share with this Quiz",
          })
            .then((res) => {
              presentToast({ message: "Shared.", color: "success" });
            })
            .catch((error) => {});
        } else if ((role as MenuSavedActionType) === "delete") {
          presentAlert({
            header: "Delete Quiz Result ?",
            message: "Are you sure you want to delete this quiz result?",
            buttons: [
              { text: "Cancel", role: "cancel" },
              {
                text: "Ok",
                role: "confirm",
                handler: () => {
                  if (item && item._id) {
                    QuizService.deleteSavedQuiz(item._id)
                      .then((res: any) => {
                        if (res.success) {
                          dispatch(deleteSavedQuizSuccess(item._id));
                        }
                        if (res.message) presentToast({ message: res.message, color: "success" });
                      })
                      .catch((error) => {
                        console.error("Error delete Quiz:", error);
                      })
                      .finally(() => {});
                  }
                },
              },
            ],
          });
        }
      },
    });
  };

  return (
    <IonItem lines="full">
      <IonLabel>
        <h2>{item.name}</h2>
        <p>{item.createdAt}</p>
      </IonLabel>
      <IonButton
        className="nopadding-btn mx-0 my-auto"
        fill="clear"
        color="medium"
        onClick={(e) => onOpenPopover(e, item)}
      >
        <IonIcon slot="icon-only" icon={ellipsisHorizontal}></IonIcon>
      </IonButton>
    </IonItem>
  );
};

export default memo(SavedQuizItem);
