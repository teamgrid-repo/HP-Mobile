import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";
import { memo, useState } from "react";
import { OrganizationView, SiteViewList } from "src/components/organisms";
import { IOrganization, SegOrganizationListingType, SEG_ORG_LIST } from "src/shared";

interface Props {
  organization: IOrganization | null;
}
const OrgListingView = ({ organization }: Props) => {
  const [selectedSegment, setSelectedSegment] =
    useState<SegOrganizationListingType>("Organization");

  return (
    <>
      <div className="p-4">
        <IonSegment
          value={selectedSegment}
          onIonChange={(e) => {
            if (e.target.value) setSelectedSegment(e.target.value as SegOrganizationListingType);
          }}
        >
          {SEG_ORG_LIST.map((segment) => (
            <IonSegmentButton key={segment} value={segment}>
              <IonLabel>{segment}</IonLabel>
            </IonSegmentButton>
          ))}
        </IonSegment>
      </div>
      {selectedSegment === "Organization" && <OrganizationView organization={organization} />}
      {selectedSegment === "Sites" && <SiteViewList />}
    </>
  );
};

export default memo(OrgListingView);
