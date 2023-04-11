import { ReactNode } from "react";
import { Leaf } from "src/shared";
import "./style.scss";

interface Props {
  title: string;
  description?: string;
  children?: ReactNode;
}
const ProfilePageHeader = ({ title, description = "", children }: Props) => {
  return (
    <div className="profile-page-header">
      <div className="profile-page-header-text">
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      <img className="leaf-img" src={Leaf} />
    </div>
  );
};

export default ProfilePageHeader;
