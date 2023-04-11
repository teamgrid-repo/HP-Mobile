import {
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
} from "@ionic/react";
import { trash } from "ionicons/icons";
import { memo, useRef } from "react";
import { ProfileImageWithStatus } from "src/components/molecules";
import { DEFAULT_TIME_FORMAT, DEFAULT_PROFILE_IMAGE, getDateFormat, IChatRoom } from "src/shared";
import "./style.scss";

interface Props {
  room: IChatRoom;
  isOnline: boolean;
  onDeleteChat: (room: IChatRoom) => void;
}

const RoomItem = ({ room, isOnline, onDeleteChat }: Props) => {
  const { name, id, lastMsg, lastTime, status } = room;
  const slidingRef = useRef<HTMLIonItemSlidingElement>(null);

  const avatarImg = name && name.length && name[0].image ? name[0].image : DEFAULT_PROFILE_IMAGE;
  const roomName = name.map((item) => item.name).toString();

  return (
    <IonItemSliding ref={slidingRef}>
      <IonItem className="room-item" lines="full" detail={false} routerLink={`/room/${room.room}`}>
        <div className="my-auto mr-4">
          <ProfileImageWithStatus image={avatarImg} size={40} isOnline={isOnline} />
        </div>
        <IonLabel>
          <h2 className="room-name">{roomName}</h2>
          <p className="room-last-msg">{lastMsg || "-"}</p>
        </IonLabel>
        <IonLabel className="room-suffix-wrapper">
          <p className="room-date">{getDateFormat(lastTime, DEFAULT_TIME_FORMAT)}</p>
          <p className="room-date">{getDateFormat(lastTime)}</p>
          {/* <div className="room-count">
            <span>3</span>
          </div> */}
        </IonLabel>
      </IonItem>
      <IonItemOptions side="end">
        <IonItemOption
          color="danger"
          onClick={() => {
            slidingRef.current?.closeOpened();
            onDeleteChat(room);
          }}
        >
          <IonIcon slot="icon-only" icon={trash}></IonIcon>
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default memo(RoomItem);
