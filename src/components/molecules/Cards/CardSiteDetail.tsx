import { IonCard, IonCardContent, IonCardHeader, IonItemGroup } from "@ionic/react";
import { reduce } from "lodash";
import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { ViewItem } from "src/components/atoms";
import { ICareSubCategory, ISiteSubCategoryInfo } from "src/shared";
import {
  additionalMembersWithAuthSelector,
  cureCategoriesInOrgStateSelector,
} from "src/store/auth";
import "./style.scss";

interface Props {
  siteDetail: ISiteSubCategoryInfo;
}

const CardSiteDetail = ({ siteDetail }: Props) => {
  const careSubCategoriesInOrg = useSelector(cureCategoriesInOrgStateSelector);
  const additionalMembers = useSelector(additionalMembersWithAuthSelector);

  const subCategory = useMemo(() => {
    return reduce(
      careSubCategoriesInOrg,
      (result: ICareSubCategory[], value) => {
        const temp = value.subCategory.filter((subC) => subC._id === siteDetail.subCategoryId);
        if (temp.length) result.push(temp[0]);
        return result;
      },
      []
    );
  }, [careSubCategoriesInOrg, siteDetail]);

  const poc = useMemo(() => {
    if (siteDetail.poc && siteDetail.poc.length) {
      return additionalMembers
        .filter((member) => siteDetail.poc.includes(member.userId as string))
        .map((member) => member.name);
    }
    return [];
  }, [additionalMembers, siteDetail.poc]);

  return (
    <IonCard id="card-site-detail">
      <IonCardHeader>{subCategory.length ? subCategory[0].name : ""}</IonCardHeader>
      <IonCardContent>
        <IonItemGroup>
          <ViewItem label="Service Name" text={siteDetail.serviceName || "-"} />
          <ViewItem label="Service Description" text={siteDetail.serviceDescription || "-"} />
          <ViewItem label="Webpage" text={siteDetail.serviceWebpage || ""} canlink />
          <ViewItem label="Leaf" text={siteDetail.leaf ? "Yes" : "No"} />
          <ViewItem
            label="Price Type"
            text={(siteDetail.price && siteDetail.price.toString()) || "-"}
          />
          <ViewItem
            label="Special Qualifications"
            text={(siteDetail.specialQualif && siteDetail.specialQualif.toString()) || "-"}
          />
          <ViewItem label="POC" text={poc.toString() || "-"} />
        </IonItemGroup>
      </IonCardContent>
    </IonCard>
  );
};

export default memo(CardSiteDetail);
