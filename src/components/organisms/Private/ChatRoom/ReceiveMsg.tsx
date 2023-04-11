import { memo } from "react";
import { ProfileImage } from "src/components/atoms";
import { DEFAULT_TIME_FORMAT, IMessage, getDateFormat } from "src/shared";
import "./style.scss";
import { IonImg } from "@ionic/react";
import MsgImage from "./MsgImage";

interface Props {
  message: IMessage;
}

const ReceiveMsg = ({ message }: Props) => {
  return (
    <div id="receive-msg-container" className="space-x-2">
      <ProfileImage image={message.senderId.image || ""} size={30} />
      <div
        className={`msg-content ${message.imageFlag ? "msg-image-content" : "msg-text-content"}`}
      >
        <span className="msg-username">{message.senderId.name || ""}</span>
        {message.imageFlag ? (
          <MsgImage url={message.text} />
        ) : (
          <span className="msg-text">{message.text}</span>
        )}
        <span className="msg-time">{getDateFormat(message.time, DEFAULT_TIME_FORMAT)}</span>
      </div>
    </div>
  );
};

export default memo(ReceiveMsg);
