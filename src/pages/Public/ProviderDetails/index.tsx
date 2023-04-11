import { Share } from "@capacitor/share";
import {
  IonPage,
  IonContent,
  IonButton,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonBackButton,
  IonProgressBar,
  IonIcon,
  useIonToast,
  useIonModal,
  useIonPopover,
} from "@ionic/react";
import { ellipsisHorizontal } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { IconBySiteType } from "src/components/atoms";
import {
  ModalFeedback,
  ModalGetDirection,
  ModalSaveToList,
  ModalScheduleAppointment,
  MyMap,
  PopoverProviderItem,
} from "src/components/molecules";
import { ModalLogin } from "src/components/organisms";
import {
  DEAFULT_MAP_CENTER,
  IMarker,
  ISiteWithSubCategoryForProviderDetails,
  ISubCategoryInfoForProviderDetails,
  MenuActionType,
} from "src/shared";
import { userStateSelector } from "src/store/auth";
import { useAppDispatch } from "src/store/config-store";
import { loadingSelector } from "src/store/global";
import {
  getProviderDetailsRequest,
  getSavedClientsRequest,
  getSavedListingRequest,
  GET_PROVIDER_DETAILS_REQUEST,
  providerDetailStateSelector,
} from "src/store/provider";
import "./style.scss";

interface Props extends RouteComponentProps<{ id: string }> {
  id: string;
}

