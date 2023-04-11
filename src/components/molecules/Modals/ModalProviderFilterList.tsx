import { reduce } from "lodash";
import { getDetails } from "use-places-autocomplete";
import { useEffect, useState } from "react";
import {
  IonContent,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonRange,
  useIonModal,
} from "@ionic/react";
import { close, informationCircleOutline } from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  DISTANCE_MAX,
  DISTANCE_MIN,
  IFilterRequestState,
  LeafIcon,
  PRICE_TYPE_LIST,
  USA_STATES,
  useMyPosition,
} from "src/shared";
import {
  filterRequestStateSelector,
  setFilterRequestState,
  initialFilterRequest,
} from "src/store/provider";
import { ModalLeafInfo, ModalSearchAddress } from "src/components/molecules";
import {
  cureSubCategoriesStateSelector,
  specialQualificationsStateSelector,
} from "src/store/category";
import { ItemLabelCounter } from "src/components/atoms";
import Geocode from "src/utils/geocode";

interface Props {
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
}

const ModalProviderFilterList = ({ onDismiss }: Props) => {
  const dispatch = useDispatch();
  const { currentLocation } = useMyPosition();
  const filterRequestState = useSelector(filterRequestStateSelector);
  const careSubCategories = useSelector(cureSubCategoriesStateSelector);
  const specialQualifications = useSelector(specialQualificationsStateSelector);

  const [presentSearchAddressM, dismissSearchAddressM] = useIonModal(ModalSearchAddress, {
    onDismiss: (data: string, role: string) => dismissSearchAddressM(data, role),
    onClickedAddress: (item: any) => handleAddressItem(item),
  });
  const [presentLeafInfoM, dismissLeafInfoM] = useIonModal(ModalLeafInfo, {
    onDismiss: (data: string, role: string) => dismissLeafInfoM(data, role),
  });

  const [filterRequest, setFilterRequest] = useState<Partial<IFilterRequestState>>({});
  const filteredSpecialQualifications = specialQualifications.filter((item) =>
    filterRequest.category?.includes(item._id)
  );

  useEffect(() => {
    setFilterRequest(filterRequestState);
  }, []);

  const handleAddressItem = (item: any) => {
    getDetails({ placeId: item.place_id }).then((placeDetails: any) => {
      if (placeDetails && placeDetails.formatted_address && placeDetails.geometry.location) {
        changeFilterState({
          customLocData: {
            ...filterRequest.customLocData,
            currLoc: false,
            address: placeDetails.formatted_address,
            location: {
              lat: placeDetails.geometry.location.lat(),
              lang: placeDetails.geometry.location.lng(),
            },
          },
        });
      }
    });
  };

  const handleCurrentLocation = async (e: Event) => {
    const target = e.target as HTMLIonToggleElement;
    if (target.checked && currentLocation) {
      const geocodeRes = await Geocode.fromLatLng(
        `${currentLocation.lat}`,
        `${currentLocation.lng}`
      );
      if (geocodeRes && geocodeRes.results.length && geocodeRes.results[0].formatted_address) {
        changeFilterState({
          address: geocodeRes.results[0].formatted_address,
          customLocData: {
            ...filterRequest.customLocData,
            currLoc: target.checked,
            address: "",
            location: null,
          },
        });
      }
    } else {
      changeFilterState({
        address: "",
        customLocData: {
          ...filterRequest.customLocData,
          currLoc: target.checked,
          address: "",
          location: null,
        },
      });
    }
  };

  const changeFilterState = (data: Partial<IFilterRequestState>) => {
    setFilterRequest((prev) => ({ ...prev, ...data }));
  };

  const applyFilters = () => {
    dispatch(setFilterRequestState(filterRequest));
    onDismiss();
  };

  return (
    <IonContent className="ion-padding">
      <div>
        <h3 className="text-center font-bold">Filter Search</h3>
        <IonButton
          fill="clear"
          color="success"
          className="nopadding-btn absolute right-2 top-3"
          onClick={() => onDismiss()}
        >
          <IonIcon slot="icon-only" icon={close}></IonIcon>
        </IonButton>
      </div>
      <IonList lines="none" className="ion-padding">
        <IonItem>
          <IonButton
            className="mx-auto font-bold"
            size="small"
            fill="clear"
            color="success"
            onClick={() => changeFilterState(initialFilterRequest)}
          >
            Clear all filters
          </IonButton>
        </IonItem>
        <IonItem>
          <div className="leaf-container">
            <div className="custome-toggle-container">
              <IonIcon className="w-[21px] h-[21px]" icon={LeafIcon}></IonIcon>
              <IonToggle
                slot="end"
                checked={filterRequest.leaf}
                onIonChange={(e) => changeFilterState({ leaf: e.target.checked })}
              ></IonToggle>
            </div>
            <IonButton
              fill="clear"
              color="medium"
              className="nopadding-btn"
              onClick={() => presentLeafInfoM({ cssClass: "leaf-info-modal" })}
            >
              <IonIcon slot="icon-only" icon={informationCircleOutline}></IonIcon>
            </IonButton>
          </div>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Search By Location</IonLabel>
          <IonToggle
            slot="end"
            checked={filterRequest.locFilter}
            onIonChange={(e) =>
              changeFilterState({
                locFilter: e.target.checked,
                customLocData: {
                  ...filterRequest.customLocData,
                  currLoc: false,
                  address: "",
                  location: null,
                },
                states: e.target.checked ? [] : filterRequest.states,
                des: e.target.checked ? 1 : 9999999,
              })
            }
          ></IonToggle>
        </IonItem>
        {filterRequest.locFilter ? (
          <>
            <IonItem>
              <IonLabel position="stacked">Current Location</IonLabel>
              <IonToggle
                slot="end"
                checked={filterRequest.customLocData?.currLoc || false}
                onIonChange={handleCurrentLocation}
              ></IonToggle>
            </IonItem>
            {!filterRequest.customLocData?.currLoc && (
              <>
                <IonItem>
                  <IonInput
                    label="Address"
                    labelPlacement="stacked"
                    className="input-default"
                    value={filterRequest.customLocData?.address || ""}
                    readonly
                    onClick={() => {
                      presentSearchAddressM({
                        initialBreakpoint: 0.75,
                        breakpoints: [0, 0.25, 0.5, 0.75],
                      });
                    }}
                  />
                </IonItem>
              </>
            )}
            <IonItem>
              <IonRange
                className="pin-show-always"
                min={DISTANCE_MIN}
                max={DISTANCE_MAX}
                color="success"
                debounce={1000}
                value={filterRequest.des || 0}
                pin
                pinFormatter={(value: number) => `${value} m`}
                onIonChange={({ detail }) =>
                  changeFilterState({ ...filterRequest, des: detail.value as number })
                }
              >
                <IonLabel slot="start">{`${DISTANCE_MIN} m`}</IonLabel>
                <IonLabel slot="end">{`${DISTANCE_MAX} m`}</IonLabel>
              </IonRange>
            </IonItem>
          </>
        ) : (
          <IonItem>
            <IonSelect
              label="Select State"
              labelPlacement="stacked"
              multiple
              onIonChange={(e) => changeFilterState({ states: e.detail.value })}
              value={filterRequest.states}
              placeholder="Select States..."
            >
              {USA_STATES.map((s) => (
                <IonSelectOption key={s.abbreviation} value={s.abbreviation}>
                  {s.name}
                </IonSelectOption>
              ))}
            </IonSelect>
            {/* {filterRequest.states && filterRequest.states.length > 0 && (
              <ItemLabelCounter
                text={`Selected ${filterRequest.states.length} of ${USA_STATES.length}`}
              />
            )} */}
          </IonItem>
        )}

        <IonItem>
          <IonSelect
            label="Search by categories of care"
            labelPlacement="stacked"
            multiple
            placeholder="Select care..."
            onIonChange={(e) => changeFilterState({ category: e.detail.value })}
            value={filterRequest.category}
            interfaceOptions={{
              cssClass: "custom-select-alert",
            }}
          >
            {careSubCategories.map((careCat) => (
              <div key={careCat.category._id}>
                <IonSelectOption disabled key={careCat.category._id} value={careCat.category._id}>
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
          {/* {filterRequest.category && filterRequest.category.length > 0 && (
            <ItemLabelCounter
              text={`Selected ${filterRequest.category.length} of ${reduce(
                careSubCategories,
                (sum, n) => sum + n.subCategory.length,
                0
              )}`}
            />
          )} */}
        </IonItem>
        <IonItem>
          <IonSelect
            label="Filter by price"
            labelPlacement="stacked"
            multiple
            placeholder="Select Price..."
            onIonChange={(e) => changeFilterState({ prices: e.detail.value })}
            value={filterRequest.prices}
          >
            {PRICE_TYPE_LIST.map((priceType) => (
              <IonSelectOption key={priceType} value={priceType}>
                {priceType}
              </IonSelectOption>
            ))}
          </IonSelect>
          {/* {filterRequest.prices && filterRequest.prices.length > 0 && (
            <ItemLabelCounter
              text={`Selected ${filterRequest.prices.length} of ${PRICE_TYPE_LIST.length}`}
            />
          )} */}
        </IonItem>
        <IonItem>
          <IonSelect
            label="Filter by special qualifications"
            labelPlacement="stacked"
            multiple
            placeholder="Select qualifications..."
            onIonChange={(e) =>
              changeFilterState({
                ...filterRequest,
                specialQualifications: e.detail.value,
              })
            }
            value={filterRequest.specialQualifications}
            interfaceOptions={{
              cssClass: "custom-select-alert",
            }}
            disabled={!filteredSpecialQualifications.length}
          >
            {filteredSpecialQualifications.map((specQualCat) => (
              <div key={specQualCat._id}>
                <IonSelectOption disabled key={specQualCat._id} value={specQualCat._id}>
                  {specQualCat.name}
                </IonSelectOption>
                {specQualCat.specialQualification.map((specQual) => (
                  <IonSelectOption key={specQual._id} value={specQual._id}>
                    {specQual.name}
                  </IonSelectOption>
                ))}
              </div>
            ))}
          </IonSelect>
          {/* {filterRequest.specialQualifications &&
            filterRequest.specialQualifications.length > 0 && (
              <ItemLabelCounter
                text={`Selected ${filterRequest.specialQualifications.length} of ${filteredSpecialQualifications.length}`}
              />
            )} */}
        </IonItem>

        <IonButton className="mt-4" color="success" expand="block" onClick={applyFilters}>
          Apply Filters
        </IonButton>
      </IonList>
    </IonContent>
  );
};

export default ModalProviderFilterList;
