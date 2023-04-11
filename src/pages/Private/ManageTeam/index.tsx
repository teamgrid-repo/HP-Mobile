import { IonPage, IonContent, IonButton, useIonModal, IonIcon } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { BackButton } from "src/components/atoms";
import { ModalCreateAdditionalMember } from "src/components/molecules";
import { PageHeader, SubUserList } from "src/components/organisms";
import {
  getAdditionalMembersRequest,
  GET_ADDITAIONAL_MEMBERS_REQUEST,
  organizationStateSelector,
  userStateSelector,
} from "src/store/auth";
import { useAppDispatch } from "src/store/config-store";
import { loadingSelector } from "src/store/global";
import "./style.scss";

const ManageTeamPage = () => {
  const dispatch = useAppDispatch();
  const page = useRef(null);
  const loading = useSelector(loadingSelector(GET_ADDITAIONAL_MEMBERS_REQUEST));
  const currentUser = useSelector(userStateSelector);
  const organization = useSelector(organizationStateSelector);
  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);
  const [presentCreateAdditionalMemberM, dismissCreateAdditionalMemberM] = useIonModal(
    ModalCreateAdditionalMember,
    {
      onDismiss: (data: string, role: string) => dismissCreateAdditionalMemberM(data, role),
      organisationId: organization?._id || "",
      userId: currentUser?._id || "",
    }
  );

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  useEffect(() => {
    if (currentUser && currentUser._id && currentUser.profileId.makeAccountPrimary) {
      dispatch(getAdditionalMembersRequest(currentUser._id));
    }
  }, [currentUser]);

  return (
    <IonPage id="manage-team-page" ref={page}>
      <IonContent forceOverscroll={false}>
        <BackButton routerLink="/tabs/tab-account" />
        <div className="flex flex-col h-full">
          <PageHeader title="Manage Team" loading={loading}>
            <IonButton
              className="add-member-btn"
              fill="clear"
              size="small"
              color="success"
              onClick={() => {
                if (presentingElement) {
                  presentCreateAdditionalMemberM({ presentingElement });
                }
              }}
            >
              <IonIcon icon={addOutline} />
              Add Member
            </IonButton>
          </PageHeader>
          <SubUserList presentingElement={presentingElement} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ManageTeamPage;
