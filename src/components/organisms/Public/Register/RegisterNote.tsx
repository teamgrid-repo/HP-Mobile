import { IonIcon, IonText } from "@ionic/react";
import { informationCircleOutline } from "ionicons/icons";

interface Props {
  type: "provider" | "general";
}

const RegisterNote = ({ type }: Props) => {
  return (
    <>
      <p className="flex">
        <IonIcon color="medium" icon={informationCircleOutline} className="mr-1" />
        <IonText color="medium" className="text-[10px]">
          {type === "provider"
            ? "We use this for organizations offering direct services to women and families."
            : "We use this for clients and community leaders without direct service programs."}
        </IonText>
      </p>
    </>
  );
};

export default RegisterNote;
