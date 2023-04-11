import { IonRouterOutlet } from "@ionic/react";
import { FC } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import {
  ChatRoomPage,
  ManageTeamPage,
  MyProfile,
  OrganizationListingPage,
  SettingsPage,
} from "./pages/Private";
import {
  CreateAccount1,
  CreateAccount2,
  ForgotPasswordStep1,
  ForgotPasswordStep2,
  ForgotPasswordStep3,
  Login,
  Otp,
  ProviderDetails,
  ProviderSearch,
  Quiz,
  QuizResult,
  QuizStep1,
  QuizStep2,
  QuizStep3,
  QuizStep4,
  Welcome,
} from "./pages/Public";
import Tabs from "./pages/Tabs/Tabs";
import { userStateSelector } from "./store/auth";

export interface PrivateRouteProps extends RouteProps {
  component: any;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ component: Component, ...props }) => {
  const authUser = useSelector(userStateSelector);
  // if i have the login path, handle it differently...
  if (props.path === "/login") {
    return authUser ? <Redirect to="/" /> : <Route component={Login} />;
  }
  return (
    <Route
      {...props}
      render={(innerProps) => {
        return authUser ? <Component {...innerProps} /> : <Redirect to="/welcome" />;
      }}
    />
  );
};

const Routes = () => {
  return (
    <IonRouterOutlet>
      <Route exact path="/" render={() => <Redirect to="/tabs" />} />
      <PrivateRoute exact path="/login" component={Login} />
      <Route exact path="/welcome" component={Welcome} />
      <Route exact path="/provider-search" component={ProviderSearch} />
      <Route exact path="/provider-details/:id" component={ProviderDetails} />
      <Route exact path="/register/create-account1" component={CreateAccount1} />
      <Route exact path="/register/create-account2" component={CreateAccount2} />
      <Route exact path="/register/otp" component={Otp} />
      <Route exact path="/forgot-password/step1" component={ForgotPasswordStep1} />
      <Route exact path="/forgot-password/step2" component={ForgotPasswordStep2} />
      <Route exact path="/forgot-password/step3" component={ForgotPasswordStep3} />
      <Route exact path="/quiz" component={Quiz} />
      <Route exact path="/quiz-step1" component={QuizStep1} />
      <Route exact path="/quiz-step2" component={QuizStep2} />
      <Route exact path="/quiz-step3" component={QuizStep3} />
      <Route exact path="/quiz-step4" component={QuizStep4} />
      <Route exact path="/quiz-result" component={QuizResult} />

      {/* Private Pages */}
      <PrivateRoute path="/tabs" component={Tabs} />
      <PrivateRoute exact path="/room/:room" component={ChatRoomPage} />
      <PrivateRoute exact path="/my-profile" component={MyProfile} />
      <PrivateRoute exact path="/settings" component={SettingsPage} />
      <PrivateRoute exact path="/manage-team" component={ManageTeamPage} />
      <PrivateRoute exact path="/organization-listing" component={OrganizationListingPage} />
    </IonRouterOutlet>
  );
};

export default Routes;
