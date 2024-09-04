import { useTranslation } from "react-i18next";
import productImage from "../../assets/images/product-1.png";
import { useState } from "react";

function ProductMiniCard({ newest, discount }) {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(0);

  function handleAddToCart() {
    setQuantity(1);
  }

  function handleIncrease() {
    setQuantity((q) => q + 1);
  }

  function handleDecrease() {
    if (quantity === 0) return;
    setQuantity((q) => q - 1);
  }

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
          {quantity === 0 ? (
            <span className="btn-box add" onClick={handleAddToCart}>
              <i className="fa-solid fa-cart-plus"></i>
              {t("addToCart")}
            </span>
          ) : (
            <>
              <span className="btn-box increase quantity-btn" onClick={handleIncrease}>
                <i className="fa-solid fa-plus"></i>
              </span>
              <h5 className="quantity">{quantity}</h5>
              <span className="btn-box decrease quantity-btn" onClick={handleDecrease}>
                <i className="fa-solid fa-minus"></i>
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductMiniCard;
