import { IonPage, IonContent, useIonModal } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { BackButton, ProfileImage } from "src/components/atoms";
import { ModalPasswordChange } from "src/components/molecules";
import { ClientProfile, ProfilePageHeader, ProviderProfile } from "src/components/organisms";
import { useDeepEffect } from "src/hooks";
import { getUserProfileRequest, userStateSelector } from "src/store/auth";
import { useAppDispatch } from "src/store/config-store";
import "./style.scss";

const MyProfile = () => {
  const dispatch = useAppDispatch();
  const currentUser = useSelector(userStateSelector);
  const [presentPasswordChangeM, dismissPasswordChangeM] = useIonModal(ModalPasswordChange, {
    onDismiss: (data: string, role: string) => dismissPasswordChangeM(data, role),
  });
  const page = useRef(null);
  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  if (!currentUser) return <></>;
  const { _id, role, email } = currentUser;
  const { name, image } = currentUser.profileId;

  useDeepEffect(() => {
    if (_id && email && role) {
      dispatch(getUserProfileRequest({ email, role, _id }));
    }
  }, [_id, email, role]);

  const openPasswordChange = () => {
    if (presentingElement) presentPasswordChangeM({ presentingElement: presentingElement });
  };

  return (
    <IonPage id="my-profile-page" ref={page}>
      <IonContent forceOverscroll={false}>
        <BackButton routerLink="/tabs/tab-account" />
        <div className="flex flex-col h-full">
          <ProfilePageHeader title={name || "User"} description={role} />
          <div className="absolute right-10 top-[150px] z-10">
            <ProfileImage image={image || ""} size={100} canChangeImage />
          </div>

          {role === "user" ? (
            <ClientProfile currentUser={currentUser} openPasswordChange={openPasswordChange} />
          ) : (
            <ProviderProfile currentUser={currentUser} openPasswordChange={openPasswordChange} />
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MyProfile;
