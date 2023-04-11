import { IonButton, IonIcon } from "@ionic/react";
import isValid from "date-fns/isValid";
import parseISO from "date-fns/parseISO";
import { calendarOutline } from "ionicons/icons";
import { useEffect } from "react";
import { getDateFormat, useDatePicker } from "src/shared";

interface Props {
  value: string;
  onDateChange: (date: string) => void;
}

const DateInput = ({ value, onDateChange }: Props) => {
  const { selectedDate, openDatepicker } = useDatePicker(value || "");
  let formattedDate = selectedDate;
  try {
    formattedDate = value
      ? isValid(new Date(selectedDate))
        ? getDateFormat(parseISO(selectedDate))
        : selectedDate
      : "";
  } catch (error) {
    console.error("Error Date Format:", error);
  }

  useEffect(() => {
    onDateChange(selectedDate);
  }, [selectedDate]);

  return (
    <div className="min-h-[42px] flex justify-between border border-solid border-[#eee] rounded-[8px] w-full">
      <span className="ml-[21px] my-auto" onClick={openDatepicker}>
        {formattedDate}
      </span>
      <IonButton className="my-auto" fill="clear" color="medium" onClick={openDatepicker}>
        <IonIcon slot="icon-only" icon={calendarOutline} />
      </IonButton>
    </div>
  );
};

export default DateInput;
