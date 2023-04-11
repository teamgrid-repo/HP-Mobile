import { IonItem, IonLabel, IonButton, useIonToast, IonSpinner } from "@ionic/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { IClientData } from "src/shared";
import { ClientService } from "src/shared/services";
import { getSavedClientsRequest, getAppointmentsRequest } from "src/store/provider";
import "./style.scss";

interface Props {
  item: IClientData;
  isProcessing: boolean;
  onProcessing: (isProcessing: boolean) => void;
}

const AddClientItem = ({ item, isProcessing, onProcessing }: Props) => {
  const dispatch = useDispatch();
  const [presentToast] = useIonToast();
  const [isAdding, setIsAdding] = useState(false);

  const addClient = (item: IClientData) => {
    if (item._id) {
      setIsAdding(true);
      onProcessing(true);
      ClientService.addClient(item._id)
        .then((res: any) => {
          if (!res.success && res.message && typeof res.message === "string") {
            presentToast({ message: res.message, color: "danger" });
            return;
          }
          if (res.success && res.message && typeof res.message === "string") {
            presentToast({ message: res.message, color: "success" });
          }
          dispatch(getSavedClientsRequest());
          dispatch(getAppointmentsRequest());
        })
        .catch((error) => {})
        .finally(() => {
          setIsAdding(false);
          onProcessing(false);
        });
    }
  };

  return (
    <IonItem key={item._id} className="add-client-item">
      <IonLabel>
        <h2>{item.name}</h2>
        <p>{item.email}</p>
      </IonLabel>
      <IonButton
        slot="end"
        color="success"
        onClick={() => addClient(item)}
        disabled={isAdding || isProcessing}
      >
        {isAdding && <IonSpinner className="mr-2" slot="start" />}
        Add
      </IonButton>
    </IonItem>
  );
};

export default AddClientItem;
