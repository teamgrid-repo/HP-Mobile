import { IonContent, IonPage } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { BackButton } from "src/components/atoms";
import { PageHeader, SavedSearchList, SavedSearchSortBy } from "src/components/organisms";
import { useAppDispatch } from "src/store/config-store";
import { getSavedSearchesRequest } from "src/store/provider";
import "./style.scss";

const SavedSearches = () => {
  const dispatch = useAppDispatch();
  const page = useRef(null);
  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPresentingElement(page.current);
    dispatch(getSavedSearchesRequest());
  }, []);

  return (
    <IonPage id="saved-searches-page" ref={page}>
      <IonContent forceOverscroll={false}>
        <BackButton routerLink="/tabs/tab-dashboard" />
        <div className="flex flex-col h-full">
          <PageHeader title="Saved Searches" headerStyle={2} />
          <SavedSearchSortBy />
          <div className="grow">
            <SavedSearchList presentingElement={presentingElement} />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SavedSearches;
