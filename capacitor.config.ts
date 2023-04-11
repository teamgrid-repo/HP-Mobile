// <reference types="@capacitor/splash-screen" />
import { CapacitorConfig } from "@capacitor/cli";
import { KeyboardResize } from "@capacitor/keyboard";

const config: CapacitorConfig = {
  appId: "com.mobile.herplan",
  appName: "HerPlan",
  webDir: "dist",
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      backgroundColor: "#ffffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true,
    },
    GoogleAuth: {
      scopes: ["profile", "email"],
      serverClientId: "759230965822-ciitnedhb45eiqlcvfe9rvd48re4usgl.apps.googleusercontent.com",
      forceCodeForRrfreshToken: true,
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
    Keyboard: {
      resize: KeyboardResize.Ionic,
    },
  },
  // server: {
  //   url: "http://192.168.1.198:8100", //<= use address the server is running on locally
  //   cleartext: true,
  // },
  android: {
    buildOptions: {
      keystorePath: "/Volumes/Work/Github/Copper-Vine-Studio/HerPlan-Mobile/release-keystore.jks",
      keystoreAlias: "key0",
    },
  },
};

export default config;
