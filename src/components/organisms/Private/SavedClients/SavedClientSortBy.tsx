import { IonItem, IonSelect, IonSelectOption } from "@ionic/react";
import { memo } from "react";
import { useSelector } from "react-redux";
import { SAVED_SORT_TYPES } from "src/shared";
import { useAppDispatch } from "src/store/config-store";
import { savedClientsSortBySelector, setSavedClientsSortByState } from "src/store/provider";
import "./style.scss";

const SavedClientSortBy = () => {
  const dispatch = useAppDispatch();
  const sortType = useSelector(savedClientsSortBySelector);

  return (
    <div className="my-5 mx-8 saved-sort-by">
      <IonItem lines="none">
        <IonSelect
          label="Sort By"
          labelPlacement="floating"
          className="w-full"
          value={sortType}
          placeholder="Select Sort..."
          onIonChange={(e) => {
            dispatch(setSavedClientsSortByState(e.detail.value));
          }}
        >
          {SAVED_SORT_TYPES.map((sType) => (
            <IonSelectOption key={sType} value={sType}>
              {sType}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>
    </div>
  );
};

export default memo(SavedClientSortBy);
