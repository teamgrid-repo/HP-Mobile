import {
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  useIonModal,
  useIonPopover,
  useIonAlert,
  useIonToast,
} from "@ionic/react";
import { ellipsisHorizontal } from "ionicons/icons";
import { memo, useState } from "react";
import {
  PopoverSiteItem,
  ModalEditSiteInfo,
  ModalSiteLocationFilter,
} from "src/components/molecules";
import { IOrganization, ISite, IUserResponse, MenuSiteItemActionType } from "src/shared";
import { AuthService } from "src/shared/services";
import { getSitesRequest } from "src/store/auth";
import { useAppDispatch } from "src/store/config-store";

interface Props {
  item: ISite;
  organization: IOrganization | null;
  currentUser: IUserResponse | null;
  presentingElement: HTMLElement | null;
}

const SiteItem = ({ item, currentUser, organization, presentingElement }: Props) => {
  const dispatch = useAppDispatch();
  const [presentAlert] = useIonAlert();
  const [presentToast] = useIonToast();

  const [selectedActionType, setSelectedActionType] = useState<MenuSiteItemActionType | "">("");
  const [presentSiteItemP, dismissSiteItemP] = useIonPopover(PopoverSiteItem, {
    onDismiss: (data: any, role: MenuSiteItemActionType) => dismissSiteItemP(data, role),
    item,
  });
  const [presentEditSiteInfoM, dismissEditSiteInfoM] = useIonModal(ModalEditSiteInfo, {
    onDismiss: (data: string, role: string) => dismissEditSiteInfoM(data, role),
    onEdit: () => setSelectedActionType("Edit"),
    siteInfo: item,
    actionType: selectedActionType,
  });
  const [presentSiteLocationFilterM, dismissSiteLocationFilterM] = useIonModal(
    ModalSiteLocationFilter,
    {
      onDismiss: (data: string, role: string) => dismissSiteLocationFilterM(data, role),
      siteInfo: item,
    }
  );

  const onOpenPopover = (e: any, item: ISite) => {
    presentSiteItemP({
      event: e,
      onDidDismiss: (e: CustomEvent) => {
        if (!item) return;
        const { role } = e.detail;
        if (
          (role as MenuSiteItemActionType) === "Edit" ||
          (role as MenuSiteItemActionType) === "View"
        ) {
          setSelectedActionType(role);
          if (presentingElement) presentEditSiteInfoM({ presentingElement: presentingElement });
        } else if ((role as MenuSiteItemActionType) === "Details") {
          if (presentingElement)
            presentSiteLocationFilterM({ presentingElement: presentingElement });
        } else if ((role as MenuSiteItemActionType) === "Delete") {
          presentAlert({
            header: "Delete Site ?",
            message: "Are you sure you want to delete this site?",
            buttons: [
              { text: "Cancel", role: "cancel" },
              {
                text: "Ok",
                role: "confirm",
                handler: () => {
                  if (item && item._id) {
                    AuthService.deleteSiteLocation(item._id)
                      .then((res: any) => {
                        if (res.success && organization && currentUser) {
                          dispatch(
                            getSitesRequest({ orgId: organization._id, uid: currentUser._id })
                          );
                        }
                        if (res.message) presentToast({ message: res.message, color: "success" });
                      })
                      .catch((error) => {
                        console.error("Error deleteSiteLocation:", error);
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
        <p>{item.website}</p>
        {(item.approvalPending || item.status) && (
          <p className="rec-delete">{item.status ? "Add Site" : "Edit Site"} Under Approval</p>
        )}
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

export default memo(SiteItem);
