import { useLoadScript } from "@react-google-maps/api";
import { useState } from "react";
import { HERPLAN_MAP_ID, HERPLAN_MAP_APIKEY } from "../constants";

const useMapLoadScript = () => {
  const [libraries] = useState<any>(["places"]);

  const { isLoaded, loadError } = useLoadScript({
    id: HERPLAN_MAP_ID,
    googleMapsApiKey: HERPLAN_MAP_APIKEY,
    libraries: libraries,
  });

  return { isLoaded, loadError };
};

export default useMapLoadScript;
