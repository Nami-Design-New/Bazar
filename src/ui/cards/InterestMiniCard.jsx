import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ConfirmationModal from "../modals/ConfirmationModal";
import { useState } from "react";

function InterestMiniCard() {
  const { t } = useTranslation();
  const [showConfirmation, setShowConfirmation] = useState(false);

  function handleOpenConfirmation(e) {
    e.stopPropagation();
    setShowConfirmation(true);
  }
  function handleDelete() {
    setShowConfirmation(false);
  }
  return (
    <div
      className="interest-mini-card ad-mini-card activity-card"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="card-header">
        <div className="card-content">
          <h5 className="title one-line-wrap">اهتمام بالعقارات</h5>
          <div className="categories-wrapper">
            <Link to="" className="category gradient-text">
              <i className="fa-regular fa-apartment"></i>
              {t("categories.estates")}
            </Link>
            <Link to="" className="category gradient-text">
              <i className="fa-sharp fa-regular fa-building-columns"></i>
              {t("categories.villas")}
            </Link>
            <Link to="" className="category gradient-text">
              <i className="fa-sharp fa-solid fa-location-dot"></i> الرياض
            </Link>
            <Link to="" className="category gradient-text">
              <i className="fa-regular fa-home"></i> الشارقة
            </Link>
          </div>
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
      <ConfirmationModal
        showModal={showConfirmation}
        setShowModal={setShowConfirmation}
        type="delete"
        eventFun={handleDelete}
        buttonText={t("delete")}
        text={t("activities.areYouSureYouWantToDeleteInterest")}
      />
    </div>
  );
}

export default InterestMiniCard;
