import { useTranslation } from "react-i18next";
import { useState } from "react";

function CouponCard({ coupon }) {
  const { t } = useTranslation();
  const [isCopied, setIsCopied] = useState(false);

  console.log(coupon);

  function handleCopyCoupon() {
    const couponCode = coupon?.coupon;
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
      <div className="card-header no-overlay">
        <div className="cover-wrapper">
          <img src={coupon?.image} alt="market cover image" />
        </div>
      </div>
      <div className="card-details">
        <h5 className="coupon-title">{coupon?.name}</h5>
        <div className="details d-flex w-100 align-items-center justify-content-between gap-2 flex-wrap">
          {coupon?.min ? (
            <span className="details-box">
              {t("coupons.min")} {coupon?.min}
            </span>
          ) : null}
          {coupon?.max ? (
            <span className="details-box">
              {t("coupons.max")} {coupon?.max}
            </span>
          ) : null}
        </div>
        <div className="card-statistics">
          <div
            className="statistic"
            style={{ cursor: "pointer" }}
            onClick={handleCopyCoupon}
          >
            <i className="fa-solid fa-receipt gradient-icon"></i>
            <span className="value">{coupon?.coupon}</span>
          </div>
          {coupon?.value ? (
            <div className="statistic">
              <span>{t("coupons.value")}</span>
              <span className="value">{coupon?.value}</span>
            </div>
          ) : null}
        </div>
        <div className="copy-wrapper">
          <span
            className="custom-btn filled"
            style={{ cursor: "pointer" }}
            onClick={handleCopyCoupon}
          >
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
