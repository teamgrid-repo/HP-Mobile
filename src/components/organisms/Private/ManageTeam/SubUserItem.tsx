import {
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  useIonAlert,
  useIonModal,
  useIonPopover,
  useIonToast,
} from "@ionic/react";
import { ellipsisHorizontal } from "ionicons/icons";
import { memo, useState } from "react";
import { PopoverSubUserItem, ModalEditAdditionalMember } from "src/components/molecules";
import { IProfile, MenuSubUserActionType } from "src/shared";
import { AuthService } from "src/shared/services";
import { deleteAdditionalMemberSuccess } from "src/store/auth";
import { useAppDispatch } from "src/store/config-store";

interface Props {
  item: IProfile;
  presentingElement: HTMLElement | null;
}

const SubUserItem = ({ item, presentingElement }: Props) => {
  const dispatch = useAppDispatch();
  const [presentAlert] = useIonAlert();
  const [presentToast] = useIonToast();
  const [selectedActionType, setSelectedActionType] = useState<MenuSubUserActionType | "">("");
  const [presentSubUserItemP, dismissSubUserItemP] = useIonPopover(PopoverSubUserItem, {
    onDismiss: (data: any, role: MenuSubUserActionType) => dismissSubUserItemP(data, role),
    item,
  });
  const [presentEditAdditionalMemberM, dismissEditAdditionalMemberM] = useIonModal(
    ModalEditAdditionalMember,
    {
      onDismiss: (data: string, role: string) => dismissEditAdditionalMemberM(data, role),
      onEdit: () => setSelectedActionType("Edit"),
      subUser: item,
      actionType: selectedActionType,
    }
  );

  const onOpenPopover = (e: any, item: IProfile) => {
    presentSubUserItemP({
      event: e,
      onDidDismiss: (e: CustomEvent) => {
        if (!item) return;
        const { role } = e.detail;
        if (
          (role as MenuSubUserActionType) === "Edit" ||
          (role as MenuSubUserActionType) === "View"
        ) {
          setSelectedActionType(role);
          if (presentingElement)
            presentEditAdditionalMemberM({ presentingElement: presentingElement });
        } else if ((role as MenuSubUserActionType) === "Resend Invite") {
          presentAlert({
            header: "Resend invite User ?",
            message: "Are you sure you want to invite this user?",
            buttons: [
              { text: "Cancel", role: "cancel" },
              {
                text: "Ok",
                role: "confirm",
                handler: () => {
                  if (item && item.email) {
                    AuthService.resendInvite({ email: item.email })
                      .then((res: any) => {
                        if (res.message) presentToast({ message: res.message, color: "success" });
                      })
                      .catch((error) => {
                        console.error("Error resend invite:", error);
                      })
                      .finally(() => {});
                  }
                },
              },
            ],
          });
        } else if ((role as MenuSubUserActionType) === "Delete") {
          presentAlert({
            header: "Delete User ?",
            message: "Are you sure you want to delete this user?",
            buttons: [
              { text: "Cancel", role: "cancel" },
              {
                text: "Ok",
                role: "confirm",
                handler: () => {
                  if (item && item._id) {
                    AuthService.deleteAdditionalMember(item._id)
                      .then((res: any) => {
                        if (res.success) {
                          dispatch(deleteAdditionalMemberSuccess(item._id));
                        }
                        if (res.message) presentToast({ message: res.message, color: "success" });
                      })
                      .catch((error) => {
                        console.error("Error delete AdditionalMember:", error);
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
        <p>{item.email}</p>
        {item.recText && <p className={`rec-${item.method}`}>{item.recText}</p>}
      </IonLabel>
      {!item.approvalPending || !item.rec ? (
        <IonButton
          className="nopadding-btn mx-0 my-auto"
          fill="clear"
          color="medium"
          onClick={(e) => onOpenPopover(e, item)}
        >
          <IonIcon slot="icon-only" icon={ellipsisHorizontal}></IonIcon>
        </IonButton>
      ) : (
        <></>
      )}
    </IonItem>
  );
};

export default memo(SubUserItem);
