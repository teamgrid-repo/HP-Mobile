import {
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  useIonModal,
  useIonPopover,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import { ellipsisHorizontal, locationOutline } from "ionicons/icons";
import { Browser } from "@capacitor/browser";
import { IFilterProviderRes, IProviderDetailState, MenuActionType } from "src/shared";
import "./ProviderItem.scss";
import { useSelector } from "react-redux";
import { isLoggedInSelector } from "src/store/auth";
import { useAppDispatch } from "src/store/config-store";
import { setProviderDetailsSuccess } from "src/store/provider";
import { memo, useState } from "react";
import { IconBySiteType } from "src/components/atoms";
import { Share } from "@capacitor/share";
import { PopoverProviderItem, ModalSaveToList } from "src/components/molecules";
import { ModalLogin } from "../../Login";

interface Props {
  item: IFilterProviderRes;
  presentingElement: HTMLElement | null;
}

const ProviderItem = ({ item, presentingElement }: Props) => {
  const dispatch = useAppDispatch();
  const [presentToast] = useIonToast();
  const navigation = useIonRouter();
  const isLoggedIn = useSelector(isLoggedInSelector);

  const [selectedItem, setSelectedItem] = useState<IFilterProviderRes | null>(null);
  const [presentProviderItemP, dismissProviderItemP] = useIonPopover(PopoverProviderItem, {
    onDismiss: (data: any, role: string) => dismissProviderItemP(data, role),
  });
  const [presentLoginM, dismissLoginM] = useIonModal(ModalLogin, {
    onDismiss: (data: string, role: string) => dismissLoginM(data, role),
    title: `You Must Be Logged In to Connect with ${selectedItem?.name}`,
  });
  const [presentSaveToListM, dismissSaveToListM] = useIonModal(ModalSaveToList, {
    onDismiss: (data: string, role: string) => dismissSaveToListM(data, role),
    siteId: selectedItem?._id || "",
    organisationId: selectedItem?.organisationId || "",
  });

  const onOpenPopover = (e: any, item: IFilterProviderRes) => {
    setSelectedItem(item);
    presentProviderItemP({
      event: e,
      onDidDismiss: (e: CustomEvent) => {
        if (!item) return;
        const { role } = e.detail;
        if ((role as MenuActionType) === "save") {
          if (!isLoggedIn && presentingElement) {
            presentLoginM({ presentingElement: presentingElement });
          } else {
            if (presentingElement) presentSaveToListM({ presentingElement: presentingElement });
          }
        } else if ((role as MenuActionType) === "share") {
          Share.share({
            title: "Share",
            text: "Really awesome thing you need to see right now",
            url: "http://ionicframework.com/",
            dialogTitle: "Share with buddies",
          })
            .then((res) => {
              presentToast({ message: "Shared.", color: "tertiary" });
            })
            .catch((error) => {});
        } else if ((role as MenuActionType) === "print") {
          presentToast({ message: "It's in working.", color: "tertiary" });
        }
      },
    });
  };

  const openViewMap = () => {
    if (item.location.lat && item.location.lang) {
      const { lat, lang } = item.location;
      const url = `https://www.google.com/maps/dir/?api=1&origin=${lat},${lang}`;
      Browser.open({ url });
    } else {
      presentToast({ message: `Not found location.`, color: "danger" });
    }
  };

  const openProviderDetail = () => {
    const selectedItem: IProviderDetailState = {
      _id: item._id,
      name: item.name,
      hippa: false,
      totalAssigned: 0,
      website: item.website,
      address: item.address,
      about: "",
      altWebsite: "",
      primaryAccountOwnerInfo: [],
      subProvider: [],
      sitesInfo: [],
    };
    dispatch(setProviderDetailsSuccess(selectedItem));
    if (isLoggedIn) {
      navigation.push(`/tabs/tab-provider/provider-details/${item.organisationId._id},${item._id}`);
    } else {
      navigation.push(`/provider-details/${item.organisationId._id},${item._id}`);
    }
  };

  return (
    <IonItem className="provider-item" lines="full">
      <div className="w-full">
        <div className="flex justify-between space-x-2 pt-3">
          <div className="flex" onClick={openProviderDetail}>
            <div className="flex">
              <IconBySiteType
                homeVisit={item.homeVisit}
                virtual={item.virtual}
                className="provider-logo"
              />
            </div>
            <span className="item-name">{item.name}</span>
          </div>
          <IonButton
            className="nopadding-btn mx-0 my-auto"
            fill="clear"
            color="medium"
            onClick={(e) => onOpenPopover(e, item)}
          >
            <IonIcon slot="icon-only" icon={ellipsisHorizontal}></IonIcon>
          </IonButton>
        </div>
        <IonButton
          className="nopadding-btn view-map-btn"
          fill="clear"
          color="medium"
          onClick={openViewMap}
        >
          <IonIcon slot="start" icon={locationOutline}></IonIcon>
          View on Map
        </IonButton>
        <div className="my-3">
          {item.categoryInfo.map((category) => (
            <IonLabel key={category._id} className="category-name">
              {category.name}
            </IonLabel>
          ))}
        </div>
      </div>
    </IonItem>
  );
};

export default memo(ProviderItem);
