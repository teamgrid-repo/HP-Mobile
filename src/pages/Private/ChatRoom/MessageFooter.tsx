import {
  IonFooter,
  IonToolbar,
  IonButton,
  IonIcon,
  IonTextarea,
  useIonActionSheet,
  useIonLoading,
  useIonToast,
} from "@ionic/react";
import { addOutline, cameraOutline, documentOutline, imageOutline, send } from "ionicons/icons";
import { useState } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { useSelector } from "react-redux";
import { socket } from "src/utils/socket";
import { userStateSelector } from "src/store/auth";
import { IChatRoom, SOCKET_EMIT_SEND_MESSAGE } from "src/shared";
import { MessageService } from "src/shared/services/message";

interface Props {
  room: IChatRoom | undefined;
}

const MessageFooter = (props: Props) => {
  const { room } = props;
  const currentUser = useSelector(userStateSelector);
  const [presentActionSheet] = useIonActionSheet();
  const [presentToast] = useIonToast();
  const [presentLoading, dismissLoading] = useIonLoading();
  const [msgText, setMsgText] = useState("");

  const handleActionSheet = () => {
    presentActionSheet({
      buttons: [
        { text: "Camera", icon: cameraOutline, data: { action: "camera" } },
        { text: "Photo & Video Libary", icon: imageOutline, data: { action: "photo" } },
        // { text: "Document", icon: documentOutline, data: { action: "document" } },
        { text: "Cancel", role: "cancel" },
      ],
      onWillDismiss: async ({ detail }) => {
        if (detail.data.action === "camera") {
          const image = await Camera.getPhoto({
            quality: 100,
            allowEditing: true,
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Camera,
          });
          if (image.dataUrl) {
            sendImage(image.dataUrl);
          }
        } else if (detail.data.action === "photo") {
          const image = await Camera.getPhoto({
            quality: 100,
            allowEditing: false,
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Photos,
          });
          if (image.dataUrl) {
            sendImage(image.dataUrl);
          }
        } else if (detail.data.action === "document") {
        }
      },
    });
  };

  const sendImage = async (image: string) => {
    if (image && currentUser?._id) {
      const response = await fetch(image);
      const blob = await response.blob();
      const data = {
        senderId: currentUser._id,
        image: blob,
        room: room?.room,
        time: new Date().toString(),
        imageFlag: true,
      };
      presentLoading({ message: "Uploading..." });
      MessageService.sendFileApi(data)
        .then((res: any) => {
          if (!res.success && res.message) {
            presentToast({ message: res.message, color: "danger" });
            return;
          }
          if (res.success && res.message) {
            socket.emit(SOCKET_EMIT_SEND_MESSAGE, { ...res.data, alreadySaved: true });
          }
        })
        .catch((error) => {})
        .finally(() => {
          dismissLoading();
        });
    }
  };

  const sendMessage = () => {
    if (msgText && currentUser?._id) {
      const data = {
        senderId: currentUser._id,
        text: msgText,
        room: room?.room,
        time: new Date().toString(),
        imageFlag: false,
      };
      setMsgText("");
      socket.emit(SOCKET_EMIT_SEND_MESSAGE, data);
    }
  };

  return (
    <IonFooter>
      <IonToolbar className="p-2">
        <div className="msg-send-container space-x-2">
          <IonButton
            className="add-btn"
            fill="clear"
            color="success"
            onClick={() => handleActionSheet()}
          >
            <IonIcon slot="icon-only" icon={addOutline} />
          </IonButton>
          <IonTextarea
            label=""
            placeholder="Message"
            autoGrow={true}
            rows={1}
            value={msgText}
            onIonInput={(e) => {
              setMsgText(e.target.value || "");
            }}
          ></IonTextarea>
          {msgText && (
            <IonButton
              className="send-btn"
              fill="solid"
              color="success"
              onClick={() => sendMessage()}
            >
              <IonIcon slot="icon-only" icon={send} size="small" />
            </IonButton>
          )}
        </div>
      </IonToolbar>
    </IonFooter>
  );
};

export default MessageFooter;
