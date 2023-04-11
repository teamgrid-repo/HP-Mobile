import { IonToast } from "@ionic/react";

interface Props {
  text: string;
}

const ItemLabelCounter = ({ text }: Props) => {
  return (
    <div className="w-full flex justify-end">
      <span className="text-xs text-gray-500">{text}</span>
    </div>
  );
};

export default ItemLabelCounter;
