import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import adImage from "../../assets/images/villa-1.png";
import { useState } from "react";

function FavoriteADCard({ type }) {
  const { t } = useTranslation();
  const [isLiked, setIsLiked] = useState(() =>
    type === "favorite" ? true : false
  );

  function handleToggleFavorite(e) {
    e.stopPropagation();
    e.preventDefault();
    setIsLiked(!isLiked);
  }

  function handleLinkClick(e) {
    e.stopPropagation();
    if (
      e.target.classList.contains("delete") ||
      e.target.classList.contains("favorite")
    ) {
      e.preventDefault();
    }
  }

  return (
    <Link
      to={`/ad-details/1`}
      className={`fav-ad-card ${type === "favorite" ? "favorite" : ""}`}
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
          <span
            className={`action-btn favorite ${
              type === "favorite" || isLiked ? "liked" : ""
            }`}
            onClick={handleToggleFavorite}
          >
            <i className="fa-solid fa-heart"></i>
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
    </Link>
  );
}

export default FavoriteADCard;
