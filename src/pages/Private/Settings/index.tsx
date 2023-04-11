import { IonPage, IonContent } from "@ionic/react";
import { BackButton } from "src/components/atoms";
import { PageHeader, SettingList } from "src/components/organisms";

const SettingsPage = () => {
  return (
    <IonPage id="settings-page">
      <IonContent forceOverscroll={false}>
        <BackButton routerLink="/tabs/tab-account" />
        <div className="flex flex-col h-full">
          <PageHeader title="Settings (Notifications)" />
          <SettingList />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
