import { InfoWindow, Marker } from "@react-google-maps/api";
import { memo, useState } from "react";
import { IMarker, MarkerPin } from "src/shared";

interface Props {
  markers: IMarker[];
}

const MapMarkers = ({ markers }: Props) => {
  const [selectedMarker, setSelectedMarker] = useState<IMarker | null>(null);

  return (
    <>
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.coordinate}
          title={marker.title}
          onClick={() => setSelectedMarker(marker)}
          // icon={{ url: MarkerPin, scaledSize: new google.maps.Size(53, 42) }}
        />
      ))}
      {selectedMarker && (
        <InfoWindow
          position={selectedMarker.coordinate}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div>
            <span className="py-2">{selectedMarker.title}</span>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default memo(MapMarkers);
