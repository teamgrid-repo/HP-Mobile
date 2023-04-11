import { IonSpinner } from "@ionic/react";

interface Props {
  text?: string;
}

const SuspenseLoader = ({ text = "Please Wait..." }: Props) => {
  return (
    <div className="flex flex-col text-center pt-4 pb-16">
      <IonSpinner className="m-auto"></IonSpinner>
      {text && <p className="text-[14px]">{text}</p>}
    </div>
  );
};

export default SuspenseLoader;
