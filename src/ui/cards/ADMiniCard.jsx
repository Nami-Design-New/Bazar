import { useTranslation } from "react-i18next";
import adImage from "../../assets/images/villa-1.png";
import { Link } from "react-router-dom";
import ConfirmationModal from "../modals/ConfirmationModal";
import { useState } from "react";

function ADMiniCard({ ad }) {
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
      to={`/ad-details/${ad?.id || "1"}`}
      className="ad-mini-card activity-card"
      onClick={handleLinkClick}
    >
      <div className="card-header">
        <div className="image-wrapper">
          <img src={ad?.image?.image || adImage} alt="AD image" />
        </div>
        <div className="card-content">
          <span className="price ">
            {ad?.price || "200.00"} {t("currency.sar")}
          </span>
          <h5 className="title ">
            {ad?.title || "فيلا في الرياض "}
          </h5>
          <p className="sub-title ">
            {ad?.description || "فيلا 150 م بحديقه و بول"}
          </p>
          <div className="categories-wrapper">
            <Link to="" className="category ">
              <i className="fa-regular fa-apartment"></i>
              {t("categories.estates")}
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
        text={t("ads.areYouSureYouWantToDeleteAD")}
      />
    </Link>
  );
}

export default ADMiniCard;
