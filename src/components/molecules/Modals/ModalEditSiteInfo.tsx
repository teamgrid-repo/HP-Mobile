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
import { EditItem, ItemLabelCounter, SeparatorItem, ViewItem } from "src/components/atoms";
import {
  ISiteUpdateRequest,
  MenuSiteItemActionType,
  USA_STATES,
  SaveSiteLocationSchema,
  ISiteWithSubCategory,
} from "src/shared";
import { AuthService } from "src/shared/services";
import {
  cureCategoriesInOrgStateSelector,
  getAdditionalMembersRequest,
  getSitesRequest,
  organizationStateSelector,
  userStateSelector,
} from "src/store/auth";
import { useAppDispatch } from "src/store/config-store";
import { getDetails } from "use-places-autocomplete";
import { CardSiteDetail } from "..";
import ModalSearchAddress from "./ModalSearchAddress";

interface Props {
  siteInfo: ISiteWithSubCategory;
  actionType: MenuSiteItemActionType | "";
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
  onEdit: () => void;
}

const ModalEditSiteInfo = (props: Props) => {
  const { siteInfo, actionType, onDismiss, onEdit } = props;
  const dispatch = useAppDispatch();
  const [presentToast] = useIonToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const organization = useSelector(organizationStateSelector);
  const currentUser = useSelector(userStateSelector);
  const careSubCategoriesInOrg = useSelector(cureCategoriesInOrgStateSelector);
  const [presentSearchAddressM, dismissSearchAddressM] = useIonModal(ModalSearchAddress, {
    onDismiss: (data: string, role: string) => dismissSearchAddressM(data, role),
    onClickedAddress: (item: google.maps.places.AutocompletePrediction) => handleAddressItem(item),
  });
  let initializeData: ISiteUpdateRequest = {
    name: siteInfo.name,
    address: siteInfo.address,
    location: siteInfo.location,
    website: siteInfo.website,
    zipcode: siteInfo.zipcode,
    state: siteInfo.state,
    category: siteInfo.category,
    subcategory: siteInfo.subcategory as string[],
    city: siteInfo.city,
    virtual: siteInfo.virtual,
    HQ: siteInfo.HQ,
    radius: siteInfo.radius || 0,
    additional: siteInfo.additional,
    homeVisit: siteInfo.homeVisit,
  };
  const formik = useFormik({
    initialValues: initializeData,
    enableReinitialize: true,
    validationSchema: SaveSiteLocationSchema,
    onSubmit: (values) => updateSiteLocation(values),
  });

  const { errors, touched, handleSubmit, values, setFieldValue } = formik;

  const updateSiteLocation = (values: ISiteUpdateRequest) => {
    if (!currentUser || !currentUser._id) return;
    setIsProcessing(true);
    AuthService.updateSiteLocation(siteInfo._id, values)
      .then((res: any) => {
        if (res.success) {
          if (res.message) presentToast({ message: res.message, color: "success" });
          dispatch(getAdditionalMembersRequest(currentUser._id));
          if (currentUser && currentUser._id && organization?._id) {
            dispatch(getSitesRequest({ uid: currentUser._id, orgId: organization._id }));
          }
          onDismiss();
        } else {
          if (res.message) presentToast({ message: res.message, color: "danger" });
        }
      })
      .catch((error) => {
        console.error("Error updateSiteLocation:", error);
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
          {actionType === "View" && !siteInfo.approvalPending && (
            <IonButtons slot="start">
              <IonButton disabled={isProcessing} onClick={() => onEdit()}>
                Edit
              </IonButton>
            </IonButtons>
          )}
          <IonTitle>Site Location</IonTitle>
          <IonButtons slot="end">
            <IonButton disabled={isProcessing} onClick={() => onDismiss()}>
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent forceOverscroll={false}>
        {actionType === "View" ? (
          <IonList lines="none" className="px-[40px] py-[20px]">
            <ViewItem label="Name" text={siteInfo.name} />
            <ViewItem label="Address" text={siteInfo.address} />
            <ViewItem label="City" text={siteInfo.city} />
            <ViewItem label="Zipcode" text={siteInfo.zipcode} />
            <ViewItem
              label="State"
              text={USA_STATES.filter((uState) => siteInfo.state.includes(uState.abbreviation))
                .map((uState) => uState.name)
                .toString()}
            />
            <ViewItem label="Website" text={siteInfo.website} canlink />
            <ViewItem label="HQ" text={siteInfo.HQ ? "Yes" : "No"} />
            <ViewItem label="Virtual" text={siteInfo.virtual ? "Yes" : "No"} />
            <ViewItem label="Home Visit" text={siteInfo.homeVisit ? "Yes" : "No"} />
            <ViewItem
              label="Radius Served"
              text={siteInfo.radius ? siteInfo.radius.toString() : "Not Applicable"}
            />
            <SeparatorItem />
            <IonLabel>
              <h3>Category</h3>
            </IonLabel>
            {siteInfo.status && siteInfo.subcategory.length > 0 ? (
              siteInfo.subcategory.map((s: any) => <CardSiteDetail key={s._id} siteDetail={s} />)
            ) : siteInfo.siteSubCategoryInfo.length > 0 ? (
              siteInfo.siteSubCategoryInfo.map((s) => <CardSiteDetail key={s._id} siteDetail={s} />)
            ) : (
              <ViewItem label="Category" text="" />
            )}
          </IonList>
        ) : (
          <form onSubmit={handleSubmit}>
            <IonList lines="none" className="px-[40px] py-[20px]">
              <IonItem>
                <IonInput
                  className={`${!errors.name && "ion-valid"} ${errors.name && "ion-invalid"} ${
                    touched.name && "ion-touched"
                  }`}
                  label="Name"
                  labelPlacement="stacked"
                  placeholder="Name"
                  value={values.name}
                  errorText={errors.name}
                  onIonInput={(event) => setFieldValue("name", event.target.value)}
                />
              </IonItem>
              <IonItem>
                <IonInput
                  className={`${!errors.address && "ion-valid"} ${
                    errors.address && "ion-invalid"
                  } ${touched.address && "ion-touched"}`}
                  label="Address"
                  labelPlacement="stacked"
                  placeholder="Address"
                  value={values.address}
                  errorText={errors.address}
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
                  className={`${!errors.city && "ion-valid"} ${errors.city && "ion-invalid"} ${
                    touched.city && "ion-touched"
                  }`}
                  label="City"
                  labelPlacement="stacked"
                  placeholder="City"
                  value={values.city}
                  errorText={errors.city}
                  onIonInput={(event) => setFieldValue("city", event.target.value)}
                />
              </IonItem>
              <IonItem>
                <IonInput
                  className={`${!errors.zipcode && "ion-valid"} ${
                    errors.zipcode && "ion-invalid"
                  } ${touched.zipcode && "ion-touched"}`}
                  label="Zipcode"
                  labelPlacement="stacked"
                  placeholder="Zipcode"
                  value={values.zipcode}
                  errorText={errors.zipcode}
                  onIonInput={(event) => setFieldValue("zipcode", event.target.value)}
                />
              </IonItem>
              <IonItem
                className={`${!errors["state"] && "ion-valid"} ${
                  errors["state"] && "ion-invalid"
                } ${touched["state"] && "ion-touched"}`}
              >
                <IonSelect
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
                {errors["state"] && touched["state"] && (
                  <IonNote slot="error" className="block">
                    {errors["state"]}
                  </IonNote>
                )}
              </IonItem>
              <IonItem>
                <IonInput
                  className={`${!errors.website && "ion-valid"} ${
                    errors.website && "ion-invalid"
                  } ${touched.website && "ion-touched"}`}
                  label="Website"
                  labelPlacement="stacked"
                  placeholder="Website"
                  value={values.website}
                  errorText={errors.website}
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
                  onClick={(event) =>
                    setFieldValue("virtual", (event.target as HTMLIonToggleElement).checked)
                  }
                ></IonToggle>
              </IonItem>
              <IonItem>
                <IonLabel className="!text-[14px]">Home Visit</IonLabel>
                <IonToggle
                  slot="start"
                  checked={values.homeVisit}
                  disabled={isProcessing}
                  onClick={(event) =>
                    setFieldValue("homeVisit", (event.target as HTMLIonToggleElement).checked)
                  }
                ></IonToggle>
              </IonItem>
              {values.homeVisit && (
                <IonItem>
                  <IonInput
                    className={`${!errors.radius && "ion-valid"} ${
                      errors.radius && "ion-invalid"
                    } ${touched.radius && "ion-touched"}`}
                    label="Radius Served"
                    labelPlacement="stacked"
                    placeholder="Radius Served"
                    type="number"
                    inputmode="decimal"
                    value={values.radius}
                    errorText={errors.radius}
                    onIonInput={(event) => setFieldValue("radius", event.target.value)}
                  />
                </IonItem>
              )}
              <IonItem
                className={`${!errors["subcategory"] && "ion-valid"} ${
                  errors["subcategory"] && "ion-invalid"
                } ${touched["subcategory"] && "ion-touched"}`}
              >
                <IonSelect
                  label="Category"
                  labelPlacement="stacked"
                  multiple
                  placeholder="Select care..."
                  onIonChange={(e) => {
                    const subCats = e.detail.value as string[];
                    const catIds = careSubCategoriesInOrg
                      .filter((cat) =>
                        cat.subCategory.find((subCat) => subCats.includes(subCat._id))
                      )
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
                Update
              </IonButton>
            </IonList>
          </form>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ModalEditSiteInfo;
