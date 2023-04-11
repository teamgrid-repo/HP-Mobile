import { IonImg, createAnimation, useIonModal } from "@ionic/react";
import ModalPreviewImage from "src/components/molecules/Modals/ModalPreviewImage";

interface Props {
  url: string;
}

const MsgImage = ({ url }: Props) => {
  const [presentMPreviewImage, dismissMPreviewImage] = useIonModal(ModalPreviewImage, {
    onDismiss: (data: string, role: string) => dismissMPreviewImage(data, role),
    url,
  });

  const enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = createAnimation()
      .addElement(root?.querySelector("ion-backdrop")!)
      .fromTo("opacity", "0.01", "var(--backdrop-opacity)");

    const wrapperAnimation = createAnimation()
      .addElement(root?.querySelector(".modal-wrapper")!)
      .keyframes([
        { offset: 0, opacity: "0", transform: "scale(0)" },
        { offset: 1, opacity: "0.99", transform: "scale(1)" },
      ]);

    return createAnimation()
      .addElement(baseEl)
      .easing("ease-out")
      .duration(200)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  const leaveAnimation = (baseEl: HTMLElement) => {
    return enterAnimation(baseEl).direction("reverse");
  };

  const viewFullImage = () => {
    presentMPreviewImage({
      enterAnimation: enterAnimation,
      leaveAnimation: leaveAnimation,
    });
  };

  return <IonImg className="msg-image" src={url} onClick={viewFullImage} />;
};

export default MsgImage;
