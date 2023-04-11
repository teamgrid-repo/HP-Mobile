import { IonItem, IonLabel, IonNote } from "@ionic/react";
import { FormikErrors, FormikTouched } from "formik";
import { ReactNode } from "react";

interface Props {
  field: string;
  label: string;
  children: ReactNode;
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
  iserror?: boolean;
}
const EditItem = ({ field, label, children, errors, touched, iserror = false }: Props) => {
  return (
    <IonItem
      className={`${!errors[field] && "ion-valid"} ${errors[field] && "ion-invalid"} ${
        touched[field] && "ion-touched"
      }`}
    >
      <IonLabel position="stacked">{label}</IonLabel>
      {children}
      {iserror && errors[field] && touched[field] && (
        <IonNote slot="error" className="block">
          {errors[field]}
        </IonNote>
      )}
    </IonItem>
  );
};

export default EditItem;
