import { Browser } from "@capacitor/browser";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonToolbar,
  useIonModal,
  useIonToast,
} from "@ionic/react";
import { formatISO } from "date-fns";
import { callOutline, close, mailOutline } from "ionicons/icons";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconBySiteType, IonDateInput } from "src/components/atoms";
import { ModalLogin } from "src/components/organisms";
import {
  IBookAppointmentRequest,
  IProfile,
  IProviderDetailState,
  ISavedClient,
  ISiteWithSubCategoryForProviderDetails,
  ISubCategoryForProviderDetails,
  ISubCategoryInfoForProviderDetails,
  IUserResponse,
  LeafIcon,
} from "src/shared";
import { AppointmentService } from "src/shared/services";
import { userStateSelector } from "src/store/auth";
import { getAppointmentsRequest, savedClientsStateSelector } from "src/store/provider";

interface Props {
  subCategoryInfo: ISubCategoryInfoForProviderDetails | null;
  siteInfo: ISiteWithSubCategoryForProviderDetails | null;
  providerDetails: IProviderDetailState | null;
  presentingElement: HTMLElement | null;
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
}

const ModalScheduleAppointment = (props: Props) => {
  const { subCategoryInfo, siteInfo, providerDetails, presentingElement, onDismiss } = props;
  const dispatch = useDispatch();
  const currentUser = useSelector(userStateSelector);
  const savedClients = useSelector(savedClientsStateSelector);
  const [presentLoginM, dismissLoginM] = useIonModal(ModalLogin, {
    onDismiss: (data: string, role: string) => dismissLoginM(data, role),
  });
  const [presentToast] = useIonToast();

  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedSubCat, setSelectedSubCat] = useState<ISubCategoryForProviderDetails | null>(null);
  const [selectedPoc, setSelectedPoc] = useState<IProfile | null>(null);
  const [selectedClient, setSelectedClient] = useState<ISavedClient | null>(null);
  const [date, setDate] = useState(formatISO(new Date()));

  const sharableClients = savedClients.filter((item) => item.optShareData);

  useEffect(() => {
    setSelectedSubCat(subCategoryInfo?.subCat.length ? subCategoryInfo.subCat[0] : null);
  }, []);

  useEffect(() => {
    setSelectedPoc(selectedSubCat?.poc.length ? selectedSubCat.poc[0] : null);
  }, [selectedSubCat, siteInfo]);

  const handleAppointment = () => {
    if (!currentUser) {
      if (presentingElement) presentLoginM({ presentingElement: presentingElement });
      return;
    }
    const pocUserId = (selectedPoc?.userId as IUserResponse)._id || "";
    if (
      currentUser.role === "provider" ||
      (currentUser.role === "user" && currentUser.profileId.optShareData)
    ) {
      // appointment request.
      if (selectedSubCat && siteInfo) {
        if (currentUser.role === "provider" && !selectedClient) {
          presentToast({ message: "Please Select From User" });
        } else {
          const data: IBookAppointmentRequest = {
            clientId:
              currentUser.role === "user" ? currentUser._id : selectedClient?.userId._id || "",
            siteId: siteInfo._id,
            subCategoryId: selectedSubCat.subCategoryId,
            date: date,
            providerId: pocUserId,
          };
          if (currentUser._id !== pocUserId) {
            setIsProcessing(true);
            AppointmentService.bookAppointment(data)
              .then((response: any) => {
                if (!response.success && response.message && typeof response.message === "string") {
                  presentToast({ message: response.message, color: "danger" });
                  return;
                }
                if (response.success && response.message && typeof response.message === "string") {
                  presentToast({ message: response.message, color: "success" });
                }
                dispatch(getAppointmentsRequest());
                onDismiss();
              })
              .catch((error) => {})
              .finally(() => {
                setIsProcessing(false);
              });
          }
        }
      }
    } else {
      presentToast({ message: "Please Allow Data Share From Profile" });
    }
  };

  if (!subCategoryInfo) return <></>;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonLabel color="success" className=" font-bold">
            {subCategoryInfo.name || ""}
          </IonLabel>
          <IonButtons slot="end">
            <IonButton disabled={isProcessing} onClick={() => onDismiss()} color="success">
              <IonIcon slot="icon-only" icon={close}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent forceOverscroll={false}>
        <IonList lines="none" className="px-[40px] py-[20px]">
          <IonItem>
            <IonSelect
              label="Sub Category"
              labelPlacement="stacked"
              className="w-full"
              onIonChange={(e) => setSelectedSubCat(e.detail.value)}
              value={selectedSubCat}
              placeholder="Select Sub Category..."
            >
              {subCategoryInfo.subCat.map((subCat) => (
                <IonSelectOption key={subCat.subCategoryId} value={subCat}>
                  {subCat.subCategoryName}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          {selectedSubCat && (
            <>
              <IonItem>
                <IonLabel className="ion-text-wrap">
                  <p>Service Name</p>
                  <h2 className="flex">
                    {selectedSubCat.serviceName || selectedSubCat.subCategoryName || "-"}
                    <IconBySiteType
                      homeVisit={siteInfo?.homeVisit || false}
                      virtual={siteInfo?.virtual || false}
                      className="my-auto ml-3"
                    />
                    {selectedSubCat.leaf && (
                      <IonIcon className="w-[18px] h-[18px] ml-3 my-auto" icon={LeafIcon} />
                    )}
                  </h2>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <p>Web Site</p>
                  <h2
                    className="text-[#2eadf3] underline"
                    onClick={() => {
                      const url =
                        selectedSubCat.serviceWebpage || providerDetails?.altWebsite || "";
                      if (url) Browser.open({ url });
                    }}
                  >
                    {selectedSubCat.serviceWebpage || providerDetails?.altWebsite || "-"}
                  </h2>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel className="ion-text-wrap">
                  <p>Description</p>
                  <h2>{selectedSubCat.serviceDescription || providerDetails?.about || "-"}</h2>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel className="ion-text-wrap">
                  <p>Price Of Care</p>
                  {selectedSubCat.price.length > 0 ? (
                    selectedSubCat.price.map((price, index) => <h2 key={index}>{price}</h2>)
                  ) : (
                    <h2>-</h2>
                  )}
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel className="ion-text-wrap">
                  <p>Do you qualify?</p>
                  {selectedSubCat.specialQualiFlag && selectedSubCat.specialQualif.length > 0 ? (
                    selectedSubCat.specialQualif.map((qualification, index) => (
                      <h2 key={index}>{qualification}</h2>
                    ))
                  ) : (
                    <h2>-</h2>
                  )}
                  {selectedSubCat.specialQues && <h2>{selectedSubCat.specialQues}</h2>}
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonSelect
                  label="Contact Provider"
                  labelPlacement="stacked"
                  className="w-full"
                  onIonChange={(e) => setSelectedPoc(e.detail.value)}
                  value={selectedPoc}
                  placeholder="Select Contact Provider..."
                >
                  {selectedSubCat.poc.map((poc) => (
                    <IonSelectOption key={poc._id} value={poc}>
                      {poc.name}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
              {selectedPoc?.email && (
                <IonItem>
                  <IonLabel>{selectedPoc.email}</IonLabel>
                  <IonButton slot="end" fill="clear" className="mx-0" color="success">
                    <IonIcon slot="icon-only" icon={mailOutline}></IonIcon>
                  </IonButton>
                </IonItem>
              )}
              {selectedPoc?.contact && (
                <IonItem>
                  <IonLabel>{selectedPoc.contact}</IonLabel>
                  <IonButton slot="end" fill="clear" className="mx-0" color="success">
                    <IonIcon slot="icon-only" icon={callOutline}></IonIcon>
                  </IonButton>
                </IonItem>
              )}
              {currentUser &&
                currentUser._id &&
                currentUser.profileId.message &&
                selectedPoc &&
                selectedPoc.userId &&
                selectedPoc.userId &&
                selectedPoc.message &&
                (selectedPoc.userId as Partial<IUserResponse>).status &&
                (selectedPoc.userId as Partial<IUserResponse>)._id !== currentUser._id && (
                  <IonButton color="success" expand="block">
                    Message Provider
                  </IonButton>
                )}

              {/* Appintment Booking */}
              <IonItem>
                <IonLabel className="ion-text-wrap">
                  <p>Category of Care</p>
                  <h2>{selectedSubCat.categoryName || "-"}</h2>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel className="ion-text-wrap">
                  <p>Site of Interest</p>
                  <h2>{siteInfo?.name || "-"}</h2>
                </IonLabel>
              </IonItem>
              {currentUser && currentUser.role === "provider" && (
                <IonItem>
                  <IonSelect
                    label="From"
                    labelPlacement="stacked"
                    className="w-full"
                    onIonChange={(e) => setSelectedClient(e.detail.value)}
                    value={selectedClient}
                    placeholder="Select From..."
                  >
                    {sharableClients.map((item) => (
                      <IonSelectOption key={item.userId._id} value={item}>
                        {item.name}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
              )}
              <IonItem>
                <IonLabel>
                  <p>Date</p>
                  <IonDateInput value={date} onDateChange={setDate} />
                </IonLabel>
              </IonItem>
              <IonButton
                color="success"
                expand="block"
                disabled={isProcessing}
                onClick={handleAppointment}
              >
                Request
              </IonButton>
            </>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default memo(ModalScheduleAppointment);
