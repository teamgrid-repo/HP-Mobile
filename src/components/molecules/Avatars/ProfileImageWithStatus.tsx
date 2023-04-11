import { IonIcon } from "@ionic/react";
import { ellipse } from "ionicons/icons";
import { ProfileImage } from "src/components/atoms";

interface Props {
  image: string;
  size: number;
  isOnline: boolean;
}

const ProfileImageWithStatus = ({ image, size, isOnline, ...props }: Props) => {
  return (
    <div className="relative">
      <ProfileImage image={image} size={size} slot="start" />
      {isOnline && (
        <IonIcon className="absolute -bottom-0 -left-0 text-[12px]" color="success" icon={ellipse} />
      )}
    </div>
  );
};

export default ProfileImageWithStatus;
