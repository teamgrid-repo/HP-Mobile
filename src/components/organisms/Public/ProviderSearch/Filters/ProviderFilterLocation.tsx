import { IonLabel, IonButton, IonIcon, useIonPopover, useIonModal } from "@ionic/react";
import { ellipsisHorizontal } from "ionicons/icons";
import { useSelector } from "react-redux";
import { ModalSaveSearchAction, PopoverSearchAction } from "src/components/molecules";
import { ModalLogin } from "src/components/organisms";
import { MenuActionType } from "src/shared";
import { isLoggedInSelector } from "src/store/auth";
import { countFilterSearchResStateSelector, filterRequestStateSelector } from "src/store/provider";

interface Props {
  presentingElement: HTMLElement | null;
}

const ProviderFilterLocation = ({ presentingElement }: Props) => {
  const isLoggedIn = useSelector(isLoggedInSelector);
  const filterRequestState = useSelector(filterRequestStateSelector);
  const { total, searchCount } = useSelector(countFilterSearchResStateSelector);

  const [presentSearchActionP, dismissSearchActionP] = useIonPopover(PopoverSearchAction, {
    onDismiss: (data: any, role: MenuActionType) => dismissSearchActionP(data, role),
  });
  const [presentLoginM, dismissLoginM] = useIonModal(ModalLogin, {
    onDismiss: (data: string, role: string) => dismissLoginM(data, role),
    title: `You Must Be Logged In`,
  });
  const [presentSaveSearchActionM, dismissSaveSearchActionM] = useIonModal(ModalSaveSearchAction, {
    onDismiss: (data: string, role: string) => dismissSaveSearchActionM(data, role),
    count:
      filterRequestState.locFilter || (total && searchCount && searchCount >= total)
        ? searchCount
        : total,
    url: JSON.stringify(filterRequestState),
  });

  const onOpenPopover = (e: any) => {
    presentSearchActionP({
      event: e,
      onDidDismiss: (e: CustomEvent) => {
        // if (!item) return;
        const { role } = e.detail;
        if ((role as MenuActionType) === "save") {
          if (!isLoggedIn && presentingElement) {
            presentLoginM({ presentingElement: presentingElement });
          } else {
            if (presentingElement)
              presentSaveSearchActionM({ presentingElement: presentingElement });
          }
        } else if ((role as MenuActionType) === "share") {
          console.log("Debug popover dismissed.", role);
        } else if ((role as MenuActionType) === "print") {
        }
      },
    });
  };
  return (
    <div className="flex justify-between">
      <IonLabel color="medium" className="text-sm my-auto">
        Pin Location:
        <span className="text-[black] ml-2 font-bold">Current Location</span>
      </IonLabel>
      <IonButton
        fill="clear"
        color="medium"
        className="nopadding-btn"
        onClick={(e) => onOpenPopover(e)}
      >
        <IonIcon icon={ellipsisHorizontal}></IonIcon>
      </IonButton>
    </div>
  );
};

export default ProviderFilterLocation;
