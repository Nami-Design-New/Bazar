import { Link } from "react-router-dom";
import {
  ORDER_STATUS_AR,
  ORDER_STATUS_EN,
  ORDER_STATUS_PERSENTAGE,
} from "../../utils/constants";
import { useSelector } from "react-redux";

function OrderCard({ order }) {
  const lang = useSelector((state) => state.language.lang);

  const progressWidth = () => {
    let status = "";
    switch (order?.status) {
      case "pending":
        if (order?.delivery_price > 0 || order?.address_id) {
          status = ORDER_STATUS_PERSENTAGE.pending;
        } else {
          status = ORDER_STATUS_PERSENTAGE.pendingWithoutDelivery;
        }
        break;
      case "accepted":
        if (order?.delivery_price > 0 || order?.address_id) {
          status = ORDER_STATUS_PERSENTAGE.accepted;
        } else {
          status = ORDER_STATUS_PERSENTAGE.acceptedWithoutDelivery;
        }
        break;
      case "delivering":
        status = ORDER_STATUS_PERSENTAGE.delivering;
        break;
      case "completed":
        status = ORDER_STATUS_PERSENTAGE.completed;
        break;
      case "canceled":
        status = ORDER_STATUS_PERSENTAGE.canceled;
        break;
      case "user_canceled":
        status = ORDER_STATUS_PERSENTAGE.user_canceled;
        break;
      default:
        status = "";
        break;
    }
    return status;
  };

  return (
    <Link to={`/order-details/${order?.id}`} className={`order-card`}>
      <div className="card-header">
        <div className="card-content">
          <div className="w-100 row gap-lg-0 gap-3 flex-row">
            <div className="col-lg-8 col-12">
              <Link
                to={`/market-details/${order?.market?.id}`}
                className="date d-flex align-items-center gap-2"
              >
                {/* <i className="fa-solid fa-shop gradient-icon"></i> */}
                <div className="d-flex flex-column gap-3">
                  <div className=" d-flex align-items-center gap-2">
                    <img className="logo" src={order?.market?.logo} alt="" />
                    <div className="d-flex flex-column">
                      <h5 className="gradient-text">{`#${order?.id}`}</h5>{" "}
                      {order?.market?.name}
                    </div>
                  </div>
                  <div className=" d-flex align-items-center gap-2">
                    {order?.title ? (
                      <h5 className="title one-line-wrap">{order?.title}</h5>
                    ) : null}
                    {order?.notes ? (
                      <p className="sub-title one-line-wrap">{order?.notes}</p>
                    ) : null}
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-4 col-12 d-flex flex-column gap-3">
              <div className="heading">
                <span className={`progress-status`}>
                  {lang === "ar"
                    ? ORDER_STATUS_AR[order?.status]
                    : ORDER_STATUS_EN[order?.status]}
                </span>
                <div className="progress-wrapper">
                  <div className="progress">
                    <div
                      className={`progress-bar ${order?.status}`}
                      role="progressbar"
                      style={{
                        width: `${progressWidth()}%`,
                      }}
                      aria-valuenow={ORDER_STATUS_PERSENTAGE[order?.status]}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center gap-2 justify-content-between mt-auto">
                {order?.created_at ? (
                  <span className="date d-flex align-items-center gap-2">
                    <i className="fa-regular fa-clock gradient-icon"></i>
                    {`${new Date(order?.created_at).toDateString()}, ${new Date(
                      order?.created_at
                    ).toLocaleTimeString()}`}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default OrderCard;
