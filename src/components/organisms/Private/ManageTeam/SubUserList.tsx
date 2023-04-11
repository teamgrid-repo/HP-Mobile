import { useSelector } from "react-redux";
import { Virtuoso } from "react-virtuoso";
import { SuspenseLoader } from "src/components/atoms";
import { additionalMembersSelector, GET_ADDITAIONAL_MEMBERS_REQUEST } from "src/store/auth";
import { loadingSelector } from "src/store/global";
import SubUserItem from "./SubUserItem";
import "./style.scss";

interface Props {
  presentingElement: HTMLElement | null;
}

const SubUserList = ({ presentingElement }: Props) => {
  const loading = useSelector(loadingSelector(GET_ADDITAIONAL_MEMBERS_REQUEST));
  const additionalMembers = useSelector(additionalMembersSelector);

  return (
    <div className="additional-member-list">
      {loading && additionalMembers.length === 0 ? (
        <SuspenseLoader />
      ) : additionalMembers.length === 0 ? (
        <p>No User Data Found!</p>
      ) : (
        <Virtuoso
          className="ion-content-scroll-host"
          style={{ height: "100%" }}
          data={additionalMembers}
          itemContent={(index, item) => {
            return <SubUserItem item={item} presentingElement={presentingElement} />;
          }}
        />
      )}
    </div>
  );
};

export default SubUserList;
