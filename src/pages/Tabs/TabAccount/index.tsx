import {
  IonPage,
  IonContent,
  useIonRouter,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Dialog } from "@capacitor/dialog";
import { useDispatch, useSelector } from "react-redux";
import { getOrganizationRequest, userStateSelector } from "src/store/auth";
import "./style.scss";
import { logOutOutline } from "ionicons/icons";
import { memo, useEffect } from "react";
import { resetStore } from "src/store/global";
import { ProfileImage } from "src/components/atoms";

const TabAccount = () => {
  const dispatch = useDispatch();
  const navigation = useIonRouter();
  const currentUser = useSelector(userStateSelector);

  useEffect(() => {
    if (currentUser && currentUser._id && currentUser.role === "provider") {
      dispatch(getOrganizationRequest(currentUser._id));
    }
  }, [currentUser]);

  const handleLogout = async () => {
    const { value } = await Dialog.confirm({
      title: "Confirm",
      message: "Are you sure you'd like to logout?",
    });
    if (value) {
      dispatch(resetStore());
      navigation.push("/welcome", "root");
    }
  };

  return (
    <IonPage id="tab-account-page">
      <IonHeader translucent className="ion-no-border">
        <IonToolbar>
          <IonTitle>My Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">My Profile</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="header-group space-y-6">
          <div className="profile-info space-x-6">
            <ProfileImage image={currentUser?.profileId.image || ""} canChangeImage />
            <span>{currentUser?.name || "User"}</span>
          </div>
        </div>
        <IonList className="account-list" lines="full">
          <IonItem button routerLink="/my-profile">
            <IonLabel>Information</IonLabel>
          </IonItem>
          <IonItem button routerLink="/settings">
            <IonLabel>Settings</IonLabel>
          </IonItem>
          {currentUser?.role === "provider" && (
            <>
              {currentUser.profileId.makeAccountPrimary && (
                <IonItem button routerLink="/manage-team">
                  <IonLabel>Manage Team</IonLabel>
                </IonItem>
              )}
              <IonItem button routerLink="/organization-listing">
                <IonLabel>Organization Listing</IonLabel>
              </IonItem>
            </>
          )}
          <IonItem button detail={false} onClick={handleLogout}>
            <IonIcon slot="start" icon={logOutOutline} />
            <IonLabel>Logout</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default memo(TabAccount);
