import { IonPage, IonContent, IonImg, IonText, IonButton, useIonModal } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Logo } from "src/shared";
import { isLoggedInSelector } from "src/store/auth";
import {
  filterRequestStateSelector,
  getFilterSearchRequest,
  getSavedListingRequest,
  setFilterRequestState,
} from "src/store/provider";
import { useDeepEffect } from "src/hooks";
import { BackButton } from "src/components/atoms";
import "./style.scss";
import {
  FilterOptions,
  ProviderFilterHeader,
  ProviderFilterLocation,
  ProviderList,
  ProviderMap,
  ProviderSearchInput,
  TakeTheQuizAction,
} from "src/components/organisms";
import { ModalAdditionalResourcesInfo } from "src/components/molecules";

const ProviderSearch = () => {
  const dispatch = useDispatch();
  const page = useRef(null);
  const filterRequestState = useSelector(filterRequestStateSelector);
  const isLoggedIn = useSelector(isLoggedInSelector);
  const [presentAdditionalM, dismissAdditionalM] = useIonModal(ModalAdditionalResourcesInfo, {
    onDismiss: (data: string, role: string) => dismissAdditionalM(data, role),
  });
  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);

  const openAdditionalResourcesInfoModal = () => {
    presentAdditionalM({ cssClass: "additional-resources-info-modal" });
  };

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  useEffect(() => {
    if (isLoggedIn) dispatch(getSavedListingRequest());
  }, [isLoggedIn]);

  useDeepEffect(() => {
    dispatch(getFilterSearchRequest(filterRequestState));
  }, [filterRequestState]);

  return (
    <IonPage id="provider-search-page" ref={page}>
      <IonContent slot="fixed" forceOverscroll fullscreen>
        <BackButton />

        <IonImg className="provider-search-logo" src={Logo} />
        <TakeTheQuizAction description="Not sure what to search for?" />
        {!isLoggedIn && (
          <div className="auth-container">
            <IonButton
              className="singup-btn"
              expand="block"
              color="success"
              routerLink="/register/create-account1"
            >
              Sign Up
            </IonButton>
            <div className="flex flex-row justify-center text-[14px] space-x-1">
              <IonText className="my-auto">Already have an account?</IonText>
              <IonButton className="login-btn" fill="clear" color="dark" routerLink="/login">
                Login.
              </IonButton>
            </div>
          </div>
        )}
        <div className="provider-search-container space-y-4">
          <div className="flex flex-col space-y-3">
            <ProviderFilterHeader />
            <ProviderFilterLocation presentingElement={presentingElement} />
            <ProviderSearchInput />
          </div>
          <ProviderMap />
          <FilterOptions />
          <ProviderList presentingElement={presentingElement} />
          <div className="flex flex-col pb-16">
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

export default ProviderSearch;
