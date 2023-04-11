import { IonText } from "@ionic/react";
import { useSelector } from "react-redux";
import { Virtuoso } from "react-virtuoso";
import { organizationStateSelector, sitesStateSelector, userStateSelector } from "src/store/auth";
import SiteItem from "./SiteItem";

interface Props {
  presentingElement: HTMLElement | null;
}

const SiteList = ({ presentingElement }: Props) => {
  const organization = useSelector(organizationStateSelector);
  const currentUser = useSelector(userStateSelector);
  const sites = useSelector(sitesStateSelector);

  return (
    <div className="site-list">
      {organization?.approvalPending && (
        <IonText color="danger" className="text-[12px]">
          Your account is under approval please contact to admin for more details
        </IonText>
      )}
      {sites.length === 0 ? (
        <p>No Site Data Found!</p>
      ) : (
        <Virtuoso
          style={{ height: "100%" }}
          data={sites}
          itemContent={(index, item) => {
            return (
              <SiteItem
                item={item}
                organization={organization}
                currentUser={currentUser}
                presentingElement={presentingElement}
              />
            );
          }}
        />
      )}
    </div>
  );
};

export default SiteList;
