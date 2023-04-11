import { IonCol, IonContent, IonGrid, IonPage, IonRow, useIonViewDidEnter } from "@ionic/react";
import { FC, useRef } from "react";
import { RouteComponentProps } from "react-router";
import { BackButton } from "src/components/atoms";
import { QuizHeader, TakeTheQuizAction } from "src/components/organisms";
import { getQuizBaseUrl } from "src/shared/helpers";
import "./style.scss";

const Quiz: FC<RouteComponentProps> = ({ location }) => {
  const contentRef = useRef<HTMLIonContentElement>(null);

  useIonViewDidEnter(() => {
    contentRef.current?.scrollToTop(500);
  });
  return (
    <IonPage id="quiz-page">
      <IonContent ref={contentRef} forceOverscroll={false}>
        <BackButton routerLink={getQuizBaseUrl(location.pathname)} />
        <QuizHeader title="Take the Quiz" description="Not sure what to search for?" />
        <IonGrid className="p-10">
          <IonRow>
            <IonCol size="12">
              <p className="desc">
                The Her PLAN quiz is a tool to identify the services that will be most helpful to a
                pregnant or parenting woman seeking assistance. The Her PLAN quiz was developed by
                an experienced case manager with a masters in social work. The quiz's three sections
                – recommendations based on her situation, confidence rankings, and special questions
                – are intentionally organized to address the area(s) of greatest need first. The
                quiz will link to recommended Her PLAN search results based on the answers.
              </p>
              <p className="desc">
                You will be able to save quiz results for future reference if you have created a
                free Her PLAN account.
              </p>
            </IonCol>
          </IonRow>
        </IonGrid>
        <TakeTheQuizAction
          buttonText="Start The Quiz"
          routeLink={`${getQuizBaseUrl(location.pathname)}/quiz-step1`}
        />
      </IonContent>
    </IonPage>
  );
};

export default Quiz;
