import { IonContent, IonPage } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { BackButton } from "src/components/atoms";
import { AppointmentList, AppointmentFilterBy, PageHeader } from "src/components/organisms";
import { useAppDispatch } from "src/store/config-store";
import { getAppointmentsRequest } from "src/store/provider";
import "./style.scss";

const Appointments = () => {
  const dispatch = useAppDispatch();
  const page = useRef(null);
  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPresentingElement(page.current);
    dispatch(getAppointmentsRequest());
  }, []);

  return (
    <IonPage id="appointment-page" ref={page}>
      <IonContent forceOverscroll={false}>
        <BackButton routerLink="/tabs/tab-dashboard" />
        <div className="flex flex-col h-full">
          <PageHeader title="Appointments" headerStyle={2} />
          <AppointmentFilterBy />
          <div className="grow">
            <AppointmentList presentingElement={presentingElement} />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Appointments;
