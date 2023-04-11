import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar,
  useIonModal,
  useIonToast,
} from "@ionic/react";
import { useFormik } from "formik";
import { reduce } from "lodash";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ItemLabelCounter } from "src/components/atoms";
import { SaveSiteLocationSchema, ISiteCreateRequest, USA_STATES } from "src/shared";
import { AuthService } from "src/shared/services";
import { cureCategoriesInOrgStateSelector, getSitesRequest } from "src/store/auth";
import { useAppDispatch } from "src/store/config-store";
import { getDetails } from "use-places-autocomplete";
import ModalSearchAddress from "./ModalSearchAddress";

interface Props {
  organisationId: string;
  userId: string;
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
}

const ModalCreateSiteInfo = ({ organisationId, userId, onDismiss }: Props) => {
  const dispatch = useAppDispatch();
  const [presentToast] = useIonToast();
  const careSubCategoriesInOrg = useSelector(cureCategoriesInOrgStateSelector);
  const [isProcessing, setIsProcessing] = useState(false);
  const [presentSearchAddressM, dismissSearchAddressM] = useIonModal(ModalSearchAddress, {
    onDismiss: (data: string, role: string) => dismissSearchAddressM(data, role),
    onClickedAddress: (item: google.maps.places.AutocompletePrediction) => handleAddressItem(item),
  });
  const initializeData: ISiteCreateRequest = {
    name: "",
    address: "",
    location: { lat: 0, lang: 0 },
    website: "",
    zipcode: "",
    state: [],
    category: [],
    subcategory: [],
    HQ: false,
    radius: 0,
    city: "",
    virtual: true,
    homeVisit: false,
    additional: false,
    userId,
    organisationId,
  };

  const formik = useFormik({
    initialValues: initializeData,
    enableReinitialize: true,
    validationSchema: SaveSiteLocationSchema,
    onSubmit: (values) => createSiteLocation(values),
  });
  const { errors, touched, handleSubmit, values, setFieldValue } = formik;

  const createSiteLocation = (values: ISiteCreateRequest) => {
    if (!values.organisationId || !values.userId) return;
    setIsProcessing(true);
    AuthService.createSiteLocation(values)
      .then((res: any) => {
        if (res.success) {
          if (values.userId)
            dispatch(getSitesRequest({ orgId: values.organisationId, uid: values.userId }));
          onDismiss();
        }
        if (res.message) presentToast({ message: res.message, color: "success" });
      })
      .catch((error) => {
        console.error("Error createSiteLocation:", error);
        if (error && error.response && error.response.data && error.response.data.message) {
          presentToast({ message: error.response.data.message, color: "danger" });
        }
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  const handleAddressItem = (item: google.maps.places.AutocompletePrediction) => {
    getDetails({ placeId: item.place_id }).then((placeDetails: any) => {
      if (placeDetails && placeDetails.formatted_address && placeDetails.geometry.location) {
        setFieldValue("address", placeDetails.formatted_address);
        setFieldValue("location", {
          lat: placeDetails.geometry.location.lat(),
          lang: placeDetails.geometry.location.lng(),
        });
      }
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Site Location</IonTitle>
          <IonButtons slot="end">
            <IonButton disabled={isProcessing} onClick={() => onDismiss()}>
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent forceOverscroll={false}>
        <form onSubmit={handleSubmit}>
          <IonList lines="none" className="px-[40px] py-[20px]">
            <IonItem>
              <IonInput
                className={`${!errors["name"] && "ion-valid"} ${errors["name"] && "ion-invalid"} ${
                  touched["name"] && "ion-touched"
                }`}
                label="Name"
                labelPlacement="stacked"
                placeholder="Name"
                value={values.name}
                errorText={errors["name"] || ""}
                onIonInput={(event) => setFieldValue("name", event.target.value)}
              />
            </IonItem>
            <IonItem>
              <IonInput
                className={`${!errors["address"] && "ion-valid"} ${
                  errors["address"] && "ion-invalid"
                } ${touched["address"] && "ion-touched"}`}
                label="Address"
                labelPlacement="stacked"
                placeholder="Address"
                value={values.address}
                errorText={errors["address"] || ""}
                onClick={() => {
                  presentSearchAddressM({
                    initialBreakpoint: 0.75,
                    breakpoints: [0, 0.25, 0.5, 0.75],
                  });
                }}
              />
            </IonItem>
            <IonItem>
              <IonInput
                className={`${!errors["city"] && "ion-valid"} ${errors["city"] && "ion-invalid"} ${
                  touched["city"] && "ion-touched"
                }`}
                label="City"
                labelPlacement="stacked"
                placeholder="City"
                value={values.city}
                errorText={errors["city"] || ""}
                onIonInput={(event) => setFieldValue("city", event.target.value)}
              />
            </IonItem>
            <IonItem>
              <IonInput
                className={`${!errors["zipcode"] && "ion-valid"} ${
                  errors["zipcode"] && "ion-invalid"
                } ${touched["zipcode"] && "ion-touched"}`}
                label="Zipcode"
                labelPlacement="stacked"
                placeholder="Zipcode"
                value={values.zipcode}
                errorText={errors["zipcode"] || ""}
                onIonInput={(event) => setFieldValue("zipcode", event.target.value)}
              />
            </IonItem>
            <IonItem>
              <IonSelect
                className={`${!errors["state"] && "ion-valid"} ${
                  errors["state"] && "ion-invalid"
                } ${touched["state"] && "ion-touched"}`}
                label="State"
                labelPlacement="stacked"
                onIonChange={(e) => setFieldValue("state", e.detail.value)}
                value={values.state}
                placeholder="Select State..."
              >
                {USA_STATES.map((s) => (
                  <IonSelectOption key={s.abbreviation} value={s.abbreviation}>
                    {s.name}
                  </IonSelectOption>
                ))}
              </IonSelect>
              <IonNote slot="error" className="block">
                {errors["state"]}
              </IonNote>
            </IonItem>
            <IonItem>
              <IonInput
                className={`${!errors["website"] && "ion-valid"} ${
                  errors["website"] && "ion-invalid"
                } ${touched["website"] && "ion-touched"}`}
                label="Website"
                labelPlacement="stacked"
                placeholder="Website"
                value={values.website}
                errorText={errors["website"] || ""}
                onIonInput={(event) => setFieldValue("website", event.target.value)}
              />
            </IonItem>

            <IonItem>
              <IonLabel className="!text-[14px]">HQ</IonLabel>
              <IonToggle
                slot="start"
                checked={values.HQ}
                disabled={isProcessing}
                onClick={(event) =>
                  setFieldValue("HQ", (event.target as HTMLIonToggleElement).checked)
                }
              ></IonToggle>
            </IonItem>
            <IonItem>
              <IonLabel className="!text-[14px]">Virtual</IonLabel>
              <IonToggle
                slot="start"
                checked={values.virtual}
                disabled={isProcessing}
                onClick={(event) => {
                  const isChecked = (event.target as HTMLIonToggleElement).checked;
                  if (isChecked) {
                    setFieldValue("homeVisit", false);
                  }
                  setFieldValue("virtual", (event.target as HTMLIonToggleElement).checked);
                }}
              ></IonToggle>
            </IonItem>
            <IonItem>
              <IonLabel className="!text-[14px]">Home Visit</IonLabel>
              <IonToggle
                slot="start"
                checked={values.homeVisit}
                disabled={isProcessing}
                onClick={(event) => {
                  const isChecked = (event.target as HTMLIonToggleElement).checked;
                  if (isChecked) {
                    setFieldValue("virtual", false);
                  }
                  setFieldValue("homeVisit", isChecked);
                }}
              ></IonToggle>
            </IonItem>
            {values.homeVisit && (
              <IonItem>
                <IonInput
                  className={`${!errors["radius"] && "ion-valid"} ${
                    errors["radius"] && "ion-invalid"
                  } ${touched["radius"] && "ion-touched"}`}
                  label="Radius Served"
                  labelPlacement="stacked"
                  placeholder="Radius Served"
                  type="number"
                  inputmode="decimal"
                  value={values.radius}
                  errorText={errors["radius"] || ""}
                  onIonInput={(event) => setFieldValue("radius", event.target.value)}
                />
              </IonItem>
            )}

            <IonItem>
              <IonSelect
                className={`${!errors["subcategory"] && "ion-valid"} ${
                  errors["subcategory"] && "ion-invalid"
                } ${touched["subcategory"] && "ion-touched"}`}
                label="Category"
                labelPlacement="stacked"
                multiple
                placeholder="Select care..."
                onIonChange={(e) => {
                  const subCats = e.detail.value as string[];
                  const catIds = careSubCategoriesInOrg
                    .filter((cat) => cat.subCategory.find((subCat) => subCats.includes(subCat._id)))
                    .map((cat) => cat.category._id);
                  setFieldValue("category", catIds);
                  setFieldValue("subcategory", subCats);
                }}
                value={values.subcategory}
                interfaceOptions={{
                  cssClass: "custom-select-alert",
                }}
              >
                {careSubCategoriesInOrg.map((careCat) => (
                  <div key={careCat.category._id}>
                    <IonSelectOption
                      disabled
                      key={careCat.category._id}
                      value={careCat.category._id}
                    >
                      {careCat.category.name}
                    </IonSelectOption>
                    {careCat.subCategory.map((subCat) => (
                      <IonSelectOption key={subCat._id} value={subCat._id}>
                        {subCat.name}
                      </IonSelectOption>
                    ))}
                  </div>
                ))}
              </IonSelect>
              {/* {values.subcategory.length > 0 && (
                <ItemLabelCounter
                  text={`Selected ${values.subcategory.length} of ${reduce(
                    careSubCategoriesInOrg,
                    (sum, n) => sum + n.subCategory.length,
                    0
                  )}`}
                />
              )} */}
              {errors["subcategory"] && touched["subcategory"] && (
                <IonNote slot="error" className="block">
                  {errors["subcategory"]}
                </IonNote>
              )}
            </IonItem>
            <IonButton
              className="send-btn mt-4"
              type="submit"
              color="success"
              expand="block"
              disabled={isProcessing}
            >
              Add
            </IonButton>
          </IonList>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default ModalCreateSiteInfo;
