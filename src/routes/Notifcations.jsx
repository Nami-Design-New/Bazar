import { calculateDate } from "../utils/helpers";
import useGetNotifications from "../hooks/useGetNotifications";
import DataLoader from "../ui/DataLoader";
import SectionHeader from "../ui/layout/SectionHeader";

const Notifcations = () => {
  const { isLoading, data: notifications } = useGetNotifications();

  return isLoading ? (
    <DataLoader minHeight="200px" />
  ) : (
    <>
      <SectionHeader />
      <div className="notifications_section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12 d-flex flex-column gap-2">
              {notifications?.data?.map((notification) => (
                <div className="notify" key={notification?.id}>
                  <div className="notify_info">
                    <div className="content">
                      <h6>{notification?.title}</h6>
                      <p>{notification?.description}</p>
                    </div>
                  </div>
                  <div className="date_time">
                    <span>
                      {calculateDate(notification?.created_at)}{" "}
                      <i className="fa-thin fa-calendar-days"></i>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifcations;
