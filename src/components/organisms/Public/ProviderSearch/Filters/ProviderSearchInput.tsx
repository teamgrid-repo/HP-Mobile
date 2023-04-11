import { IonSearchbar } from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { filterRequestStateSelector, setFilterRequestState } from "src/store/provider";

const ProviderSearchInput = () => {
  const dispatch = useDispatch();
  const filterRequestState = useSelector(filterRequestStateSelector);

  return (
    <IonSearchbar
      debounce={1000}
      value={filterRequestState.keywords}
      onIonInput={(e) => {
        dispatch(setFilterRequestState({ keywords: (e.detail.value || "").toLowerCase() }));
      }}
    ></IonSearchbar>
  );
};

export default ProviderSearchInput;
