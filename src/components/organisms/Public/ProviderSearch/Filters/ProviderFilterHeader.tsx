import { IonLabel, IonButton, useIonModal } from "@ionic/react";
import { ModalProviderFilterList } from "src/components/molecules";

const ProviderFilterHeader = () => {
  const [presentProviderFilterM, dismissProviderFilterM] = useIonModal(ModalProviderFilterList, {
    onDismiss: (data: string, role: string) => dismissProviderFilterM(data, role),
  });

  return (
    <div className="flex justify-between">
      <IonLabel className="text-[26px] font-bold">Provider Search</IonLabel>
      <IonButton
        fill="clear"
        color="success"
        className="nopadding-btn"
        onClick={() =>
          presentProviderFilterM({
            initialBreakpoint: 0.9,
            breakpoints: [0.5, 0.9],
            cssClass: ["filter-search-modal"],
          })
        }
      >
        Filter List
      </IonButton>
    </div>
  );
};

export default ProviderFilterHeader;
