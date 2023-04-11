import { IonProgressBar } from "@ionic/react";
import { ReactNode } from "react";
import { Leaf } from "src/shared";
import "./style.scss";

interface Props {
  title: string;
  description?: string;
  headerStyle?: 1 | 2;
  loading?: boolean;
  children?: ReactNode;
}
const PageHeader = (props: Props) => {
  const { title, description = "", headerStyle = 1, loading = false, children } = props;
  return (
    <div className="page-header">
      <div className="page-header-text">
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      <img className={`leaf-img leaf-style-${headerStyle}`} src={Leaf} />
      {children && children}
      {loading && <IonProgressBar type="indeterminate"></IonProgressBar>}
    </div>
  );
};

export default PageHeader;
