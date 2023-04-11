import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { memo, useMemo } from "react";
import { ILatLng, IMarker, useMyPosition } from "src/shared";
import { MyMap } from "..";

interface Props {
  origin: ILatLng | null;
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
}

const ModalGetDirection = ({ origin, onDismiss }: Props) => {
  // const direction = { destination: { lat: 33.1177259, lng: -83.23198889999999 }, origin };

  const { currentLocation } = useMyPosition();
  const destination = currentLocation;
  const direction = { destination, origin };

  const markers: IMarker[] = useMemo(() => {
    const ms: IMarker[] = [];
    if (destination) ms.push({ coordinate: destination });
    if (origin) ms.push({ coordinate: origin });
    return ms;
  }, [destination, origin]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Directions to Provider</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => onDismiss()}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent forceOverscroll={false}>
        {origin && <MyMap markers={markers} direction={direction} center={origin} height="100%" />}
      </IonContent>
    </IonPage>
  );
};

export default memo(ModalGetDirection);
