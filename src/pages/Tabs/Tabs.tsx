import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon } from "@ionic/react";
import {
  personCircleOutline,
  chatboxEllipsesOutline,
  mapOutline,
  homeOutline,
} from "ionicons/icons";
import { Route, Redirect, useLocation } from "react-router";
import { TabAccount, TabDashboard, TabMessages, TabProvider } from ".";
import { Appointments, ChatRoomPage, SavedClients, SavedQuizzes, SavedSearches } from "../Private";
import MyProviders from "../Private/MyProviders";
import {
  ProviderDetails,
  Quiz,
  QuizResult,
  QuizStep1,
  QuizStep2,
  QuizStep3,
  QuizStep4,
} from "../Public";

const Tabs: React.FC = () => {
  const location = useLocation();

  return (
    <IonTabs>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab-dashboard" href="/tabs/tab-dashboard">
          <IonIcon
            icon={homeOutline}
            color={location.pathname.includes("tab-dashboard") ? "success" : "medium"}
          />
        </IonTabButton>
        <IonTabButton tab="tab-provider" href="/tabs/tab-provider">
          <IonIcon
            icon={mapOutline}
            color={location.pathname.includes("tab-provider") ? "success" : "medium"}
          />
        </IonTabButton>
        <IonTabButton tab="tab-messages" href="/tabs/tab-messages">
          <IonIcon
            icon={chatboxEllipsesOutline}
            color={location.pathname.includes("tab-messages") ? "success" : "medium"}
          />
        </IonTabButton>
        <IonTabButton tab="tab-account" href="/tabs/tab-account">
          <IonIcon
            icon={personCircleOutline}
            color={location.pathname.includes("tab-account") ? "success" : "medium"}
          />
        </IonTabButton>
      </IonTabBar>
      <IonRouterOutlet>
        <Redirect exact from="/tabs" to="/tabs/tab-dashboard" />
        {/* Tab Dashboard */}
        <Route exact path="/tabs/tab-dashboard" component={TabDashboard} />
        <Route exact path="/tabs/tab-dashboard/saved-quizzes" component={SavedQuizzes} />
        <Route exact path="/tabs/tab-dashboard/quiz" component={Quiz} />
        <Route exact path="/tabs/tab-dashboard/quiz-step1" component={QuizStep1} />
        <Route exact path="/tabs/tab-dashboard/quiz-step2" component={QuizStep2} />
        <Route exact path="/tabs/tab-dashboard/quiz-step3" component={QuizStep3} />
        <Route exact path="/tabs/tab-dashboard/quiz-step4" component={QuizStep4} />
        <Route exact path="/tabs/tab-dashboard/quiz-result" component={QuizResult} />
        <Route exact path="/tabs/tab-dashboard/my-providers" component={MyProviders} />
        <Route exact path="/tabs/tab-dashboard/saved-searches" component={SavedSearches} />
        <Route exact path="/tabs/tab-dashboard/appointments" component={Appointments} />
        <Route exact path="/tabs/tab-dashboard/saved-clients" component={SavedClients} />

        {/* Tab Provider */}
        <Route exact path="/tabs/tab-provider" component={TabProvider} />
        <Route exact path="/tabs/tab-provider/provider-details/:id" component={ProviderDetails} />
        <Route exact path="/tabs/tab-provider/quiz" component={Quiz} />
        <Route exact path="/tabs/tab-provider/quiz-step1" component={QuizStep1} />
        <Route exact path="/tabs/tab-provider/quiz-step2" component={QuizStep2} />
        <Route exact path="/tabs/tab-provider/quiz-step3" component={QuizStep3} />
        <Route exact path="/tabs/tab-provider/quiz-step4" component={QuizStep4} />
        <Route exact path="/tabs/tab-provider/quiz-result" component={QuizResult} />

        {/* Tab Messages */}
        <Route exact path="/tabs/tab-messages" component={TabMessages} />

        {/* Tab Account */}
        <Route exact path="/tabs/tab-account" component={TabAccount} />
      </IonRouterOutlet>
    </IonTabs>
  );
};

export default Tabs;
