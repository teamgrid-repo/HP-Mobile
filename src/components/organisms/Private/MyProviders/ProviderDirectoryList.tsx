import { orderBy } from "lodash";
import { useSelector } from "react-redux";
import { Virtuoso } from "react-virtuoso";
import { SuspenseLoader } from "src/components/atoms";
import { IDirecotryItem } from "src/shared";
import { loadingSelector } from "src/store/global";
import {
  GET_SAVED_SEARCHES_REQUEST,
  savedListingSortBySelector,
  selectedSavedListingSelector,
} from "src/store/provider";
import ProviderDirectoryItem from "./ProviderDirectoryItem";

interface Props {
  presentingElement: HTMLElement | null;
}
const ProviderDirectoryList = ({ presentingElement }: Props) => {
  const sortType = useSelector(savedListingSortBySelector);
  const selectedSavedListing = useSelector(selectedSavedListingSelector);
  const loading = useSelector(loadingSelector(GET_SAVED_SEARCHES_REQUEST));
  const directoryItems = selectedSavedListing?.directoryItems || [];

  const orderByDirectoryItems: IDirecotryItem[] =
    sortType === "Default"
      ? directoryItems
      : sortType === "Ascending"
      ? orderBy(directoryItems, (item) => item.siteDetails.name, ["asc"])
      : sortType === "Descending"
      ? orderBy(directoryItems, (item) => item.siteDetails.name, ["desc"])
      : [];

  if (!selectedSavedListing) return <></>;

  return (
    <div className="provider-directory-list">
      {loading ? (
        <SuspenseLoader />
      ) : !selectedSavedListing ? (
        <p className="text-center">Choose a list!</p>
      ) : orderByDirectoryItems.length === 0 ? (
        <p className="text-center">No data found!</p>
      ) : (
        <Virtuoso
          className="ion-content-scroll-host"
          style={{ height: "100%" }}
          data={orderByDirectoryItems}
          itemContent={(index, item) => {
            return <ProviderDirectoryItem item={item} />;
          }}
        />
      )}
    </div>
  );
};

export default ProviderDirectoryList;
