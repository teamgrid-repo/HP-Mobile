import { IonContent, IonItem, IonList, IonPopover } from "@ionic/react";
import { PROVIDER_QUIZRESULT_LIST, QuizResultMenuActionType } from "src/shared";

interface Props {
  popover: React.RefObject<HTMLIonPopoverElement>;
  popoverOpen: boolean;
  onClickItem: (action: QuizResultMenuActionType) => void;
  onHidePopover: () => void;
}

const PopoverQuizResult = ({ popover, popoverOpen, onClickItem, onHidePopover }: Props) => {
  return (
    <IonPopover ref={popover} isOpen={popoverOpen} onDidDismiss={onHidePopover}>
      <IonContent forceOverscroll={false}>
        <IonList lines="none" className="popover-list">
          {PROVIDER_QUIZRESULT_LIST.map((action) => (
            <IonItem
              className="capitalize"
              key={action}
              button={true}
              detail={false}
              onClick={() => {
                onClickItem(action);
                popover.current?.dismiss();
              }}
            >
              {action}
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPopover>
  );
};

export default PopoverQuizResult;
