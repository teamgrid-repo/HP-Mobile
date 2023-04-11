import { IonContent, IonSearchbar, IonItem, IonLabel, IonPage } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import { Virtuoso } from "react-virtuoso";
import { useDebounce } from "usehooks-ts";

interface Props {
  onClickedAddress: (item: google.maps.places.AutocompletePrediction) => void;
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
}

const ModalSearchAddress = ({ onClickedAddress, onDismiss }: Props) => {
  const searchInput = useRef<HTMLIonSearchbarElement>(null);
  const [searchstr, setSearchstr] = useState("");
  const debouncedSearchstr = useDebounce<string>(searchstr, 500);
  const {
    ready,
    value,
    suggestions: { loading, status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  useEffect(() => {
    setValue(debouncedSearchstr);
  }, [debouncedSearchstr]);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonSearchbar
          ref={searchInput}
          placeholder="Search Location"
          value={searchstr}
          onIonInput={(e) => {
            setSearchstr(e.detail.value!);
          }}
        ></IonSearchbar>
        {loading && data.length === 0 ? (
          <>loading Places...</>
        ) : (
          <Virtuoso
            className="ion-content-scroll-host"
            style={{ height: "100%" }}
            data={data}
            itemContent={(index, item) => {
              return (
                <div style={{ height: "62px" }}>
                  <IonItem
                    lines="full"
                    detail
                    button
                    onClick={() => {
                      onClickedAddress(item);
                      onDismiss();
                    }}
                  >
                    <IonLabel>
                      <h2>{item.structured_formatting.main_text}</h2>
                      <p>{item.structured_formatting.secondary_text}</p>
                    </IonLabel>
                  </IonItem>
                </div>
              );
            }}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default ModalSearchAddress;
