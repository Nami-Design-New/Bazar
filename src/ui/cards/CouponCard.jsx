import { Link } from "react-router-dom";
import marketCoverImage from "../../assets/images/market-cover-1.png";
import { useTranslation } from "react-i18next";
import { useState } from "react";

function CouponCard() {
  const { t } = useTranslation();
  const [isLiked, setIsLiked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  function handleToggleFavorite(e) {
    e.stopPropagation();
    e.preventDefault();
    setIsLiked(!isLiked);
  }

  function handleCopyCoupon() {
    const couponCode = "carrefour924";
    navigator.clipboard
      .writeText(couponCode)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }

  return (
    <div className="fav-market-card coupon-card">
      <div className="card-header">
        <div className="cover-wrapper">
          <img src={marketCoverImage} alt="market cover image" />
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
            <span
              className={`action-btn favorite ${isLiked ? "liked" : ""}`}
              onClick={handleToggleFavorite}
            >
              <i className="fa-solid fa-heart"></i>
            </span>
          </div>
        </div>
        <h3>كارفور اونلاين</h3>
      </div>
      <div className="card-details">
        <div className="details">
          <span className="details-box">الحد الادني ٢٠٠ ريال</span>
          <span className="details-box">الحد الاقصي ٢٠٠٠ ريال</span>
        </div>
        <div className="card-statistics">
          <div
            className="statistic"
            style={{ cursor: "pointer" }}
            onClick={handleCopyCoupon}
          >
            <i className="fa-solid fa-receipt gradient-icon"></i>
            <span className="value">carrefour924</span>
          </div>
          <div className="statistic">
            <span>{t("numberOfCoupons")}</span>
            <span className="value">22</span>
          </div>
        </div>
        <div className="copy-wrapper">
          <span className="custom-btn filled" onClick={handleCopyCoupon}>
            <span>
              <i
                className={`fa-regular ${
                  isCopied ? "fa-check-double" : "fa-copy"
                }`}
              ></i>
              {isCopied ? t("successfullyCopied") : t("copyCoupon")}{" "}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default CouponCard;
