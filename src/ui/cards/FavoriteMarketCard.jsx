import { useTranslation } from "react-i18next";
import marketLogoImage from "../../assets/images/market-logo-1.jpg";
import marketCoverImage from "../../assets/images/market-cover-1.png";
import { Link } from "react-router-dom";
import { useState } from "react";

function FavoriteMarketCard({ type }) {
  const { t } = useTranslation();
  const [isLiked, setIsLiked] = useState(false);

  function handleToggleFavorite(e) {
    e.stopPropagation();
    e.preventDefault();
    setIsLiked(!isLiked);
  }

  function handleOpenConfirmation(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  function handleLinkClick(e) {
    e.stopPropagation();
    if (
      e.target.classList.contains("delete") ||
      e.target.classList.contains("favorite") ||
      handleLinkClick
    ) {
      e.preventDefault();
    }
  }

  return (
    <Link
      to={`/${type === "coupon" ? "coupon" : "market"}-details/1`}
      className="fav-market-card"
      onClick={handleLinkClick}
    >
      <div className="card-header">
        <div className="cover-wrapper">
          <img src={marketCoverImage} alt="market cover image" />
        </div>
        <div className="logo-wrapper">
          <img src={marketLogoImage} alt="market logo image" />
        </div>
        <div className="categories-actions">
          <div className="categories-wrapper">
            <Link to="" className="category">
              {t("categories.perfumes")}
            </Link>
            <Link to="" className="category">
              {t("categories.food")}
            </Link>
          </div>
          <div className="action-boxes">
            {type === "coupon" ? (
              <span
                className={`action-btn favorite ${isLiked ? "liked" : ""}`}
                onClick={handleToggleFavorite}
              >
                <i className="fa-solid fa-heart"></i>
              </span>
            ) : (
              <span
                className="action-btn delete"
                onClick={handleOpenConfirmation}
              >
                <i className="fa-regular fa-trash gradient-icon"></i>
              </span>
            )}
          </div>
        </div>
        <h3>كارفور اونلاين</h3>
      </div>
      <div className="card-details">
        <p className="description">
          يجمع دعاية بلس بين افضل المتاجر والمنتجات عالية الجوده كما يتيح لكم
          التسوق بالاسعار المخفضة
        </p>
        <div className="card-statistics">
          <div className="statistic">
            <i className="fa-regular fa-eye gradient-icon"></i>
            <span className="value">22 {t("thousand")}</span>
          </div>
          <div className="statistic">
            <i className="fa-solid fa-star gradient-icon"></i>
            <span className="value">4.4</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default FavoriteMarketCard;
