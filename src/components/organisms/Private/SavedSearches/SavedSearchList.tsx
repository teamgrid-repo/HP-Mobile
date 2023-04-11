import { useSelector } from "react-redux";
import { Virtuoso } from "react-virtuoso";
import { SuspenseLoader } from "src/components/atoms";
import { loadingSelector } from "src/store/global";
import { GET_SAVED_SEARCHES_REQUEST, savedSearchesBySortSelector } from "src/store/provider";
import SavedSearchItem from "./SavedSearchItem";

interface Props {
  presentingElement: HTMLElement | null;
}
const SavedSearchList = ({ presentingElement }: Props) => {
  const savedSearches = useSelector(savedSearchesBySortSelector);
  const loading = useSelector(loadingSelector(GET_SAVED_SEARCHES_REQUEST));

  return (
    <div className="saved-searches-list">
      {loading ? (
        <SuspenseLoader />
      ) : savedSearches.length === 0 ? (
        <p className="text-center">No saved searches data found!</p>
      ) : (
        <Virtuoso
          className="ion-content-scroll-host"
          style={{ height: "100%" }}
          data={savedSearches}
          itemContent={(index, item) => {
            return <SavedSearchItem item={item} presentingElement={presentingElement} />;
          }}
        />
      )}
    </div>
  );
};

export default SavedSearchList;
