import {
  IonPage,
  IonContent,
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonImg,
  IonRow,
  IonText,
  IonSegment,
  IonSegmentButton,
  useIonToast,
  useIonAlert,
  useIonViewWillEnter,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { logoApple } from "ionicons/icons";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import "./style.scss";
import {
  FACEBOOK_PERMISSIONS,
  HERPLAN_APP_ID,
  ISignupProviderRequest,
  Logo,
  LogoFacebook,
  LogoGoogle,
  RoleType,
} from "src/shared";
import { GeneralUserRegForm, ProviderRegForm1 } from "src/components/organisms";
import { useDispatch } from "react-redux";
import { resetSignupProviderRequestState, resetSignupUserRequestState } from "src/store/auth";
import { BackButton } from "src/components/atoms";
import { Device } from "@capacitor/device";
import { SignInWithApple } from "@capacitor-community/apple-sign-in";
import { FacebookLogin } from "@capacitor-community/facebook-login";

const CreateAccount1 = () => {
  const dispatch = useDispatch();
  const [presentToast] = useIonToast();
  const [presentAlert] = useIonAlert();
  const [roleType, setRoleType] = useState<RoleType>("provider");
  const [socialRes, setSocialRes] = useState<Partial<ISignupProviderRequest>>({});
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    dispatch(resetSignupProviderRequestState());
    dispatch(resetSignupUserRequestState());
  }, []);

  const registerWithApple = () => {
    SignInWithApple.authorize({
      clientId: HERPLAN_APP_ID,
      redirectURI: "",
      scopes: "email name",
    })
      .then((res) => {
        const { familyName, givenName, email, user } = res.response;
        if (!email) {
          presentAlert(
            "You already logged in, go to Settings --> your profile --> Password and Security --> and remove your app in the list of apps that uses Apple ID. and then try to login again."
          );
        } else if (email && user && familyName && givenName) {
          const data: Partial<ISignupProviderRequest> = {
            name: `${familyName} ${givenName}`,
            firstName: familyName,
            lastName: givenName,
            email: email,
            socialToken: user,
            type: "apple",
          };
          setSocialRes(data);
        }
      })
      .catch((error) => {
        console.error("Error Apple Login:", error);
      });
  };

  const registerWithGoogle = () => {
    GoogleAuth.signIn()
      .then((res) => {
        const { email, familyName, givenName, name, id } = res;
        if (email && id) {
          const data: Partial<ISignupProviderRequest> = {
            name: name,
            firstName: familyName,
            lastName: givenName,
            email: email,
            socialToken: id,
            type: "google",
          };
          setSocialRes(data);
          presentAlert({
            message: "You are authorised! Please add required field and press signup",
          });
        } else {
          presentToast({ message: `Unknow Error: Google Signup.`, color: "danger" });
        }
      })
      .catch((error) => {
        console.error("Error google signup:", error);
      });
  };

  const registerWithFacebook = () => {
    FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS })
      .then(async (res) => {
        if (res && res.accessToken) {
          const profile = await FacebookLogin.getProfile<{
            id: string;
            email: string;
            name: string;
            first_name: string;
            last_name: string;
          }>({
            fields: ["email, name, first_name, last_name"],
          });
          const data: Partial<ISignupProviderRequest> = {
            name: profile.name,
            firstName: profile.first_name,
            lastName: profile.last_name,
            email: profile.email,
            socialToken: profile.id,
            type: "facebook",
          };
          setSocialRes(data);
          presentAlert({
            message: "You are authorised! Please add required field and press signup",
          });
        }
      })
      .catch((error) => {
        console.error("Error Facebook signup:", error);
      });
  };

  useIonViewWillEnter(() => {
    Device.getInfo().then((deviceInfo) => {
      setIsAndroid(deviceInfo.platform === "android");
    });
  });

  return (
    <IonPage id="register-page">
      <IonContent className="ion-padding">
        <BackButton />
        <IonGrid className="flex flex-col pt-12">
          <IonRow>
            <IonCol size="12">
              <IonImg className="register-logo" src={Logo} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <IonText className="register-title">Create your Account</IonText>
            </IonCol>
            <IonCol size="12">
              <IonSegment
                value={roleType}
                onIonChange={(e) => setRoleType(e.target.value as RoleType)}
              >
                <IonSegmentButton value="provider">I'M A PROVIDER</IonSegmentButton>
                <IonSegmentButton value="general user">I'M A GENERAL USER</IonSegmentButton>
              </IonSegment>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              {roleType === "provider" ? (
                <ProviderRegForm1 socialRes={socialRes} />
              ) : (
                <GeneralUserRegForm socialRes={socialRes} />
              )}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="text-center">
              <IonText className="text-[14px]">Or sign in with</IonText>
            </IonCol>
            <IonCol size="12" className="flex flex-row space-x-3 justify-center">
              {!isAndroid && (
                <IonButton className="social-btn" color="light" onClick={registerWithApple}>
                  <IonIcon slot="icon-only" icon={logoApple}></IonIcon>
                </IonButton>
              )}
              <IonButton className="social-btn" color="light" onClick={registerWithGoogle}>
                <IonIcon slot="icon-only" icon={LogoGoogle}></IonIcon>
              </IonButton>
              <IonButton className="social-btn" color="light" onClick={registerWithFacebook}>
                <IonIcon slot="icon-only" icon={LogoFacebook}></IonIcon>
              </IonButton>
            </IonCol>
            <IonCol className="flex flex-row justify-center text-[14px] space-x-1">
              <IonText className="my-auto">Already have an account?</IonText>
              <IonButton className="login-btn" fill="clear" color="dark" routerLink="/login">
                Login.
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default CreateAccount1;
