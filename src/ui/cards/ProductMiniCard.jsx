import { useTranslation } from "react-i18next";
import { useState } from "react";

function ProductMiniCard({ newest, product }) {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(0);

  console.log(product);

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
        <img src={product?.image} alt="product" />
      </div>
      {newest && <span className="badge">{t("products.newest")}</span>}
      <div className="info-wrapper">
        <h3 className="title">{product?.title}</h3>
        <span className="sub-title">{product?.description}</span>
        <div className="price">
          <span className="gradient-text">
            {product?.offer_price ? product?.offer_price : product?.price}
          </span>
          {product?.offer_price ? (
            <span className="gradient-text old-price">{product?.price}</span>
          ) : null}
        </div>
        <div className="btns-wrapper">
          {quantity === 0 ? (
            <span className="btn-box add" onClick={handleAddToCart}>
              <i className="fa-solid fa-cart-plus"></i>
              {t("addToCart")}
            </span>
          ) : (
            <>
              <span
                className="btn-box increase quantity-btn"
                onClick={handleIncrease}
              >
                <i className="fa-solid fa-plus"></i>
              </span>
              <h5 className="quantity">{quantity}</h5>
              <span
                className="btn-box decrease quantity-btn"
                onClick={handleDecrease}
              >
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
