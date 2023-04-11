import { reduce } from "lodash";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Virtuoso } from "react-virtuoso";
import { userStateSelector } from "src/store/auth";
import SiteViewItem from "./SiteViewItem";

export interface ISiteInfoForView {
  id: string;
  siteName: string;
  catName: string;
  subCats: string;
}

const SiteViewList = () => {
  const currentUser = useSelector(userStateSelector);

  const sites = useMemo(() => {
    const siteInfos: ISiteInfoForView[] = [];
    if (currentUser && currentUser.profileId.siteInfo) {
      currentUser.profileId.siteInfo.forEach((item) => {
        if (item.cat && item.cat.length) {
          item.cat.forEach((category) => {
            siteInfos.push({
              id: item._id,
              siteName: item.name,
              catName: category.name,
              subCats: reduce(
                category.subCategory,
                (result, subCat) => (result = result + subCat.name || "" + ", "),
                ""
              ),
            });
          });
        }
      });
    }
    return siteInfos;
  }, [currentUser]);

  return (
    <div className="site-list">
      {sites.length === 0 ? (
        <p>No Site Data Found!</p>
      ) : (
        <Virtuoso
          className="ion-content-scroll-host"
          style={{ height: "100%" }}
          data={sites}
          itemContent={(index, item) => {
            return <SiteViewItem item={item} />;
          }}
        />
      )}
    </div>
  );
};

export default SiteViewList;
