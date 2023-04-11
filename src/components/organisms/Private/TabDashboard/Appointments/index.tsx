import { IonButton, IonLabel, IonList, IonListHeader, useIonRouter } from "@ionic/react";
import { sortBy } from "lodash";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useDeepEffect } from "src/hooks";
import { IAppointment, ICareCategory } from "src/shared";
import { userStateSelector } from "src/store/auth";
import { categoriesStateSelector } from "src/store/category";
import { appointmentsStateSelector } from "src/store/provider";
import AppointmentItem from "./AppointmentItem";

interface Props {
  presentingElement: HTMLElement | null;
}

const TabOverviewAppointments = ({ presentingElement }: Props) => {
  const navigation = useIonRouter();
  const currentUser = useSelector(userStateSelector);
  const appointments = useSelector(appointmentsStateSelector);
  const categories = useSelector(categoriesStateSelector);

  const appointmentsOverNow = appointments.filter(
    (item) => item.date && new Date(item.date) >= new Date() && item.status !== "cancelled"
  );

  const openAppointments = () => {
    navigation.push("/tabs/tab-dashboard/appointments", "forward");
  };

  if (appointmentsOverNow.length === 0) return <></>;

  return (
    <IonList lines="none">
      <IonListHeader>
        <IonLabel>Appointments</IonLabel>
        <IonButton color="success" onClick={openAppointments}>
          See All
        </IonButton>
      </IonListHeader>
      {appointmentsOverNow.map((appointment) => (
        <AppointmentItem
          key={appointment._id}
          appointment={appointment}
          currentUser={currentUser}
          categories={categories}
          presentingElement={presentingElement}
        />
      ))}
    </IonList>
  );
};

export default TabOverviewAppointments;
