import { SignInWithApple } from "@capacitor-community/apple-sign-in";
import { FacebookLogin } from "@capacitor-community/facebook-login";
import { Device } from "@capacitor/device";
import { Preferences } from "@capacitor/preferences";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonText,
  IonInput,
  IonNote,
  IonButton,
  IonSpinner,
  IonIcon,
  useIonAlert,
  useIonRouter,
  useIonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import { Formik } from "formik";
import { logoApple } from "ionicons/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LoginValidationSchema,
  Logo,
  LogoGoogle,
  LogoFacebook,
  FACEBOOK_PERMISSIONS,
  HERPLAN_APP_ID,
  ILoginReuqst,
  STORAGE_LIST,
} from "src/shared";
import { AuthService } from "src/shared/services";
import { fcmTokenStateSelector, setUserState } from "src/store/auth";
import "./style.scss";

interface Props {
  title?: string;
  isModal?: boolean;
  onClose?: () => void;
}

const LoginForm = ({ title = "Login to your Account", isModal = false, onClose }: Props) => {
  const dispatch = useDispatch();
  const [presentToast] = useIonToast();
  const [presentAlert] = useIonAlert();
  const navigation = useIonRouter();
  const fcmToken = useSelector(fcmTokenStateSelector);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  const initialValue: ILoginReuqst = {
    email: "",
    password: "",
    type: "web",
    socialToken: "",
    fcmToken: "",
  };

  const doLogin = (data: ILoginReuqst) => {
    setIsProcessing(true);
    AuthService.login(data)
      .then(async (res: any) => {
        if (res.code === 200) {
          if (res.success) {
            if (res.data.user) {
              await Preferences.set({
                key: STORAGE_LIST.STORAGE_USER,
                value: JSON.stringify(res.data.user),
              });
              dispatch(setUserState(res.data.user));
              if (isModal && onClose) {
                onClose();
              } else {
                setTimeout(() => {
                  navigation.push("/tabs/tab-dashboard", "root");
                }, 1000);
              }
            }
            if (res.message) presentToast({ message: res.message, color: "success" });
          } else {
            if (res.message) presentAlert({ message: res.message, buttons: ["ok"] });
          }
        }
      })
      .catch((error) => {
        if (error.message) {
          presentAlert({ message: error.message, buttons: ["ok"] });
        }
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  const loginWithGoogle = () => {
    GoogleAuth.signIn()
      .then((res) => {
        if (res && res.email && res.id) {
          const data: ILoginReuqst = {
            email: res.email,
            password: "",
            type: "google",
            socialToken: res.id,
            fcmToken,
          };
          doLogin(data);
        } else {
          presentToast({ message: `Unknow Error: Google Login.`, color: "danger" });
        }
      })
      .catch((error) => {
        console.error("Error google login:", error);
      });
  };

  const loginWithFacebook = () => {
    FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS })
      .then(async (res) => {
        if (res && res.accessToken) {
          const profile = await FacebookLogin.getProfile<{
            id: string;
            email: string;
          }>({
            fields: ["email, name"],
          });
          const data: ILoginReuqst = {
            email: profile.email,
            password: "",
            type: "facebook",
            socialToken: profile.id,
            fcmToken,
          };
          doLogin(data);
        }
      })
      .catch((error) => {
        console.error("Error Facebook login:", error);
      });
  };

  const loginWithApple = () => {
    SignInWithApple.authorize({
      clientId: HERPLAN_APP_ID,
      redirectURI: "",
      scopes: "email name",
    })
      .then((res) => {
        if (res.response) {
          if (!res.response.email) {
            presentAlert(
              "You already logged in, go to Settings --> your profile --> Password and Security --> and remove your app in the list of apps that uses Apple ID. and then try to login again."
            );
          } else if (res.response.email && res.response.user) {
            const data: ILoginReuqst = {
              email: res.response.email,
              password: "",
              type: "apple",
              socialToken: res.response.user,
              fcmToken,
            };
            doLogin(data);
          }
        }
      })
      .catch((error) => {
        console.error("Error Apple Login:", error);
      });
  };

  useIonViewWillEnter(() => {
    Device.getInfo().then((deviceInfo) => {
      setIsAndroid(deviceInfo.platform === "android");
    });
  });

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={LoginValidationSchema}
      onSubmit={(values) => doLogin(values)}
    >
      {({ errors, touched, handleSubmit, values, setFieldValue }) => (
        <form className="h-full" onSubmit={handleSubmit}>
          <IonGrid className="flex flex-col justify-between h-full pt-12">
            <IonRow>
              <IonCol size="12">
                <IonImg className="login-logo" src={Logo} />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <IonText className="login-title">{title}</IonText>
              </IonCol>
              <IonCol size="12">
                <IonInput
                  className={`${!errors.email && "ion-valid"} ${errors.email && "ion-invalid"} ${
                    touched.email && "ion-touched"
                  }`}
                  label=""
                  type="email"
                  placeholder="Email"
                  value={values.email}
                  onIonInput={(event) => setFieldValue("email", event.target.value)}
                />
                {errors.email && touched.email && <IonNote color="danger">{errors.email}</IonNote>}
              </IonCol>
              <IonCol size="12">
                <IonInput
                  className={`${!errors.password && "ion-valid"} ${
                    errors.password && "ion-invalid"
                  } ${touched.password && "ion-touched"}`}
                  label=""
                  type="password"
                  placeholder="Password"
                  value={values.password}
                  errorText={errors.password}
                  onIonInput={(event) => setFieldValue("password", event.target.value)}
                ></IonInput>
              </IonCol>
              <IonCol size="12">
                <IonButton
                  className="login-btn"
                  type="submit"
                  color="success"
                  expand="block"
                  disabled={isProcessing}
                >
                  {isProcessing && <IonSpinner className="mr-2" slot="start"></IonSpinner>}
                  Log In
                </IonButton>
              </IonCol>
              <IonCol className="text-center">
                <IonText className="text-[14px]">Or sign in with</IonText>
              </IonCol>
              <IonCol size="12" className="flex flex-row space-x-3 justify-center">
                {!isAndroid && (
                  <IonButton className="social-btn" color="light" onClick={loginWithApple}>
                    <IonIcon slot="icon-only" icon={logoApple}></IonIcon>
                  </IonButton>
                )}
                <IonButton className="social-btn" color="light" onClick={loginWithGoogle}>
                  <IonIcon slot="icon-only" icon={LogoGoogle}></IonIcon>
                </IonButton>
                <IonButton className="social-btn" color="light" onClick={loginWithFacebook}>
                  <IonIcon slot="icon-only" icon={LogoFacebook}></IonIcon>
                </IonButton>
              </IonCol>
              <IonCol className="flex flex-row justify-center text-[14px] space-x-1">
                <IonText className="my-auto">Don't have an account?</IonText>
                <IonButton
                  className="signup-btn"
                  fill="clear"
                  color="dark"
                  routerLink="/register/create-account1"
                >
                  Sign Up.
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <IonButton
                  className="text-[14px]"
                  fill="clear"
                  expand="block"
                  color="dark"
                  routerLink="/forgot-password/step1"
                >
                  Forgot Password?
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