const ProviderDetails: React.FC<Props> = ({ match }) => {
  const dispatch = useAppDispatch();
  const [presentToast] = useIonToast();
  const currentUser = useSelector(userStateSelector);
  const providerDetails = useSelector(providerDetailStateSelector);
  const loading = useSelector(loadingSelector(GET_PROVIDER_DETAILS_REQUEST));
  const role = currentUser?.role || "";
  const _id = currentUser?._id || "";
  const orgId = match.params.id.split(",")[0];
  const siteId = match.params.id.split(",")[1];
  const page = useRef(null);
  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);
  const [markers, setMarkers] = useState<IMarker[]>([]);
  const [siteInfo, setSiteInfo] = useState<ISiteWithSubCategoryForProviderDetails | null>(null);
  const [selectedSubCategoryInfo, setSelectedSubCategoryInfo] =
    useState<ISubCategoryInfoForProviderDetails | null>(null);
  const [presentProviderItemP, dismissProviderItemP] = useIonPopover(PopoverProviderItem, {
    onDismiss: (data: any, role: string) => dismissProviderItemP(data, role),
  });
  const [presentScheduleAppointmentM, dismissScheduleAppointmentM] = useIonModal(
    ModalScheduleAppointment,
    {
      onDismiss: (data: string, role: string) => dismissScheduleAppointmentM(data, role),
      subCategoryInfo: selectedSubCategoryInfo,
      siteInfo,
      providerDetails,
      presentingElement,
    }
  );
  const [presentFeedbackM, dismissFeedbackM] = useIonModal(ModalFeedback, {
    onDismiss: (data: string, role: string) => dismissFeedbackM(data, role),
    siteId: siteInfo?._id || "",
  });
  const [presentGetDirectionM, dismissGetDirectionM] = useIonModal(ModalGetDirection, {
    onDismiss: (data: string, role: string) => dismissGetDirectionM(data, role),
    origin: markers.length ? markers[0].coordinate : null,
  });
  const [presentLoginM, dismissLoginM] = useIonModal(ModalLogin, {
    onDismiss: (data: string, role: string) => dismissLoginM(data, role),
    title: `You Must Be Logged In to Connect with ${siteInfo?.name || ""}`,
  });
  const [presentSaveToListM, dismissSaveToListM] = useIonModal(ModalSaveToList, {
    onDismiss: (data: string, role: string) => dismissSaveToListM(data, role),
    siteId,
    organisationId: orgId,
  });

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  useEffect(() => {
    dispatch(getProviderDetailsRequest(orgId));
    if (_id) dispatch(getSavedListingRequest());
    if (role === "provider") dispatch(getSavedClientsRequest());
  }, [role, _id]);

  useEffect(() => {
    if (providerDetails && providerDetails.sitesInfo) {
      const fSiteInfo = providerDetails.sitesInfo.find((sInfo) => sInfo._id === siteId);

      if (fSiteInfo) setSiteInfo(fSiteInfo);
      if (fSiteInfo && fSiteInfo.location) {
        setMarkers([
          {
            coordinate: { lat: fSiteInfo.location.lat, lng: fSiteInfo.location.lang },
            title: fSiteInfo.name || "",
          },
        ]);
      }
    }
  }, [siteId, providerDetails]);

  const onOpenPopover = (e: any) => {
    presentProviderItemP({
      event: e,
      onDidDismiss: (e: CustomEvent) => {
        const { role } = e.detail;
        if ((role as MenuActionType) === "save") {
          if (!currentUser && presentingElement) {
            presentLoginM({ presentingElement: presentingElement });
          } else {
            if (presentingElement) presentSaveToListM({ presentingElement: presentingElement });
          }
        } else if ((role as MenuActionType) === "share") {
          Share.share({
            title: "Share",
            text: "Really awesome thing you need to see right now",
            url: "http://ionicframework.com/",
            dialogTitle: "Share with buddies",
          })
            .then((res) => {
              presentToast({ message: "Shared.", color: "tertiary" });
            })
            .catch((error) => {});
        } else if ((role as MenuActionType) === "print") {
          presentToast({ message: "It's in working.", color: "tertiary" });
        }
      },
    });
  };

  return (
    <IonPage id="provider-details-page" ref={page}>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton color="success" defaultHref="/" />
          </IonButtons>
          <IonButtons slot="end">
            {siteInfo && (
              <IonButton fill="clear" color="medium">
                <IconBySiteType homeVisit={siteInfo.homeVisit} virtual={siteInfo.virtual} />
              </IonButton>
            )}
            <IonButton id="open-filter-list" fill="clear" color="medium" onClick={onOpenPopover}>
              <IonIcon slot="icon-only" icon={ellipsisHorizontal} />
            </IonButton>
          </IonButtons>
          {loading && <IonProgressBar type="indeterminate"></IonProgressBar>}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h1 className="provider-title">{siteInfo?.name}</h1>

        <MyMap
          markers={markers}
          center={markers.length > 0 ? markers[0].coordinate : DEAFULT_MAP_CENTER}
          zoom={8}
        />
        <div className="action-group">
          {/* <IonButton
            expand="block"
            color="success"
            fill="outline"
            onClick={() => {
              if (presentingElement)
                presentScheduleAppointmentM({ presentingElement: presentingElement });
            }}
          >
            Schedule Appointment
          </IonButton> */}
          <IonButton
            expand="block"
            color="success"
            fill="outline"
            onClick={() => {
              presentGetDirectionM({});
            }}
          >
            Get Directions
          </IonButton>
          {/* <IonButton expand="block" color="success" fill="outline">
            Contact Us
          </IonButton> */}
        </div>
        {providerDetails?.about && (
          <div className="about-group">
            <h3>About Provider</h3>
            <p>{providerDetails?.about}</p>
          </div>
        )}
        {siteInfo && siteInfo.siteSubCategoryInfo.length > 0 && (
          <div className="categories-care-group">
            <h3>Categories of Care</h3>
            <div className="site-list w-full">
              <div className="overflow-x-auto flex">
                {siteInfo?.siteSubCategoryInfo.map((subCategoryInfo) => (
                  <IonButton
                    key={subCategoryInfo.name}
                    fill="clear"
                    className="nopadding-btn flex-none"
                    onClick={() => {
                      if (presentingElement) {
                        setSelectedSubCategoryInfo(subCategoryInfo);
                        presentScheduleAppointmentM({
                          presentingElement: presentingElement,
                        });
                      }
                    }}
                  >
                    <img slot="icon-only" className="category-icon" src={subCategoryInfo.icon} />
                  </IonButton>
                ))}
              </div>
            </div>
            <IonButton
              className="nopadding-btn"
              color="success"
              fill="clear"
              onClick={() => {
                if (presentingElement) presentFeedbackM({ presentingElement: presentingElement });
              }}
            >
              Provide Feedback
            </IonButton>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ProviderDetails;
