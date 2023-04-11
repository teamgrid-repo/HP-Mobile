import { useIonToast } from "@ionic/react";
import { DirectionsRenderer, DirectionsService } from "@react-google-maps/api";
import { memo, useRef, useState } from "react";
import { ILatLng, MarkerPin } from "src/shared";

interface Props {
  direction: { destination: ILatLng; origin: ILatLng };
}
const MapDirections = ({ direction }: Props) => {
  const [presentToast] = useIonToast();
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const count = useRef(0);

  return (
    <>
      {direction && direction.destination && direction.origin && (
        <DirectionsService
          options={{
            destination: direction.destination,
            origin: direction.origin,
            travelMode: google.maps.TravelMode.DRIVING,
          }}
          callback={(result, status) => {
            if (result !== null) {
              if (status === google.maps.DirectionsStatus.OK && count.current === 0) {
                count.current++;
                setDirections(() => result);
              } else if (status === google.maps.DirectionsStatus.ZERO_RESULTS) {
                presentToast({ message: "No Directions", color: "medium" });
              }
            }
          }}
        />
      )}
      {directions && <DirectionsRenderer options={{ directions, suppressMarkers: true }} />}
    </>
  );
};

export default memo(MapDirections);
