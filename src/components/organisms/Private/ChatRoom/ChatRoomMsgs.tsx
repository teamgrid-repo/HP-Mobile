import { useDispatch, useSelector } from "react-redux";
import { userStateSelector } from "src/store/auth";
import {
  hasNewMessageStateSelector,
  messagesStateSelector,
  setHasNewMessageState,
} from "src/store/messages";
import ReceiveMsg from "./ReceiveMsg";
import SenderMsg from "./SenderMsg";
import { Virtuoso } from "react-virtuoso";
import { useEffect, useRef } from "react";

const ChatRoomMsgs = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(userStateSelector);
  const hasNewMessage = useSelector(hasNewMessageStateSelector);
  const messages = useSelector(messagesStateSelector);
  const virtuosoRef = useRef<any>(null);

  useEffect(() => {
    if (virtuosoRef.current && hasNewMessage) {
      virtuosoRef.current.scrollToIndex({
        index: messages.length - 1,
        align: "start",
        behavior: "smooth",
      });
      dispatch(setHasNewMessageState(false));
    }
  }, [hasNewMessage]);

  return (
    <>
      {messages.length === 0 ? (
        <p className="ion-text-center">No Message</p>
      ) : (
        <>
          <Virtuoso
            className="ion-content-scroll-host"
            style={{ height: "100%" }}
            ref={virtuosoRef}
            data={messages}
            totalCount={messages.length}
            initialTopMostItemIndex={messages.length - 1}
            alignToBottom
            itemContent={(index, item) => {
              return (
                <div className="pb-4 pt-1 px-4" key={item._id}>
                  {item.senderId && item.senderId._id === currentUser?._id ? (
                    <SenderMsg message={item} />
                  ) : (
                    <ReceiveMsg message={item} />
                  )}
                </div>
              );
            }}
          />
        </>
      )}
    </>
  );
};

export default ChatRoomMsgs;
