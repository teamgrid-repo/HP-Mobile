import {
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  useIonAlert,
  useIonModal,
  useIonPopover,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import { ellipsisHorizontal, locationOutline } from "ionicons/icons";
import { memo } from "react";
import { ModalGetDirection, PopoverMyProvidersAction } from "src/components/molecules";
import { IDirecotryItem, MenuMyProvidersActionType } from "src/shared";
import { ProviderService } from "src/shared/services";
import { useAppDispatch } from "src/store/config-store";
import { getSavedListingRequest } from "src/store/provider";

interface Props {
  item: IDirecotryItem;
}

const ProviderDirectoryItem = ({ item }: Props) => {
  const dispatch = useAppDispatch();
  const navigation = useIonRouter();
  const [presentAlert] = useIonAlert();
  const [presentToast] = useIonToast();
  const [presentMyProvidersActionP, dismissMyProvidersActionP] = useIonPopover(
    PopoverMyProvidersAction,
    {
      onDismiss: (data: any, role: MenuMyProvidersActionType) =>
        dismissMyProvidersActionP(data, role),
    }
  );
  const [presentGetDirectionM, dismissGetDirectionM] = useIonModal(ModalGetDirection, {
    onDismiss: (data: string, role: string) => dismissGetDirectionM(data, role),
    origin: { lng: item.siteDetails.location.lang, lat: item.siteDetails.location.lat },
  });

  const onOpenPopover = (e: any, item: IDirecotryItem) => {
    presentMyProvidersActionP({
      event: e,
      onDidDismiss: (e: CustomEvent) => {
        if (!item) return;
        const { role } = e.detail;
        if ((role as MenuMyProvidersActionType) === "view provider") {
          navigation.push(
            `/tabs/tab-provider/provider-details/${item.organisationId},${item.siteId}`
          );
        } else if ((role as MenuMyProvidersActionType) === "get directions") {
          presentGetDirectionM({});
        } else if ((role as MenuMyProvidersActionType) === "delete") {
          presentAlert({
            header: "Delete Provider From List ?",
            message: "Are you sure you want to delete this provider from list?",
            buttons: [
              { text: "Cancel", role: "cancel" },
              {
                text: "Ok",
                role: "confirm",
                handler: () => {
                  if (item && item._id) {
                    ProviderService.deleteItemFromList(item._id)
                      .then((res: any) => {
                        if (!res.success && res.message) {
                          presentToast({ message: res.message, color: "danger" });
                          return;
                        }
                        if (res.success && res.message) {
                          presentToast({ message: res.message, color: "success" });
                          dispatch(getSavedListingRequest());
                        }
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
    <IonItem lines="full" className="provider-directory-item">
      <IonLabel>
        <h2>{item.siteDetails.name}</h2>
        <div className="address-item">
          <IonIcon slot="start" icon={locationOutline}></IonIcon>
          <span className="ion-text-wrap">{item.siteDetails.address}</span>
        </div>
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

export default memo(ProviderDirectoryItem);
