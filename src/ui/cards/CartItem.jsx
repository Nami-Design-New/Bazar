import { useState } from "react";
import { useTranslation } from "react-i18next";
import productImg from "../../assets/images/product-1.png";
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

  return (
    quantity > 0 && (
      <>
        <div className="cart_item">
          <Link to="/ad-details" className="item-info">
            <div className="img">
              <img src={productImg} alt="product" />
            </div>
            <div className="details">
              <h6>مشروم طازج ٢٠٠ جرام</h6>
              <p>
                {" "}
                <i className="fa-regular fa-tags"></i> <span>30.00</span>{" "}
                {t("currency.sar")}
              </p>
            </div>
          </Link>
          {type === "cart" && (
            <div className="price_count">
              <div className="count">
                <button onClick={handleDecrease}>
                  <i className="fa-sharp fa-solid fa-minus"></i>
                </button>
                <input
                  type="number"
                  value={quantity}
                  disabled
                  placeholder="0"
                />
                <button onClick={handleIncrease}>
                  <i className="fa-sharp fa-solid fa-plus"></i>
                </button>
              </div>
              <div className="total">
                <p>
                  الاجمالي : <span>30.00</span> {t("currency.sar")}
                </p>
                <button onClick={handleOpenConfirmation}>
                  <i className="fa-regular fa-trash-can-list"></i>
                </button>
              </div>
            </div>
          )}
        </div>
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
