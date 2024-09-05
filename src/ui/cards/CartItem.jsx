import { useTranslation } from "react-i18next";
import productImg from "../../assets/images/product-1.png";
import { useState } from "react";
import ConfirmationModal from "../modals/ConfirmationModal";
import { Link } from "react-router-dom";

function CartItem({ type }) {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);

  function handleDecrease() {
    if (quantity === 0) return;
    setQuantity((q) => q - 1);
  }

  function handleIncrease() {
    setQuantity((q) => q + 1);
  }

  function handleOpenConfirmation(e) {
    e.stopPropagation();
    e.preventDefault();
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
    quantity > 0 && (
      <>
        <Link className="cart-item" onClick={handleLinkClick}>
          <div className="image-wrapper">
            <img src={productImg} alt="order image" />
          </div>
          <div className="card-content">
            <span className="price gradient-text">
              300.00 {t("currency.sar")}
            </span>
            <h3 className="title">مشروم thio</h3>
            <span className="sub-title">مشروم طازج ٢٠٠ جرام</span>
          </div>
          {type === "cart" && (
            <>
              <div className="action-boxes">
                <span
                  className="action-btn delete"
                  onClick={handleOpenConfirmation}
                >
                  <i className="fa-regular fa-trash gradient-icon"></i>
                </span>
              </div>
              <div className="btns-wrapper">
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
              </div>
            </>
          )}
        </Link>
        <ConfirmationModal
          showModal={showConfirmation}
          setShowModal={setShowConfirmation}
          type="delete"
          eventFun={handleDelete}
          buttonText={t("delete")}
          text={t("orders.areYouSureYouWantToDeleteOrder")}
        />
      </>
    )
  );
}

export default CartItem;
