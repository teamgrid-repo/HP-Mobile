import {
  IonList,
  IonListHeader,
  IonLabel,
  IonButton,
  IonIcon,
  useIonModal,
  useIonToast,
} from "@ionic/react";
import { informationCircleOutline } from "ionicons/icons";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ModalHipaaInfo, ModalOptShareDataInfo } from "src/components/molecules";
import { ProfileService } from "src/shared/services";
import { userStateSelector, getUserProfileRequest } from "src/store/auth";
import { useAppDispatch } from "src/store/config-store";
import SettingItem from "./SettingItem";
import "./style.scss";

const SettingList = () => {
  const dispatch = useAppDispatch();
  const [presentToast] = useIonToast();
  const [presentHipaaInfoM, dismissHipaaInfoM] = useIonModal(ModalHipaaInfo, {
    onDismiss: (data: string, role: string) => dismissHipaaInfoM(data, role),
  });
  const [presentOptShareM, dismissOptShareM] = useIonModal(ModalOptShareDataInfo, {
    onDismiss: (data: string, role: string) => dismissOptShareM(data, role),
  });
  const currentUser = useSelector(userStateSelector);
  const [isProcessing, setIsProcessing] = useState(false);
  if (!currentUser) return <></>;
  const { profileId, _id, role, email } = currentUser;

  useEffect(() => {
    if (_id && email && role) {
      dispatch(getUserProfileRequest({ email, role, _id }));
    }
  }, [_id, email, role]);

  const updateProfileData = (field: string, isChecked: boolean, isAllChecked: boolean = false) => {
    const data = isAllChecked
      ? {
          [field]: isChecked,
          appointments: false,
          message: false,
          textMessage: false,
          EmailMessage: false,
          appNotification: false,
        }
      : { [field]: isChecked };
    setIsProcessing(true);
    ProfileService.updateProfile(_id, role, data)
      .then((res: any) => {
        if (res.success && res.data) {
          dispatch(getUserProfileRequest({ email, role, _id }));
          if (res.message) presentToast({ message: res.message, color: "success" });
        }
      })
      .catch((error) => {
        console.error("Error update profile:", error);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <div className="settings-list">
      <IonList lines="none">
        <IonListHeader>
          <IonLabel>Communication Settings</IonLabel>
        </IonListHeader>
        <SettingItem
          label="Appointments"
          field="appointments"
          checked={profileId.appointments}
          disabled={profileId.communication || isProcessing}
          updateProfileData={updateProfileData}
        />
        <SettingItem
          label="Messages"
          field="message"
          checked={profileId.message}
          disabled={profileId.communication || isProcessing}
          updateProfileData={updateProfileData}
        />

        <IonListHeader>
          <IonLabel>Preferred Communication Methods</IonLabel>
        </IonListHeader>
        <SettingItem
          label="Opt-In Text Messages"
          field="textMessage"
          checked={profileId.textMessage}
          disabled={profileId.communication || isProcessing}
          updateProfileData={updateProfileData}
        />
        <SettingItem
          label="Email Message"
          field="EmailMessage"
          checked={profileId.EmailMessage}
          disabled={profileId.communication || isProcessing}
          updateProfileData={updateProfileData}
        />
        <SettingItem
          label="In-app Notifications"
          field="appNotification"
          checked={profileId.appNotification}
          disabled={profileId.communication || isProcessing}
          updateProfileData={updateProfileData}
        />
        <SettingItem
          label="Opt-Out All Communications"
          field="communication"
          checked={profileId.communication}
          disabled={isProcessing}
          updateProfileData={updateProfileData}
          isAllChecked={true}
        />

        {role === "provider" ? (
          <>
            <SettingItem
              label="Org Visible in Search Results"
              field="searchResults"
              checked={profileId.searchResults}
              disabled={isProcessing}
              updateProfileData={updateProfileData}
            />
            <SettingItem
              label="HIPAA-Covered Entity"
              field="hippa"
              checked={profileId.hippa}
              disabled={isProcessing}
              updateProfileData={updateProfileData}
            >
              <IonButton
                fill="clear"
                color="medium"
                onClick={() => presentHipaaInfoM({ cssClass: "hipaa-info-modal" })}
              >
                <IonIcon slot="icon-only" icon={informationCircleOutline} />
              </IonButton>
            </SettingItem>
          </>
        ) : (
          <SettingItem
            label="Opt into sharing your data with providers"
            field="optShareData"
            checked={profileId.optShareData}
            disabled={isProcessing}
            updateProfileData={updateProfileData}
          >
            <IonButton
              fill="clear"
              color="medium"
              onClick={() => presentOptShareM({ cssClass: "opt-share-data-info-modal" })}
            >
              <IonIcon slot="icon-only" icon={informationCircleOutline} />
            </IonButton>
          </SettingItem>
        )}
      </IonList>
    </div>
  );
};

export default SettingList;
