import { memo } from "react";
import { useSelector } from "react-redux";
import { Virtuoso } from "react-virtuoso";
import {
  filteredProvidersStateSelector,
  filterSearchResStateSelector,
  GET_FILTER_SEARCH_REQUEST,
} from "src/store/provider";
import { loadingSelector } from "src/store/global";
import { SuspenseLoader } from "src/components/atoms";
import ProviderItem from "./ProviderItem";

interface Props {
  presentingElement: HTMLElement | null;
}

const ProviderList = ({ presentingElement }: Props) => {
  const loading = useSelector(loadingSelector(GET_FILTER_SEARCH_REQUEST));
  const filterSearchRes = useSelector(filterSearchResStateSelector);
  const filteredProviders = useSelector(filteredProvidersStateSelector);

  return (
    <>
      {loading ? (
        <SuspenseLoader text="Searching..." />
      ) : filterSearchRes.provider.length === 0 ? (
        <div className="flex flex-col text-center pt-4 pb-16">
          <p className="text-[14px]">Not sure what you're looking for?</p>
        </div>
      ) : filteredProviders.length === 0 ? (
        <div className="flex flex-col text-center pt-4 pb-16">
          <h2 className="text-[18px] font-bold">No Result Found</h2>
          <p className="text-[14px]">we can't find any item matching you search</p>
        </div>
      ) : (
        <>
          <Virtuoso
            className="ion-content-scroll-host"
            style={{ height: "400px" }}
            data={filteredProviders || []}
            itemContent={(index, item) => {
              return (
                <ProviderItem key={item._id} item={item} presentingElement={presentingElement} />
              );
            }}
          />
        </>
      )}
    </>
  );
};

export default memo(ProviderList);
