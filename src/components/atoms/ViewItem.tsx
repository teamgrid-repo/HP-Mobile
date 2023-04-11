import { Browser } from "@capacitor/browser";
import { IonItem, IonLabel } from "@ionic/react";

interface Props {
  label: string;
  text: string;
  lines?: "none" | "full" | "inset" | undefined;
  canlink?: boolean;
}
const ViewItem = ({ label, text, lines = "none", canlink = false }: Props) => {
  return (
    <IonItem lines={lines}>
      <IonLabel>
        {label && <h3>{label}</h3>}
        {text && (
          <p
            className={`whitespace-normal break-all ${
              canlink ? "underline decoration-sky-500 !text-sky-500" : ""
            }`}
            onClick={() => {
              if (canlink && text) {
                Browser.open({ url: text });
              }
            }}
          >
            {text}
          </p>
        )}
      </IonLabel>
    </IonItem>
  );
};

export default ViewItem;
