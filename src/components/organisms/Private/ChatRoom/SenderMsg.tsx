import { memo } from "react";
import { DEFAULT_TIME_FORMAT, IMessage, getDateFormat } from "src/shared";
import { ProfileImage } from "src/components/atoms";
import MsgImage from "./MsgImage";
import "./style.scss";

interface Props {
  message: IMessage;
}

const SenderMsg = ({ message }: Props) => {
  return (
    <div id="sender-msg-container" className="space-x-2">
      <div
        className={`msg-content ${message.imageFlag ? "msg-image-content" : "msg-text-content"}`}
      >
        {message.imageFlag ? (
          <MsgImage url={message.text} />
        ) : (
          <span className="msg-text">{message.text}</span>
        )}
        <span className="msg-time">{getDateFormat(message.time, DEFAULT_TIME_FORMAT)}</span>
      </div>
      <ProfileImage image={message.senderId.image || ""} size={30} />
    </div>
  );
};

export default memo(SenderMsg);
