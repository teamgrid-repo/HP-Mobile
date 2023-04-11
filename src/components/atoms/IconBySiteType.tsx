import { IonIcon } from "@ionic/react";
import { IonicReactProps } from "@ionic/react/dist/types/components/IonicReactProps";
import { TruckIcon, DesktopIcon, BuildingIcon } from "src/shared";

interface Props extends IonicReactProps {
  homeVisit: boolean;
  virtual: boolean;
}

const IconBySiteType = ({ homeVisit, virtual, ...rest }: Props) => {
  return (
    <>
      {homeVisit ? (
        <IonIcon icon={TruckIcon} {...rest}></IonIcon>
      ) : virtual ? (
        <IonIcon icon={DesktopIcon} {...rest}></IonIcon>
      ) : (
        <IonIcon icon={BuildingIcon} {...rest}></IonIcon>
      )}
    </>
  );
};

export default IconBySiteType;
