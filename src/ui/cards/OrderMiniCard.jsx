import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ConfirmationModal from "../modals/ConfirmationModal";

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
          <img src="/images/car-2.png" alt="order image" />
        </div>
        <div className="card-content">
          <span className="price ">200.000 {t("currency.sar")}</span>
          <h5 className="title ">مطلوب سياره AGM مستعمله</h5>
          <div className="categories-wrapper">
            <Link to="" className="category ">
              <i className="fa-solid fa-cars"></i> {t("categories.cars")}
            </Link>
          </div>
          <span className="date">{t("createdAt")} 2024/8/2</span>
        </div>
        <div className="action-boxes">
          <span className="action-btn delete" onClick={handleOpenConfirmation}>
            <i className="fa-regular fa-trash "></i>
          </span>
          <span className="action-btn edit">
            <i className="fa-regular fa-pen-to-square "></i>
          </span>
        </div>
      </div>
      <div className="card-statistics">
        <div className="statistic">
          <i className="fa-regular fa-eye "></i>
          <span className="value">5</span>
        </div>
        <div className="statistic">
          <i className="fa-regular fa-phone "></i>
          <span className="value">5</span>
        </div>
        <div className="statistic">
          <i className="fa-regular fa-comment-lines "></i>
          <span className="value">5</span>
        </div>
        <div className="statistic">
          <i className="fa-regular fa-heart "></i>
          <span className="value">5</span>
        </div>
      </div>
      <ConfirmationModal
        showModal={showConfirmation}
        setShowModal={setShowConfirmation}
        type="delete"
        eventFun={handleDelete}
        buttonText={t("delete")}
        text={t("orders.areYouSureYouWantToDeleteOrder")}
      />
    </Link>
  );
}

export default OrderMiniCard;
