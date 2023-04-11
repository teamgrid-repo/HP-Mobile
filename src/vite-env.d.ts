/// <reference types="vite/client" />
interface ImportMetaEnv extends Readonly<Record<string, string | boolean | undefined>> {
  readonly HERPLAN_FIREBASE_APIKEY: string;
  readonly HERPLAN_FIREBASE_AUTHDOMAIN: string;
  readonly HERPLAN_FIREBASE_PROJECTID: string;
  readonly HERPLAN_FIREBASE_STORAGE_BUCKET: string;
  readonly HERPLAN_FIREBASE_MESSAGING_SENDERID: string;
  readonly HERPLAN_FIREBASE_APPID: string;
  readonly HERPLAN_FIREBASE_MESAUREMENTID: string;
  readonly HERPLAN_GOOGLE_CLIENT_ID: string;
  readonly HERPLAN_GOOGLE_IOS_CLIENT_ID: string;
  readonly HERPLAN_FACEBOOK_APPID: string;
  readonly HERPLAN_MAP_APIKEY: string;
  readonly HERPLAN_WEB_URL: string;
  readonly HERPLAN_PREFIX: string;
  readonly HERPLAN_APP_ID: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
