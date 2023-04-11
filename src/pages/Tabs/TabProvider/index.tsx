import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  useIonModal,
  useIonViewWillEnter,
  IonProgressBar,
} from "@ionic/react";
import "./style.scss";
import { useSelector } from "react-redux";
import { useDeepEffect } from "src/hooks";
import {
  GET_FILTER_SEARCH_REQUEST,
  filterRequestStateSelector,
  getFilterSearchRequest,
  getSavedListingRequest,
  setFilterRequestState,
} from "src/store/provider";
import { useAppDispatch } from "src/store/config-store";
import { ModalAdditionalResourcesInfo, ModalProviderFilterList } from "src/components/molecules";
import { FC, useEffect, useRef, useState } from "react";
import { RouteComponentProps } from "react-router";
import {
  ProviderFilterLocation,
  ProviderSearchInput,
  ProviderMap,
  FilterOptions,
  ProviderList,
} from "src/components/organisms";
import { loadingSelector } from "src/store/global";

const TabProvider: FC<RouteComponentProps> = ({ match }) => {
  const dispatch = useAppDispatch();
  const page = useRef(null);
  const filterRequestState = useSelector(filterRequestStateSelector);
  const loading = useSelector(loadingSelector(GET_FILTER_SEARCH_REQUEST));
  const [presentProviderFilterM, dismissProviderFilterM] = useIonModal(ModalProviderFilterList, {
    onDismiss: (data: string, role: string) => dismissProviderFilterM(data, role),
  });
  const [presentAdditionalM, dismissAdditionalM] = useIonModal(ModalAdditionalResourcesInfo, {
    onDismiss: (data: string, role: string) => dismissAdditionalM(data, role),
  });
  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  useDeepEffect(() => {
    dispatch(getFilterSearchRequest(filterRequestState));
  }, [filterRequestState]);

  const openAdditionalResourcesInfoModal = () => {
    presentAdditionalM({ cssClass: "additional-resources-info-modal" });
  };

  useIonViewWillEnter(() => {
    dispatch(getSavedListingRequest());
  });

  return (
    <IonPage id="tab-provider-page" ref={page}>
      <IonHeader translucent={!filterRequestState.additionalResource} className="ion-no-border">
        <IonToolbar
          style={filterRequestState.additionalResource ? { "--background": "black" } : {}}
        >
          <IonTitle style={filterRequestState.additionalResource ? { "--color": "white" } : {}}>
            {filterRequestState.additionalResource ? "Additional Resources" : "Provider Search"}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton
              fill="clear"
              color="success"
              className="nopadding-btn"
              onClick={() =>
                presentProviderFilterM({
                  initialBreakpoint: 0.9,
                  breakpoints: [0.5, 0.9],
                  cssClass: ["filter-search-modal"],
                })
              }
            >
              Filter List
            </IonButton>
          </IonButtons>
          {loading && <IonProgressBar type="indeterminate" color="success"></IonProgressBar>}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              {filterRequestState.additionalResource ? "Additional Resources" : "Provider Search"}
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="provider-search-container space-y-4">
          <div className="flex flex-col space-y-3">
            <ProviderFilterLocation presentingElement={presentingElement} />
            <ProviderSearchInput />
          </div>
          <ProviderMap />
          <FilterOptions />
          <ProviderList presentingElement={presentingElement} />
          <div className="flex flex-col pb-16">
            <h2 className="text-[18px] text-center">Not sure what you're looking for?</h2>
            <IonButton color="success" expand="block" routerLink={`${match.path}/quiz`}>
              Take the quiz
            </IonButton>
            {filterRequestState.additionalResource ? (
              <IonButton
                color="light"
                expand="block"
                onClick={() => dispatch(setFilterRequestState({ additionalResource: false }))}
              >
                Go To Provider Search
              </IonButton>
            ) : (
              <IonButton color="light" expand="block" onClick={openAdditionalResourcesInfoModal}>
                View additional resources
              </IonButton>
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TabProvider;
