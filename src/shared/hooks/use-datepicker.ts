import { useIonPicker } from "@ionic/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import isValid from "date-fns/isValid";
import { DAYS, MONTHS, YEARS } from "../constants";
import parseISO from "date-fns/parseISO";
import { addHours } from "date-fns";

interface IUseDatePickerOutput {
  selectedDate: string;
  setSelectedDate: Dispatch<SetStateAction<string>>;
  openDatepicker: () => void;
}

const useDatePicker = (initialDate?: string): IUseDatePickerOutput => {
  const [present] = useIonPicker();
  const [selectedDate, setSelectedDate] = useState(initialDate || "");
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    if (selectedDate && isValid(new Date(selectedDate))) {
      const cDate = new Date(parseISO(selectedDate));
      setSelectedYear(YEARS.findIndex((y) => y.value === cDate.getFullYear()));
      setSelectedMonth(MONTHS.findIndex((m) => m.value === cDate.getMonth()));
      setSelectedDay(DAYS.findIndex((d) => d.value === cDate.getDate()));
    }
  }, [selectedDate]);

  const openDatepicker = async () => {
    present({
      columns: [
        { name: "month", options: MONTHS, selectedIndex: selectedMonth },
        { name: "day", options: DAYS, selectedIndex: selectedDay },
        { name: "year", options: YEARS, selectedIndex: selectedYear },
      ],
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Confirm",
          handler: (value) => {
            const { year, month, day } = value;
            if (year.text && month.text && day.text) {
              const monthVal = month.value + 1 < 10 ? `0${month.value + 1}` : month.value + 1;
              const dayValue = day.value < 10 ? `0${day.value}` : day.value;
              const selDate = addHours(new Date(`${year.value}-${monthVal}-${dayValue}`), 12).toISOString();
              setSelectedDate(selDate);
            }
          },
        },
      ],
    });
  };

  return { selectedDate, setSelectedDate, openDatepicker };
};

export default useDatePicker;
