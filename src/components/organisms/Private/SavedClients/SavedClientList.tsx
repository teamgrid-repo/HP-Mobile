import { Virtuoso } from "react-virtuoso";
import { SuspenseLoader } from "src/components/atoms";
import { ISavedClient } from "src/shared";
import SavedClientItem from "./SavedClientItem";
import "./style.scss";

interface Props {
  savedClients: ISavedClient[];
  loading: boolean;
  presentingElement: HTMLElement | null;
}
const SavedClientList = ({ savedClients, loading, presentingElement }: Props) => {
  return (
    <div className="saved-clients-list">
      {loading ? (
        <SuspenseLoader />
      ) : savedClients.length === 0 ? (
        <p className="text-center">No saved clients found!</p>
      ) : (
        <Virtuoso
          className="ion-content-scroll-host"
          style={{ height: "100%" }}
          data={savedClients}
          itemContent={(index, item) => {
            return <SavedClientItem item={item} />;
          }}
        />
      )}
    </div>
  );
};

export default SavedClientList;
