import { IonNote } from "@ionic/react";

interface Props {
  text: string;
}

const ErrorNote = ({ text }: Props) => {
  return <IonNote className=" text-[12px] text-[#eb445a] pt-[5px]">{text}</IonNote>;
};

export default ErrorNote;
