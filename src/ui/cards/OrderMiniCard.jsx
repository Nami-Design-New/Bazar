import { useTranslation } from "react-i18next";
import orderImage from "../../assets/images/car-2.png";
import { Link } from "react-router-dom";
import ConfirmationModal from "../modals/ConfirmationModal";
import { useState } from "react";

function OrderMiniCard() {
  const { t } = useTranslation();
  const [showConfirmation, setShowConfirmation] = useState(false);

  function handleOpenConfirmation(e) {
    e.stopPropagation();
    e.preventDefault();
    setShowConfirmation(true);
  }
  function handleDelete() {
    setShowConfirmation(false);
  }

  function handleLinkClick(e) {
    e.stopPropagation();
    if (showConfirmation) {
      e.preventDefault();
    }
  }

  return (
    <Link
      to={`/order-details/1`}
      className="ad-mini-card activity-card"
      onClick={handleLinkClick}
    >
      <div className="card-header">
        <div className="image-wrapper">
          <img src={orderImage} alt="order image" />
        </div>
        <div className="card-content">
          <span className="price gradient-text">
            200.000 {t("currency.sar")}
          </span>
          <h5 className="title one-line-wrap">مطلوب سياره AGM مستعمله</h5>
          <div className="categories-wrapper">
            <Link to="" className="category gradient-text">
              <i className="fa-solid fa-cars"></i> {t("categories.cars")}
            </Link>
          </div>
          <span className="date">{t("createdAt")} 2024/8/2</span>
        </div>
        <div className="action-boxes">
          <span className="action-btn delete" onClick={handleOpenConfirmation}>
            <i className="fa-regular fa-trash gradient-icon"></i>
          </span>
          <span className="action-btn edit">
            <i className="fa-regular fa-pen-to-square gradient-icon"></i>
          </span>
        </div>
      </div>
      <div className="card-statistics">
        <div className="statistic">
          <i className="fa-regular fa-eye gradient-icon"></i>
          <span className="value">5</span>
        </div>
        <div className="statistic">
          <i className="fa-regular fa-phone gradient-icon"></i>
          <span className="value">5</span>
        </div>
        <div className="statistic">
          <i className="fa-regular fa-comment-lines gradient-icon"></i>
          <span className="value">5</span>
        </div>
        <div className="statistic">
          <i className="fa-regular fa-heart gradient-icon"></i>
          <span className="value">5</span>
        </div>
      </div>
      <ConfirmationModal
        showModal={showConfirmation}
        setShowModal={setShowConfirmation}
        type="delete"
        eventFun={handleDelete}
        buttonText={t("delete")}
        text={t("activities.areYouSureYouWantToDeleteOrder")}
      />
    </Link>
  );
}

export default OrderMiniCard;
