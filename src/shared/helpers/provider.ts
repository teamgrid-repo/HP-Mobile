export const getStateFromAddressComponents = (
  addresses: google.maps.GeocoderAddressComponent[]
) => {
  let f = "";
  for (let i = 0; i < addresses.length; i++) {
    if (
      addresses[i].types &&
      addresses[i].types.find((a) => a === "political") &&
      !addresses[i].types.find((a) => a === "country")
    ) {
      f = addresses[i].short_name;
    }
  }
  return f;
};
