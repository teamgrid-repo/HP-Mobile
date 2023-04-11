import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Virtuoso } from "react-virtuoso";
import { notInClientsStateSelector } from "src/store/provider";
import AddClientItem from "./AddClientItem";

interface Props {
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
}

const ModalAddClient = ({ onDismiss }: Props) => {
  const notInClients = useSelector(notInClientsStateSelector);
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Client</IonTitle>
          <IonButtons slot="end">
            <IonButton disabled={isProcessing} onClick={() => onDismiss()}>
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent forceOverscroll={false}>
        {notInClients.length === 0 ? (
          <p className="text-center">No clients to add!</p>
        ) : (
          <Virtuoso
            className="ion-content-scroll-host"
            style={{ height: "100%" }}
            data={notInClients}
            itemContent={(index, item) => {
              return (
                <AddClientItem
                  item={item}
                  isProcessing={isProcessing}
                  onProcessing={setIsProcessing}
                />
              );
            }}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default ModalAddClient;
