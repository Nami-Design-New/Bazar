import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { calculateDate } from "../../utils/helpers";
import {
  ORDER_STATUS_AR,
  ORDER_STATUS_EN,
  ORDER_STATUS_PERSENTAGE,
} from "../../utils/constants";
import { useSelector } from "react-redux";

function OrderCard({ order }) {
  const { t } = useTranslation();
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

  console.log(progressWidth());

  return (
    <Link to={`/order-details/${order?.id}`} className={`order-card`}>
      <div className="card-header">
        <div className="card-content">
          <div className="heading">
            <h3 className="gradient-text">{`#${order?.id}`}</h3>{" "}
            <span className={`progress-status ${order?.status}`}>
              {lang === "ar"
                ? ORDER_STATUS_AR[order?.status]
                : ORDER_STATUS_EN[order?.status]}
            </span>
          </div>
          <h5 className="title one-line-wrap">{order?.title}</h5>
          <p className="sub-title one-line-wrap">{order?.notes}</p>
          {!order && (
            <div className="categories-wrapper">
              <Link to="" className="category gradient-text">
                <i className="fa-regular fa-apartment"></i>
                {t("categories.estates")}
              </Link>
            </div>
          )}
          <div className="d-flex align-items-center gap-2 justify-content-between mt-auto">
            <Link
              to={`/market-details/${order?.market?.id}`}
              className="date d-flex align-items-center gap-2"
            >
              {/* <i className="fa-solid fa-shop gradient-icon"></i> */}
              <img className="logo" src={order?.market?.logo} alt="" />
              {order?.market?.name}
            </Link>
            {order?.created_at ? (
              <span className="date d-flex align-items-center gap-2">
                <i className="fa-regular fa-clock gradient-icon"></i>
                {calculateDate(order?.created_at)}
              </span>
            ) : null}
          </div>
        </div>
      </div>
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
    </Link>
  );
}

export default OrderCard;
