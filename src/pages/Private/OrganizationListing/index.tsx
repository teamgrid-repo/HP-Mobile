import { IonPage, IonContent } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BackButton } from "src/components/atoms";
import { PageHeader } from "src/components/organisms";
import { useDeepEffect } from "src/hooks";
import {
  userStateSelector,
  getOrganizationRequest,
  GET_ORGANIZATION_REQUEST,
  getSitesRequest,
  GET_SITES_REQUEST,
  organizationStateSelector,
} from "src/store/auth";
import { multiLoadingSelector } from "src/store/global";
import OrgListingEdit from "./OrgListingEdit";
import OrgListingView from "./OrgListingView";
import "./style.scss";

const OrganizationListingPage = () => {
  const dispatch = useDispatch();
  const page = useRef(null);
  const loading = useSelector(multiLoadingSelector([GET_ORGANIZATION_REQUEST, GET_SITES_REQUEST]));
  const organization = useSelector(organizationStateSelector);
  const currentUser = useSelector(userStateSelector);
  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  useDeepEffect(() => {
    if (currentUser && currentUser._id && currentUser.role === "provider") {
      dispatch(getOrganizationRequest(currentUser._id));
    }
  }, [currentUser]);

  useDeepEffect(() => {
    if (currentUser && currentUser._id && organization?._id) {
      dispatch(getSitesRequest({ uid: currentUser._id, orgId: organization._id }));
    }
  }, [currentUser, organization]);

  return (
    <IonPage id="organization-listing-page" ref={page}>
      <IonContent forceOverscroll={false}>
        <BackButton routerLink="/tabs/tab-account" />
        <div className="flex flex-col h-full">
          <PageHeader title="Organization Listing" loading={loading} />
          {currentUser?.profileId.makeAccountPrimary ? (
            <OrgListingEdit
              currentUser={currentUser}
              organization={organization}
              presentingElement={presentingElement}
            />
          ) : (
            <OrgListingView organization={organization} />
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default OrganizationListingPage;
