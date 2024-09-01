import { useTranslation } from "react-i18next";
import adImage from "../../assets/images/villa-1.png";
import { Link } from "react-router-dom";
import ConfirmationModal from "../modals/ConfirmationModal";
import { useState } from "react";

function ADMiniCard() {
  const { t } = useTranslation();
  const [showConfirmation, setShowConfirmation] = useState(false);

  function handleOpenConfirmation(e) {
    e.preventDefault();
    e.stopPropagation();
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
      to={`/ad-details/1`}
      className="ad-mini-card activity-card"
      onClick={handleLinkClick}
    >
      <div className="card-header">
        <div className="image-wrapper">
          <img src={adImage} alt="AD image" />
        </div>
        <div className="card-content">
          <span className="price gradient-text">
            200.000 {t("currency.sar")}
          </span>
          <h5 className="title one-line-wrap">
            فيلا في الرياض 150 م بحديقه و بول
          </h5>
          <div className="categories-wrapper">
            <Link to="" className="category gradient-text">
              <i className="fa-regular fa-apartment"></i>
              {t("categories.estates")}
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

export default ADMiniCard;
