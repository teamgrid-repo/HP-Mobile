import { GoogleMap } from "@react-google-maps/api";
import { memo, useCallback } from "react";
import {
  DEAFULT_MAP_CENTER,
  DEAFULT_MAP_ZOOM,
  ILatLng,
  IMarker,
  useMapLoadScript,
} from "src/shared";
import MapDirections from "./MapDirections";
import MapMarkers from "./MapMarkers";

interface Props {
  markers?: IMarker[];
  center?: ILatLng;
  zoom?: number;
  direction?: { destination: ILatLng | null; origin: ILatLng | null };
  height?: string | number;
}

const MyMap = ({
  markers = [],
  center = DEAFULT_MAP_CENTER,
  zoom = DEAFULT_MAP_ZOOM,
  direction,
  height = 200,
}: Props) => {
  const { isLoaded, loadError } = useMapLoadScript();

  const onMapLoad = useCallback((map) => {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
  }, []);

  if (loadError) {
    return (
      <div className="flex w-full h-[200px] rounded-[6px] bg-gray-300">
        <span className="m-auto text-center">Map cannot be loaded right now, sorry</span>
      </div>
    );
  }

  return isLoaded ? (
    <GoogleMap
      id="my-map"
      mapContainerStyle={{ width: "100%", height, borderRadius: 6, display: "inline-block" }}
      options={{ disableDefaultUI: true, zoom }}
      zoom={zoom}
      center={center}
      onLoad={onMapLoad}
    >
      <MapMarkers markers={markers} />

      {direction && direction.destination && direction.origin && (
        <MapDirections
          direction={{ destination: direction.destination, origin: direction.origin }}
        />
      )}
    </GoogleMap>
  ) : (
    <div className="flex w-full h-[200px] rounded-[6px] bg-gray-300">
      <span className="m-auto text-center">Map is loading right now.</span>
    </div>
  );
};

export default memo(MyMap);
