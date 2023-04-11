import { IonPage, IonContent } from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { Leaf, MENU_LIST } from "src/shared";
import { userStateSelector } from "src/store/auth";
import { memo, useEffect, useRef, useState } from "react";
import { MenuCardItem, TabOverviewAppointments } from "src/components/organisms";
import { ProfileImage } from "src/components/atoms";
import { getAppointmentsRequest } from "src/store/provider";
import "swiper/css";
import "swiper/css/pagination";
import "./style.scss";

const TabDashboard = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(userStateSelector);
  const page = useRef(null);
  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);
  const menuListByRole = currentUser?.role
    ? MENU_LIST.filter((menuItem) => menuItem.roleTypes.includes(currentUser.role))
    : MENU_LIST;

  useEffect(() => {
    setPresentingElement(page.current);
    dispatch(getAppointmentsRequest());
  }, []);

  return (
    <IonPage id="tab-dashboard-page" ref={page}>
      <IonContent>
        <div className="header-group">
          <div className="header-text">
            <h2 className="capitalize">Hello, {currentUser?.name || "User"}</h2>
            <p className="desc">{currentUser?.role}</p>
          </div>
          <img className="leaf-img" src={Leaf} />
          <div className="mt-auto mb-5 z-10">
            <ProfileImage image={currentUser?.profileId.image || ""} canChangeImage />
          </div>
        </div>
        <div className="menu-group">
          <Swiper
            spaceBetween={18}
            pagination={{
              dynamicBullets: true,
            }}
            slidesOffsetBefore={30}
            slidesOffsetAfter={30}
            slidesPerView={3}
            modules={[Pagination]}
          >
            {menuListByRole.map((menuItem) => (
              <SwiperSlide key={menuItem.name}>
                <MenuCardItem menuItem={menuItem} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="appointments-group">
          <TabOverviewAppointments presentingElement={presentingElement} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default memo(TabDashboard);
