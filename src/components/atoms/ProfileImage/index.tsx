import { Camera, CameraResultType } from "@capacitor/camera";
import { IonAvatar, IonSpinner, useIonAlert } from "@ionic/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProfileService } from "src/shared/services";
import { setUserState, userStateSelector } from "src/store/auth";
import "./style.scss";

interface Props {
  image: string;
  size?: number;
  slot?: string;
  canChangeImage?: boolean;
}

const ProfileImage = (props: Props) => {
  const { image, size = 70, slot = "", canChangeImage = false } = props;
  const dispatch = useDispatch();
  const [presentAlert] = useIonAlert();
  const currentUser = useSelector(userStateSelector);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProfileImage = async () => {
    if (!canChangeImage || isProcessing || !currentUser) return;
    Camera.getPhoto({
      quality: 50,
      width: 200,
      height: 200,
      allowEditing: true,
      resultType: CameraResultType.Base64,
    })
      .then((image) => {
        if (image.base64String) {
          setIsProcessing(true);
          const base64Image = `data:image/png;base64,${image.base64String}`;
          ProfileService.uploadImage({ image: base64Image })
            .then((res: any) => {
              if (res.success) {
                dispatch(
                  setUserState({
                    ...currentUser,
                    image: base64Image,
                    profileId: { ...currentUser.profileId, image: base64Image },
                  })
                );
                if (res.message) presentAlert({ message: res.message, buttons: ["ok"] });
              }
            })
            .catch((error) => {
              if (error && error.message) {
                presentAlert({ message: error.message, buttons: ["ok"] });
              }
            })
            .finally(() => {
              setIsProcessing(false);
            });
        }
      })
      .catch((error) => {});
  };

  return (
    <>
      <IonAvatar className={`image-size-${size}`} slot={slot} onClick={handleProfileImage}>
        <img
          src={image ? image : "https://ionicframework.com/docs/img/demos/avatar.svg"}
          className={`${isProcessing ? "opacity-50" : ""}`}
        />
        {canChangeImage && isProcessing && (
          <div className="spinner-wrapper">
            <IonSpinner></IonSpinner>
          </div>
        )}
      </IonAvatar>
    </>
  );
};

export default ProfileImage;
