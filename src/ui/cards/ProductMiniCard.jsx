import { useTranslation } from "react-i18next";
import productImage from "../../assets/images/product-1.png";

function ProductMiniCard({ newest, discount }) {
  const { t } = useTranslation();

  return (
    <div className="product-mini-card">
      <div className="image-wrapper">
        <img src={productImage} alt="product" />
      </div>
      {newest && <span className="badge">{t("products.newest")}</span>}
      <div className="info-wrapper">
        <h3 className="title">مشروم thio</h3>
        <span className="sub-title">مشروم طازج ٢٠٠ جرام</span>
        <div className="price">
          <span className="gradient-text">300 {t("currency.sar")}</span>
          {discount && (
            <span className="gradient-text old-price">
              380 {t("currency.sar")}
            </span>
          )}
        </div>
        <div className="btns-wrapper">
          <span className="btn-box view">
            <i className="fa-solid fa-up-right-from-square gradient-icon"></i>
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductMiniCard;
