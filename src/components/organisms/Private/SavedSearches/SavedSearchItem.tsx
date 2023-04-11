import {
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  useIonAlert,
  useIonModal,
  useIonPopover,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import { ellipsisHorizontal, locationOutline } from "ionicons/icons";
import { memo } from "react";
import { PopoverSavedSearchAction, ModalSaveSearchAction } from "src/components/molecules";
import { ISaveSearch, MenuSavedSearchActionType } from "src/shared";
import { ProviderService } from "src/shared/services";
import { useAppDispatch } from "src/store/config-store";
import { setFilterRequestState, deleteSavedSearchSuccess } from "src/store/provider";

interface Props {
  item: ISaveSearch;
  presentingElement: HTMLElement | null;
}

const SavedSearchItem = ({ item, presentingElement }: Props) => {
  const dispatch = useAppDispatch();
  const navigation = useIonRouter();
  const [presentAlert] = useIonAlert();
  const [presentToast] = useIonToast();
  const [presentSavedItemP, dismissSavedItemP] = useIonPopover(PopoverSavedSearchAction, {
    onDismiss: (data: any, role: MenuSavedSearchActionType) => dismissSavedItemP(data, role),
  });
  const [presentSaveSearchActionM, dismissSaveSearchActionM] = useIonModal(ModalSaveSearchAction, {
    onDismiss: (data: string, role: string) => dismissSaveSearchActionM(data, role),
    count: item.count || 0,
    url: item.url || "",
    _id: item._id || "",
    oldName: item.name || "",
  });

  const onOpenPopover = (e: any, item: ISaveSearch) => {
    presentSavedItemP({
      event: e,
      onDidDismiss: (e: CustomEvent) => {
        if (!item) return;
        const { role } = e.detail;
        if ((role as MenuSavedSearchActionType) === "open") {
          if (item.url) {
            dispatch(setFilterRequestState(JSON.parse(item.url)));
            navigation.push("/tabs/tab-provider");
          }
        } else if ((role as MenuSavedSearchActionType) === "edit") {
          if (presentingElement)
            presentSaveSearchActionM({
              presentingElement: presentingElement,
            });
        } else if ((role as MenuSavedSearchActionType) === "share") {
          console.log("Debug popover dismissed.", role);
        } else if ((role as MenuSavedSearchActionType) === "delete") {
          presentAlert({
            header: "Delete Search ?",
            message: "Are you sure you want to delete this search?",
            buttons: [
              { text: "Cancel", role: "cancel" },
              {
                text: "Ok",
                role: "confirm",
                handler: () => {
                  if (item && item._id) {
                    ProviderService.deleteSavedSearch(item._id)
                      .then((res: any) => {
                        if (res.success) {
                          dispatch(deleteSavedSearchSuccess(item._id));
                        }
                        if (res.message) presentToast({ message: res.message, color: "success" });
                      })
                      .catch((error) => {
                        console.error("Error deleteSavedSearch:", error);
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
        <IonButton className="nopadding-btn view-map-btn" fill="clear" color="medium">
          <IonIcon slot="start" icon={locationOutline}></IonIcon>
          View Results on Map ({item.count})
        </IonButton>
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

export default memo(SavedSearchItem);
