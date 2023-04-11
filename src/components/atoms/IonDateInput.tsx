import { IonButton, IonDatetime, IonIcon, IonModal } from "@ionic/react";
import { formatISO } from "date-fns";
import format from "date-fns/format";
import isValid from "date-fns/isValid";
import parseISO from "date-fns/parseISO";
import { calendarOutline } from "ionicons/icons";
import { DEFAULT_ION_DATE_FORMAT, getDateFormat } from "src/shared";

interface Props {
  value: string;
  onDateChange: (date: string) => void;
}

const IonDateInput = ({ value, onDateChange }: Props) => {
  let formattedDate = value;
  try {
    formattedDate = value
      ? isValid(new Date(value))
        ? getDateFormat(parseISO(value))
        : value
      : "";
  } catch (error) {
    console.error("Error Date Format:", error);
  }

  return (
    <>
      <div className="min-h-[42px] flex justify-between border border-solid border-[#eee] rounded-[8px] w-full">
        <span className="ml-[21px] my-auto">{formattedDate}</span>
        <IonButton className="my-auto" fill="clear" color="medium" id="open-date-modal">
          <IonIcon slot="icon-only" icon={calendarOutline} />
        </IonButton>
      </div>
      <IonModal
        className="ion-datetime-button-overlay "
        id="ion-date-modal"
        keepContentsMounted
        trigger="open-date-modal"
      >
        <IonDatetime
          id="datetime"
          presentation="date"
          color="success"
          showDefaultButtons
          value={value}
          min={format(new Date(), DEFAULT_ION_DATE_FORMAT)}
          onIonChange={(e) => {
            onDateChange(formatISO(parseISO(e.target.value as string)));
          }}
        ></IonDatetime>
      </IonModal>
    </>
  );
};

export default IonDateInput;
