import { CreateAnimation, IonButton } from "@ionic/react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconBySiteType, PulseAnimation } from "src/components/atoms";
import { FilterType } from "src/shared";
import {
  countFilterSearchResStateSelector,
  filterStateSelector,
  setFilterState,
} from "src/store/provider";

const FilterOptions = () => {
  const dispatch = useDispatch();
  const { filterTypes } = useSelector(filterStateSelector);
  const { homeVisit, virtual, inOffice } = useSelector(countFilterSearchResStateSelector);
  const unmatchAnimationRef = useRef<CreateAnimation>(null);

  const changeFilterType = (type: FilterType) => {
    if (filterTypes.includes(type)) {
      dispatch(setFilterState({ filterTypes: filterTypes.filter((ft) => ft !== type) }));
    } else {
      dispatch(setFilterState({ filterTypes: [...filterTypes, type] }));
    }
    if (unmatchAnimationRef.current) {
      unmatchAnimationRef.current.animation.play();
    }
  };

  return (
    <div className="flex flex-row justify-between">
      <div className="flex space-x-4">
        <PulseAnimation>
          <IonButton
            size="small"
            fill="clear"
            color={!filterTypes.includes("ino") ? "light" : "medium"}
            className="nopadding-btn noborder-radius-btn"
            onClick={() => changeFilterType("ino")}
          >
            <IconBySiteType homeVisit={false} virtual={false} />
            {inOffice}
          </IonButton>
        </PulseAnimation>
        <IonButton
          size="small"
          fill="clear"
          color={!filterTypes.includes("virtual") ? "light" : "medium"}
          className="nopadding-btn noborder-radius-btn"
          onClick={() => changeFilterType("virtual")}
        >
          <IconBySiteType homeVisit={false} virtual />
          {virtual}
        </IonButton>
        <IonButton
          size="small"
          fill="clear"
          color={!filterTypes.includes("homeVisit") ? "light" : "medium"}
          className="nopadding-btn noborder-radius-btn"
          onClick={() => changeFilterType("homeVisit")}
        >
          <IconBySiteType homeVisit virtual={false} />
          {homeVisit}
        </IonButton>
      </div>
      <div>
        <span className="text-[#7e7e7e]">
          Total: <b>{homeVisit + virtual + inOffice}</b>
        </span>
      </div>
    </div>
  );
};

export default FilterOptions;
