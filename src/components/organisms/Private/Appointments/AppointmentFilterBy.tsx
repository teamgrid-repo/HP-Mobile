import { IonItem, IonSelect, IonSelectOption } from "@ionic/react";
import { memo } from "react";
import { useSelector } from "react-redux";
import { APPOINTMENT_SORT_TYPES } from "src/shared";
import { useAppDispatch } from "src/store/config-store";
import { appointmentFilterByStateSelector, setAppointmentsFilterByState } from "src/store/provider";
import "./style.scss";

const AppointmentFilterBy = () => {
  const dispatch = useAppDispatch();
  const sortType = useSelector(appointmentFilterByStateSelector);

  return (
    <div className="my-5 mx-8 appointment-sort-by">
      <IonItem lines="none">
        <IonSelect
          label="Filter By"
          labelPlacement="floating"
          className="w-full capitalize"
          value={sortType}
          placeholder="Select Sort..."
          onIonChange={(e) => {
            dispatch(setAppointmentsFilterByState(e.detail.value));
          }}
        >
          {APPOINTMENT_SORT_TYPES.map((sType) => (
            <IonSelectOption key={sType} value={sType} className="capitalize">
              {sType}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>
    </div>
  );
};

export default memo(AppointmentFilterBy);
