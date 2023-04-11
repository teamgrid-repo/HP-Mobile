import { IonItem, IonSelect, IonSelectOption } from "@ionic/react";
import { useSelector } from "react-redux";
import { SAVED_SORT_TYPES } from "src/shared";
import { useAppDispatch } from "src/store/config-store";
import { savedQuizzesSortBySelector, setSavedQuizzesSortByState } from "src/store/quiz";
import "./style.scss";

const QuizSortBy = () => {
  const dispatch = useAppDispatch();
  const sortType = useSelector(savedQuizzesSortBySelector);

  return (
    <div className="my-5 mx-8 quiz-sort-by">
      <IonItem lines="none">
        <IonSelect
          label="Sort By"
          labelPlacement="floating"
          className="w-full"
          value={sortType}
          placeholder="Select Sort..."
          onIonChange={(e) => {
            dispatch(setSavedQuizzesSortByState(e.detail.value));
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

export default QuizSortBy;
