import { IonChip } from "@ionic/react";
import React from "react";

interface Props {
  status: string;
}

const AppointmentStatusChip = ({ status }: Props) => {
  return (
    <IonChip
      className="px-3 py-1 rounded-[2px] text-[9px] m-0 h-[18px] capitalize"
      color={status === "pending" ? "warning" : status === "cancelled" ? "danger" : "success"}
    >
      {status}
    </IonChip>
  );
};

export default AppointmentStatusChip;
