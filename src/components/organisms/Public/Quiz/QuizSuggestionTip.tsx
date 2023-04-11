import { Browser } from "@capacitor/browser";
import { useIonRouter } from "@ionic/react";
import { useSelector } from "react-redux";
import { ICareCategory, ICareSubCategory } from "src/shared";
import { getCategoryName } from "src/shared/helpers/category";
import { userStateSelector } from "src/store/auth";
import {
  cureSubCategoriesStateSelector,
  combinedCatAndSubcatStateSelector,
} from "src/store/category";
import { useAppDispatch } from "src/store/config-store";
import { initialFilterRequest, setFilterRequestState } from "src/store/provider";

interface Props {
  descriptions: string[];
  links: { categoryId: string; isAllCategory: boolean }[];
  weblinks?: { link: string; linkText: string }[];
  isGroupTip?: boolean;
}

interface ItemProps {
  desc: string;
  combinedCatAndSubcats: (ICareCategory | ICareSubCategory)[];
  goToProviderSearch: (categoryId: string[], isAllCategory: boolean) => void;
  openWeblink: (link: string) => void;
  links: { categoryId: string; isAllCategory: boolean }[];
  weblinks?: { link: string; linkText: string }[];
}

const QuizSuggestionTipItem = (props: ItemProps) => {
  const { desc, links, weblinks, combinedCatAndSubcats, goToProviderSearch, openWeblink } = props;
  if (desc.includes("link-")) {
    const linkIndex = parseInt(desc.split("link-")[1], 10);
    if (links && links.length && links[linkIndex]) {
      const linkInfo = links[linkIndex];
      return (
        <span
          className="text-[#2eadf3] capitalize"
          onClick={() => goToProviderSearch([linkInfo.categoryId], linkInfo.isAllCategory)}
        >
          {" "}
          {getCategoryName(combinedCatAndSubcats, linkInfo.categoryId)}{" "}
        </span>
      );
    } else return <></>;
  } else if (desc.includes("webopen-")) {
    const linkIndex = parseInt(desc.split("webopen-")[1], 10);
    if (weblinks && weblinks.length && weblinks[linkIndex]) {
      const linkInfo = weblinks[linkIndex];
      return (
        <>
          {" "}
          <span
            className="text-[#2eadf3] capitalize underline"
            onClick={() => openWeblink(linkInfo.link)}
          >
            {linkInfo.linkText}
          </span>{" "}
        </>
      );
    } else return <></>;
  } else if (desc === "<br>") {
    return <br />;
  }
  return <>{desc}</>;
};

const QuizSuggestionTip = (props: Props) => {
  const { descriptions, links, weblinks = [], isGroupTip = false } = props;
  const dispatch = useAppDispatch();
  const navigation = useIonRouter();
  const cureSubCategories = useSelector(cureSubCategoriesStateSelector);
  const combinedCatAndSubcats = useSelector(combinedCatAndSubcatStateSelector);
  const currentUser = useSelector(userStateSelector);

  const goToProviderSearch = (categoryId: string[], isAllCategory: boolean) => {
    let ds = initialFilterRequest;
    if (isAllCategory) {
      const cat = cureSubCategories.find((c) => c.category._id === categoryId[0]);
      if (cat) cat.subCategory.forEach((subCat) => ds.category.push(subCat._id));
    } else {
      ds = { ...ds, category: categoryId };
    }
    dispatch(setFilterRequestState(ds));
    if (currentUser) {
      navigation.push("/tabs/tab-provider");
    } else {
      navigation.push("/provider-search");
    }
  };

  const openWeblink = (weblink: string) => {
    if (weblink) Browser.open({ url: weblink });
  };

  return (
    <div className={isGroupTip ? "mb-2" : "quiz-suggestion-tip"}>
      {descriptions.map((desc) => (
        <QuizSuggestionTipItem
          key={desc}
          desc={desc}
          links={links}
          weblinks={weblinks}
          combinedCatAndSubcats={combinedCatAndSubcats}
          openWeblink={openWeblink}
          goToProviderSearch={goToProviderSearch}
        />
      ))}
    </div>
  );
};

export default QuizSuggestionTip;
