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
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { Formik } from "formik";
import { reduce } from "lodash";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { ItemLabelCounter } from "src/components/atoms";
import {
  ISiteWithSubCategory,
  ISiteSubCategoryInfoRequest,
  ICareSubCategory,
  ICareCategory,
  PRICE_TYPE_LIST,
} from "src/shared";
import { AuthService } from "src/shared/services";
import {
  additionalMembersWithAuthSelector,
  cureCategoriesInOrgStateSelector,
  getSitesRequest,
  organizationStateSelector,
  userStateSelector,
} from "src/store/auth";
import { useAppDispatch } from "src/store/config-store";

interface Props {
  siteInfo: ISiteWithSubCategory;
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
}

const ModalSiteLocationFilter = (props: Props) => {
  const { siteInfo, onDismiss } = props;
  const dispatch = useAppDispatch();
  const [presentToast] = useIonToast();
  const careSubCategoriesInOrg = useSelector(cureCategoriesInOrgStateSelector);
  const additionalMembers = useSelector(additionalMembersWithAuthSelector);
  const organization = useSelector(organizationStateSelector);
  const currentUser = useSelector(userStateSelector);
  const [isProcessing, setIsProcessing] = useState(false);

  const filteredSubCategories = useMemo(() => {
    return reduce(
      careSubCategoriesInOrg,
      (
        result: {
          category: ICareCategory;
          subCategory: ICareSubCategory[];
        }[],
        value
      ) => {
        if (
          value.subCategory.filter((subCat) => siteInfo.subcategory.includes(subCat._id)).length
        ) {
          result.push({
            category: value.category,
            subCategory: value.subCategory.filter((subCat) =>
              siteInfo.subcategory.includes(subCat._id)
            ),
          });
        }
        return result;
      },
      []
    );
  }, [careSubCategoriesInOrg, siteInfo.subcategory]);

  const initializeData: ISiteSubCategoryInfoRequest = {
    serviceName: "",
    serviceDescription: "",
    serviceWebpage: "",
    leaf: false,
    isHippa: false,
    specialQualiFlag: false,
    specialQualif: [],
    price: [],
    user1: "",
    user2: "",
    specialQues: "",
    subCategoryId: "",
    poc: [],
    siteId: siteInfo._id,
    approvalPending: false,
  };
  const updateSiteLocation = (values: ISiteSubCategoryInfoRequest) => {
    if (!values.subCategoryId) return;
    setIsProcessing(true);
    const tempPoc: string[] = [];
    if (values.user1) {
      tempPoc.push(values.user1);
    }
    if (values.user2 && values.user1 !== values.user2) {
      tempPoc.push(values.user2);
    }
    const data = {
      serviceName: values.serviceName,
      serviceDescription: values.serviceDescription,
      serviceWebpage: values.serviceWebpage,
      specialQualiFlag: values.specialQualiFlag,
      specialQualif: values.specialQualif,
      price: values.price,
      leaf: values.leaf,
      isHippa: values.isHippa,
      poc: tempPoc,
      subCategoryId: values.subCategoryId,
      siteId: siteInfo._id,
      specialQues: values.specialQues || "",
    };
    AuthService.addAllocatedSubCategory({ appData: data })
      .then((res: any) => {
        if (res.message) presentToast({ message: res.message, color: "success" });
        if (res.success) {
          if (currentUser && currentUser._id && organization?._id) {
            dispatch(getSitesRequest({ uid: currentUser._id, orgId: organization._id }));
          }
          onDismiss();
        }
      })
      .catch((error) => {
        console.error("Error addAllocatedSubCategory:", error);
        if (error && error.response && error.response.data && error.response.data.message) {
          presentToast({ message: error.response.data.message, color: "danger" });
        }
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Site Location Filter</IonTitle>
          <IonButtons slot="end">
            <IonButton disabled={isProcessing} onClick={() => onDismiss()}>
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent forceOverscroll={false}>
        <Formik
          initialValues={initializeData}
          enableReinitialize
          onSubmit={(values) => updateSiteLocation(values)}
        >
          {({ errors, touched, handleSubmit, values, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <IonList lines="none" className="px-[40px] py-[20px]">
                <IonItem>
                  <IonSelect
                    className={`${!errors["subCategoryId"] && "ion-valid"} ${
                      errors["subCategoryId"] && "ion-invalid"
                    } ${touched["subCategoryId"] && "ion-touched"}`}
                    label="Subcategory"
                    labelPlacement="stacked"
                    placeholder="Select care..."
                    onIonChange={(e) => {
                      const selectedSubCatId = e.detail.value;
                      setFieldValue("subCategoryId", selectedSubCatId);
                      const selectedSiteSubCategoryInfo = siteInfo.siteSubCategoryInfo.find(
                        (cInfo) => cInfo.subCategoryId === selectedSubCatId
                      );
                      if (selectedSiteSubCategoryInfo) {
                        setFieldValue(
                          "approvalPending",
                          selectedSiteSubCategoryInfo.approvalPending
                        );
                        setFieldValue("serviceName", selectedSiteSubCategoryInfo.serviceName);
                        setFieldValue(
                          "serviceDescription",
                          selectedSiteSubCategoryInfo.serviceDescription
                        );
                        setFieldValue("serviceWebpage", selectedSiteSubCategoryInfo.serviceWebpage);
                        setFieldValue("price", selectedSiteSubCategoryInfo.price);
                        if (selectedSiteSubCategoryInfo.poc.length) {
                          setFieldValue("user1", selectedSiteSubCategoryInfo.poc[0]);
                        }
                        if (selectedSiteSubCategoryInfo.poc.length === 2) {
                          setFieldValue("user2", selectedSiteSubCategoryInfo.poc[1]);
                        }
                      }
                    }}
                    value={values.subCategoryId}
                    interfaceOptions={{
                      cssClass: "custom-select-alert",
                    }}
                  >
                    {filteredSubCategories.map((careCat) => (
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
                  {errors["subCategoryId"] && touched["subCategoryId"] && (
                    <IonNote slot="error" className="block">
                      {errors["subCategoryId"]}
                    </IonNote>
                  )}
                </IonItem>

                {values.subCategoryId && (
                  <>
                    <IonItem>
                      <IonInput
                        className={`${!errors.serviceName && "ion-valid"} ${
                          errors.serviceName && "ion-invalid"
                        } ${touched.serviceName && "ion-touched"}`}
                        label="Service Name"
                        labelPlacement="stacked"
                        placeholder="Service Name"
                        value={values.serviceName}
                        errorText={errors.serviceName}
                        onIonInput={(event) => setFieldValue("serviceName", event.target.value)}
                      />
                    </IonItem>
                    <IonItem>
                      <IonInput
                        className={`${!errors.serviceDescription && "ion-valid"} ${
                          errors.serviceDescription && "ion-invalid"
                        } ${touched.serviceDescription && "ion-touched"}`}
                        label="Service Description"
                        labelPlacement="stacked"
                        placeholder="Service Description"
                        value={values.serviceDescription}
                        errorText={errors.serviceDescription}
                        onIonInput={(event) =>
                          setFieldValue("serviceDescription", event.target.value)
                        }
                      />
                    </IonItem>
                    <IonItem>
                      <IonInput
                        className={`${!errors.serviceWebpage && "ion-valid"} ${
                          errors.serviceWebpage && "ion-invalid"
                        } ${touched.serviceWebpage && "ion-touched"}`}
                        label="Service Webpage"
                        labelPlacement="stacked"
                        placeholder="Service Webpage"
                        value={values.serviceWebpage}
                        errorText={errors.serviceWebpage}
                        onIonInput={(event) => setFieldValue("serviceWebpage", event.target.value)}
                      />
                    </IonItem>
                    <IonItem>
                      <IonSelect
                        className={`${!errors["price"] && "ion-valid"} ${
                          errors["price"] && "ion-invalid"
                        } ${touched["price"] && "ion-touched"}`}
                        label="Price Type"
                        labelPlacement="stacked"
                        multiple
                        placeholder="Select Price..."
                        onIonChange={(e) => setFieldValue("price", e.detail.value)}
                        value={values.price}
                      >
                        {PRICE_TYPE_LIST.map((priceType) => (
                          <IonSelectOption key={priceType} value={priceType}>
                            {priceType}
                          </IonSelectOption>
                        ))}
                      </IonSelect>
                      {/* {values.price.length > 0 && (
                        <ItemLabelCounter
                          text={`Selected ${values.price.length} of ${PRICE_TYPE_LIST.length}`}
                        />
                      )} */}
                      {errors["price"] && touched["price"] && (
                        <IonNote slot="error" className="block">
                          {errors["price"]}
                        </IonNote>
                      )}
                    </IonItem>

                    <IonItem>
                      <IonSelect
                        className={`${!errors["user1"] && "ion-valid"} ${
                          errors["user1"] && "ion-invalid"
                        } ${touched["user1"] && "ion-touched"}`}
                        label="Point of Contact1"
                        labelPlacement="stacked"
                        onIonChange={(e) => setFieldValue("user1", e.detail.value)}
                        value={values.user1}
                        placeholder="Select Contact1..."
                      >
                        {additionalMembers.map((item) => (
                          <IonSelectOption key={item._id} value={item.userId}>
                            {item.name}
                          </IonSelectOption>
                        ))}
                      </IonSelect>
                      {errors["user1"] && touched["user1"] && (
                        <IonNote slot="error" className="block">
                          {errors["user1"]}
                        </IonNote>
                      )}
                    </IonItem>

                    <IonItem>
                      <IonSelect
                        className={`${!errors["user2"] && "ion-valid"} ${
                          errors["user2"] && "ion-invalid"
                        } ${touched["user2"] && "ion-touched"}`}
                        label="Point of Contact2"
                        labelPlacement="stacked"
                        onIonChange={(e) => setFieldValue("user2", e.detail.value)}
                        value={values.user2}
                        placeholder="Select Contact2..."
                      >
                        {additionalMembers.map((item) => (
                          <IonSelectOption key={item._id} value={item.userId}>
                            {item.name}
                          </IonSelectOption>
                        ))}
                      </IonSelect>
                      {errors["user2"] && touched["user2"] && (
                        <IonNote slot="error" className="block">
                          {errors["user2"]}
                        </IonNote>
                      )}
                    </IonItem>

                    {values.approvalPending ? (
                      <div className="my-6 w-full text-center">
                        <IonLabel color="danger">Under Approval</IonLabel>
                      </div>
                    ) : (
                      <IonButton
                        className="send-btn mt-4"
                        type="submit"
                        color="success"
                        expand="block"
                        disabled={isProcessing}
                      >
                        Update
                      </IonButton>
                    )}
                  </>
                )}
              </IonList>
            </form>
          )}
        </Formik>
      </IonContent>
    </IonPage>
  );
};

export default ModalSiteLocationFilter;
