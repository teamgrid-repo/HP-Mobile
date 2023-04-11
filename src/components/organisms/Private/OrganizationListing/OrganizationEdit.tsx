import {
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonNote,
  IonButton,
  useIonToast,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonText,
} from "@ionic/react";
import { Formik } from "formik";
import { reduce } from "lodash";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ErrorNote, ItemLabelCounter, PhoneInput } from "src/components/atoms";
import { IOrganizationRequest, SaveOrganizationSchema, USA_STATES } from "src/shared";
import { AuthService } from "src/shared/services";
import {
  getOrganizationRequest,
  organizationStateSelector,
  userStateSelector,
} from "src/store/auth";
import { cureSubCategoriesStateSelector } from "src/store/category";
import { useAppDispatch } from "src/store/config-store";
import "./style.scss";

const OrganizationEdit = () => {
  const dispatch = useAppDispatch();
  const [presentToast] = useIonToast();
  const currentUser = useSelector(userStateSelector);
  const careSubCategories = useSelector(cureSubCategoriesStateSelector);
  const organization = useSelector(organizationStateSelector);
  const [isProcessing, setIsProcessing] = useState(false);
  const initializeData: IOrganizationRequest = {
    providerId: currentUser?._id || "",
    publicName: organization?.publicName || "",
    address: organization?.address || "",
    zipcode: organization?.zipcode || "",
    state: organization?.state || "",
    email: organization?.email || "",
    city: organization?.city || "",
    contact: organization?.contact || "",
    about: organization?.about || "",
    category: organization?.category || [],
    subcategory: organization?.subcategory || [],
    altWebsite: organization?.altWebsite || "",
  };

  const updateProfile = (values: IOrganizationRequest) => {
    if (!values.providerId) return;

    setIsProcessing(true);
    AuthService.createOrganization(values)
      .then((res: any) => {
        if (res.success) {
          if (currentUser && currentUser._id && currentUser.role === "provider")
            dispatch(getOrganizationRequest(currentUser._id));
        }
        if (res.message) presentToast({ message: res.message, color: "success" });
      })
      .catch((error) => {
        console.error("Error createOrganization:", error);
        if (error && error.response && error.response.data && error.response.data.message) {
          presentToast({ message: error.response.data.message, color: "danger" });
        }
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <div className="organization-listing">
      {organization?.approvalPending && (
        <IonText color="danger" className="text-[12px]">
          Your account is under approval please contact to admin for more details
        </IonText>
      )}
      <Formik
        initialValues={initializeData}
        enableReinitialize
        validationSchema={SaveOrganizationSchema}
        onSubmit={(values) => updateProfile(values)}
      >
        {({ errors, touched, handleSubmit, values, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <IonList lines="none">
              <IonItem>
                <IonInput
                  className={`${!errors.publicName && "ion-valid"} ${
                    errors.publicName && "ion-invalid"
                  } ${touched.publicName && "ion-touched"}`}
                  label="Organization Name"
                  labelPlacement="stacked"
                  placeholder="Organization Name"
                  value={values.publicName}
                  errorText={errors.publicName}
                  onIonInput={(event) => setFieldValue("publicName", event.target.value)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Phone Number</IonLabel>
                <PhoneInput
                  value={values.contact || ""}
                  onChange={(value) => {
                    setFieldValue("contact", value);
                  }}
                />
                {errors.contact && <ErrorNote text={errors.contact} />}
              </IonItem>
              <IonItem>
                <IonTextarea
                  label="Address"
                  labelPlacement="stacked"
                  placeholder="Address"
                  autoGrow
                  value={values.address}
                  onIonInput={(event) => setFieldValue("address", event.target.value)}
                />
              </IonItem>
              <IonItem>
                <IonInput
                  label="City"
                  labelPlacement="stacked"
                  placeholder="City"
                  value={values.city}
                  onIonInput={(event) => setFieldValue("city", event.target.value)}
                />
              </IonItem>
              <IonItem>
                <IonInput
                  label="Zipcode"
                  labelPlacement="stacked"
                  placeholder="Zipcode"
                  value={values.zipcode}
                  onIonInput={(event) => setFieldValue("zipcode", event.target.value)}
                />
              </IonItem>
              <IonItem>
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
              </IonItem>
              <IonItem>
                <IonInput
                  className={`${!errors.altWebsite && "ion-valid"} ${
                    errors.altWebsite && "ion-invalid"
                  } ${touched.altWebsite && "ion-touched"}`}
                  label="URL"
                  labelPlacement="stacked"
                  placeholder="URL"
                  value={values.altWebsite}
                  errorText={errors.altWebsite}
                  onIonInput={(event) => setFieldValue("altWebsite", event.target.value)}
                />
              </IonItem>
              <IonItem>
                <IonInput
                  className={`${!errors.email && "ion-valid"} ${errors.email && "ion-invalid"} ${
                    touched.email && "ion-touched"
                  }`}
                  label="Organization Email"
                  labelPlacement="stacked"
                  placeholder="Organization Email"
                  value={values.email}
                  errorText={errors.email}
                  onIonInput={(event) => setFieldValue("email", event.target.value)}
                />
                {errors.email && touched.email && (
                  <IonNote slot="error" className="block">
                    {errors.email}
                  </IonNote>
                )}
              </IonItem>
              <IonItem>
                <IonSelect
                  label="Services(Category & Subcategories)"
                  labelPlacement="stacked"
                  multiple
                  placeholder="Select care..."
                  onIonChange={(e) => {
                    const subCats = e.detail.value as string[];
                    const catIds = careSubCategories
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
                  {careSubCategories.map((careCat) => (
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
                      careSubCategories,
                      (sum, n) => sum + n.subCategory.length,
                      0
                    )}`}
                  />
                )} */}
              </IonItem>
              <IonItem>
                <IonTextarea
                  className={`${!errors.about && "ion-valid"} ${errors.about && "ion-invalid"} ${
                    touched.about && "ion-touched"
                  }`}
                  label="About"
                  labelPlacement="stacked"
                  placeholder="About"
                  value={values.about}
                  rows={4}
                  errorText={errors.about}
                  onIonInput={(event) => setFieldValue("about", event.target.value)}
                />
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
        )}
      </Formik>
    </div>
  );
};

export default OrganizationEdit;
