import { IonItem, IonLabel, IonToggle } from "@ionic/react";
import { memo, ReactNode } from "react";

interface Props {
  label: string;
  disabled: boolean;
  checked: boolean;
  field: string;
  updateProfileData: (field: string, isChecked: boolean, isAllChecked?: boolean) => void;
  isAllChecked?: boolean;
  children?: ReactNode;
}

const SettingItem = (props: Props) => {
  const {
    label,
    disabled,
    checked,
    field,
    isAllChecked = false,
    children,
    updateProfileData,
  } = props;
  return (
    <IonItem className="custome-toggle-container">
      <IonLabel className="ml-4">{label}</IonLabel>
      {children && children}
      <IonToggle
        slot="end"
        checked={checked}
        disabled={disabled}
        onClick={(event) =>
          updateProfileData(
            field,
            (event.target as HTMLIonToggleElement).checked,
            isAllChecked ? (event.target as HTMLIonToggleElement).checked : false
          )
        }
      ></IonToggle>
    </IonItem>
  );
};

export default memo(SettingItem);
