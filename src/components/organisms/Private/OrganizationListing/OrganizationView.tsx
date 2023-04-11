import { IonList, IonItem, IonLabel, IonInput, IonTextarea } from "@ionic/react";
import { IOrganization } from "src/shared";
import "./style.scss";

interface Props {
  organization: IOrganization | null;
}
const OrganizationView = ({ organization }: Props) => {
  return (
    <div className="organization-listing">
      {organization ? (
        <IonList lines="none">
          <IonItem>
            <IonLabel>
              <h2>Organization Name</h2>
              <p>{organization.publicName}</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h2>Phone Number</h2>
              <p>{organization.contact}</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h2>Address</h2>
              <p className="ion-text-wrap">{organization.address}</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h2>City</h2>
              <p className="ion-text-wrap">{organization.city}</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h2>Zipcode</h2>
              <p className="ion-text-wrap">{organization.zipcode}</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h2>State</h2>
              <p className="ion-text-wrap">{organization.state}</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h2>Website</h2>
              <p className="ion-text-wrap">{organization.altWebsite}</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h2>About</h2>
              <p className="ion-text-wrap">{organization.about}</p>
            </IonLabel>
          </IonItem>
        </IonList>
      ) : (
        <>no data</>
      )}
    </div>
  );
};

export default OrganizationView;
