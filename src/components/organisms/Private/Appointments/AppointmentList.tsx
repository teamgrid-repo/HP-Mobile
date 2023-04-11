import { useSelector } from "react-redux";
import { Virtuoso } from "react-virtuoso";
import { SuspenseLoader } from "src/components/atoms";
import { userStateSelector } from "src/store/auth";
import { loadingSelector } from "src/store/global";
import { appointmentsStateSelector, GET_APPOINTMENTS_REQUEST } from "src/store/provider";
import AppointmentItemForClient from "./AppointmentItemForClient";
import AppointmentItemForProvider from "./AppointmentItemForProvider";
import "./style.scss";

interface Props {
  presentingElement: HTMLElement | null;
}

const AppointmentList = ({ presentingElement }: Props) => {
  const currentUser = useSelector(userStateSelector);
  const appointments = useSelector(appointmentsStateSelector);
  const loading = useSelector(loadingSelector(GET_APPOINTMENTS_REQUEST));

  return (
    <div className="appointment-list">
      {loading ? (
        <SuspenseLoader />
      ) : appointments.length === 0 ? (
        <p className="text-center">No appointment found!</p>
      ) : (
        <Virtuoso
          style={{ height: "100%" }}
          data={appointments}
          itemContent={(index, item) =>
            currentUser?.role === "provider" ? (
              <AppointmentItemForProvider
                item={item}
                currentUser={currentUser}
                presentingElement={presentingElement}
              />
            ) : (
              <AppointmentItemForClient
                item={item}
                currentUser={currentUser}
                presentingElement={presentingElement}
              />
            )
          }
        />
      )}
    </div>
  );
};

export default AppointmentList;
