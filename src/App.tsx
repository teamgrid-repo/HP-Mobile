import { useEffect } from "react";
import { IonApp, setupIonicReact, useIonAlert, useIonToast } from "@ionic/react";
import { PushNotifications, Token } from "@capacitor/push-notifications";
import { IonReactRouter } from "@ionic/react-router";
import { FacebookLogin } from "@capacitor-community/facebook-login";
import { arrowBackOutline, warning } from "ionicons/icons";
import { SplashScreen } from "@capacitor/splash-screen";
import { Network } from "@capacitor/network";
import Routes from "./routes";
import { useAppDispatch } from "./store/config-store";
import { getUserProfileRequest, setAuthState, userStateSelector } from "./store/auth";
import { HERPLAN_FACEBOOK_APPID, SOCKET_EMIT_NEW_USER, SOCKET_ON_ALL_USER } from "./shared";
import { getCareSubcategoriesRequest, getSpecialQualificationsRequest } from "./store/category";
import { useSelector } from "react-redux";
import { getSavedClientsRequest } from "./store/provider";
import "./theme/global.scss";
import { socket } from "./utils/socket";
import { keys } from "lodash";
import { setOnlineRoomIdsState } from "./store/messages";

setupIonicReact({
  mode: "ios",
  backButtonText: "",
  backButtonIcon: arrowBackOutline,
  swipeBackEnabled: false,
  toastDuration: 3000,
  scrollAssist: false,
});

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [presentToast] = useIonToast();
  const [presentAlert] = useIonAlert();

  const currentUser = useSelector(userStateSelector);
  const _id = currentUser?._id || "";
  const role = currentUser?.role || "";
  const email = currentUser?.email || "";

  useEffect(() => {
    if (_id && email && role) {
      dispatch(getUserProfileRequest({ email, role, _id }));
      if (role === "provider") dispatch(getSavedClientsRequest());
    }
  }, [_id, email, role]);

  useEffect(() => {
    if (_id) {
      socket.emit(SOCKET_EMIT_NEW_USER, { senderId: _id });
      socket.on(SOCKET_ON_ALL_USER, (user) => {
        dispatch(setOnlineRoomIdsState(keys(user)));
      });
    }
  }, [_id]);

  useEffect(() => {
    dispatch(getCareSubcategoriesRequest());
    dispatch(getSpecialQualificationsRequest());

    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);

    PushNotifications.requestPermissions().then((res) => {
      if (res.receive === "granted") {
        PushNotifications.register();
      }
    });

    PushNotifications.addListener("registration", (token: Token) => {
      if (token && token.value) {
        dispatch(setAuthState({ fcmToken: token.value }));
      }
    });

    PushNotifications.addListener("registrationError", (error: any) => {
      // presentAlert({ message: "Error on registration: " + JSON.stringify(error) });
    });

    Network.addListener("networkStatusChange", (status) => {
      if (!status.connected) {
        presentToast({
          message: `Network is ${status.connected ? "Online" : "Offline"}`,
          icon: warning,
        });
      }
    });

    Network.getStatus().then((status) => {
      if (!status.connected) presentToast({ message: `Network is Offline`, icon: warning });
    });

    // use hook after platform dom ready
    FacebookLogin.initialize({ appId: HERPLAN_FACEBOOK_APPID })
      .then((res) => {})
      .catch((error) => {
        console.error("Error Facebook initialize:", error);
      });
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <Routes />
      </IonReactRouter>
    </IonApp>
  );
};
export default App;
