import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonSearchbar,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
} from "@ionic/react";
import { useState } from "react";
import { USA_STATES } from "src/shared";

const StateModal = () => {
  const [filteredItems, setFilteredItems] = useState<typeof USA_STATES>(USA_STATES);
  // const [workingSelectedValues, setWorkingSelectedValues] = useState<string[]>([
  //   ...props.selectedItems,
  // ]);

  return (
    <>
      {/* <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={cancelChanges}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>{props.title}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={confirmChanges}>Done</IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar onIonInput={searchbarInput}></IonSearchbar>
        </IonToolbar>
      </IonHeader>

      <IonContent color="light" class="ion-padding">
        <IonList id="modal-list" inset={true}>
          {filteredItems.map((item) => (
            <IonItem key={item.value}>
              <IonLabel>{item.text}</IonLabel>
              <IonCheckbox
                value={item.value}
                checked={isChecked(item.value)}
                onIonChange={checkboxChange}
              ></IonCheckbox>
            </IonItem>
          ))}
        </IonList>
      </IonContent> */}
    </>
  );
};

export default StateModal;
