import Geocode from "react-geocode";
import { HERPLAN_MAP_APIKEY } from "src/shared";

Geocode.setApiKey(HERPLAN_MAP_APIKEY);
Geocode.setRegion("en");
// Geocode.enableDebug();

export default Geocode;
