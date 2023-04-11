import {
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonButton,
  IonIcon,
  useIonModal,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { memo, useState } from "react";
import { ModalCreateSiteInfo } from "src/components/molecules";
import { OrganizationEdit, SiteList } from "src/components/organisms";
import { IOrganization, IUserResponse, SegOrganizationListingType, SEG_ORG_LIST } from "src/shared";

interface Props {
  currentUser: IUserResponse | null;
  organization: IOrganization | null;
  presentingElement: HTMLElement | null;
}
const OrgListingEdit = ({ currentUser, organization, presentingElement }: Props) => {
  const [selectedSegment, setSelectedSegment] =
    useState<SegOrganizationListingType>("Organization");
  const [presentCreateSiteM, dismissCreateSiteM] = useIonModal(ModalCreateSiteInfo, {
    onDismiss: (data: string, role: string) => dismissCreateSiteM(data, role),
    organisationId: organization?._id || "",
    userId: currentUser?._id || "",
  });

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
      {selectedSegment === "Organization" && <OrganizationEdit />}
      {selectedSegment === "Sites" && (
        <>
          <div className="flex justify-end pr-4">
            <IonButton
              size="small"
              fill="solid"
              onClick={() => {
                if (presentingElement) presentCreateSiteM({ presentingElement });
              }}
            >
              <IonIcon icon={addOutline} />
              Add
            </IonButton>
          </div>
          <SiteList presentingElement={presentingElement} />
        </>
      )}
    </>
  );
};

export default memo(OrgListingEdit);
