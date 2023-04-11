import { useMemo } from "react";
import { useSelector } from "react-redux";
import MyMap from "src/components/molecules/Map";
import { IMarker } from "src/shared";
import { filteredProvidersStateSelector } from "src/store/provider";

const ProviderMap = () => {
  const filteredProviders = useSelector(filteredProvidersStateSelector);
  const markers: IMarker[] = useMemo(
    () =>
      filteredProviders
        .filter((provider) => provider.location && provider.location.lat && provider.location.lang)
        .map((provider) => ({
          coordinate: { lat: provider.location.lat, lng: provider.location.lang },
          title: provider.name,
        })),
    [filteredProviders]
  );

  return <MyMap markers={markers} />;
};

export default ProviderMap;
