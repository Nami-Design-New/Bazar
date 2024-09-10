import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import adImage from "../../assets/images/villa-1.png";
import { useState } from "react";
import { calculateDate } from "../../utils/helpers";
import ConfirmationModal from "../modals/ConfirmationModal";

function FavoriteADCard({ type, ad, isMyAccount, order }) {
  const { t } = useTranslation();
  const [isLiked, setIsLiked] = useState(() =>
    type === "favorite" ? true : false
  );

  function handleToggleFavorite(e) {
    e.stopPropagation();
    e.preventDefault();
    setIsLiked(!isLiked);
  }

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
    if (
      e.target.classList.contains("delete") ||
      e.target.classList.contains("favorite") ||
      showConfirmation
    ) {
      e.preventDefault();
    }
  }

  return (
    <Link
      to={`/${order ? "order" : "ad"}-details/${ad?.id || "1"}`}
      className={`fav-ad-card ${type === "favorite" ? "favorite" : ""}`}
      onClick={handleLinkClick}
    >
      <div className="card-header">
        <div className="image-wrapper">
          <img
            src={ad?.image?.image || adImage}
            alt={ad?.title || "AD image"}
          />
        </div>
        <div className="card-content">
          <span className="price gradient-text">
            {ad?.price || "2000"} {t("currency.sar")}
          </span>
          <h5 className="title one-line-wrap">
            {ad?.title || "فيلا في الرياض"}
          </h5>
          <p className="sub-title one-line-wrap">
            {ad?.description || "فيلا 150 م بحديقه و بول"}
          </p>
          {!ad && (
            <div className="categories-wrapper">
              <Link to="" className="category gradient-text">
                <i className="fa-regular fa-apartment"></i>
                {t("categories.estates")}
              </Link>
            </div>
          )}
          <span className="date">
            {t("createdAt")}{" "}
            {ad?.created_at ? calculateDate(ad?.created_at) : "2024/8/2"}
          </span>
        </div>
        <div className="action-boxes">
          {isMyAccount ? (
            <>
              <span
                className="action-btn delete"
                onClick={handleOpenConfirmation}
              >
                <i className="fa-regular fa-trash gradient-icon"></i>
              </span>
              <Link to={`/add-ad/${ad?.id || "1"}`} className="action-btn edit">
                <i className="fa-regular fa-pen-to-square gradient-icon"></i>
              </Link>
            </>
          ) : (
            <span
              className={`action-btn favorite ${
                type === "favorite" || isLiked ? "liked" : ""
              }`}
              onClick={handleToggleFavorite}
            >
              <i className="fa-solid fa-heart"></i>
            </span>
          )}
        </div>
      </div>
      <div className="card-statistics">
        <div className="statistic">
          <i className="fa-regular fa-eye gradient-icon"></i>
          <span className="value">{ad?.view_count || "5"}</span>
        </div>
        <div className="statistic">
          <i className="fa-regular fa-phone gradient-icon"></i>
          <span className="value">{ad?.phones_count || "5"}</span>
        </div>
        <div className="statistic">
          <i className="fa-regular fa-comment-lines gradient-icon"></i>
          <span className="value">{ad?.chats_count || "5"}</span>
        </div>
        <div className="statistic">
          <i className="fa-regular fa-heart gradient-icon"></i>
          <span className="value">{ad?.favorites_count || "5"}</span>
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

export default FavoriteADCard;
