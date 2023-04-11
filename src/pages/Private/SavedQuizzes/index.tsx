import { IonContent, IonPage } from "@ionic/react";
import { useEffect } from "react";
import { BackButton } from "src/components/atoms";
import { PageHeader, QuizSortBy, SavedQuizList, TakeTheQuizAction } from "src/components/organisms";
import { getQuizBaseUrl } from "src/shared/helpers";
import { useAppDispatch } from "src/store/config-store";
import { getSavedQuizzesRequest } from "src/store/quiz";
import "./style.scss";

const SavedQuizzes = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSavedQuizzesRequest());
  }, []);

  return (
    <IonPage id="saved-quizzes-page">
      <IonContent forceOverscroll={false}>
        <BackButton routerLink="/tabs/tab-dashboard" />
        <div className="flex flex-col h-full">
          <PageHeader title="Saved Quizzes" headerStyle={2} />
          <QuizSortBy />
          <TakeTheQuizAction
            buttonText="Take Another Quiz"
            routeLink={`${getQuizBaseUrl(location.pathname)}/quiz`}
          />
          <div className="grow">
            <SavedQuizList />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SavedQuizzes;
