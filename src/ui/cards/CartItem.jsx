import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import {
  changeProductQuantity,
  deleteProductFromCart
} from "../../services/apiCart";
import ConfirmationModal from "../modals/ConfirmationModal";

function CartItem({ type, item }) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDecrease = async () => {
    try {
      setLoading(true);
      const res = await changeProductQuantity("/user/decrease_cart", item?.id);
      if (res?.data?.code === 200) {
        setLoading(false);
        queryClient.invalidateQueries(["cart"]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleIncrease = async () => {
    try {
      setLoading(true);
      const res = await changeProductQuantity("/user/increase_cart", item?.id);
      if (res?.data?.code === 200) {
        setLoading(false);
        queryClient.invalidateQueries(["cart"]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteItem = async () => {
    setLoading(true);
    try {
      const res = await deleteProductFromCart(item?.id);
      if (res?.data?.code) {
        queryClient.invalidateQueries(["cart"]);
        setShowConfirmation(false);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="cart_item">
        <Link to="/ad-details" className="item-info">
          <div className="img">
            <img src={item?.product?.image} alt="product" />
          </div>
          <div className="details">
            <h6>{item?.product?.title}</h6>
            <p>
              {" "}
              <i className="fa-regular fa-tags"></i>{" "}
              <span>
                {item?.product?.offer_price
                  ? item?.product?.offer_price
                  : item?.product?.price}
              </span>{" "}
              {t("currency.sar")}
            </p>
          </div>
        </Link>
        {type === "cart" && (
          <div className="price_count">
            <div className="count">
              <button disabled={loading} onClick={handleDecrease}>
                <i className="fa-sharp fa-solid fa-minus"></i>
              </button>
              <input
                type="number"
                value={item?.quantity}
                disabled
                placeholder="0"
              />
              <button disabled={loading} onClick={handleIncrease}>
                <i className="fa-sharp fa-solid fa-plus"></i>
              </button>
            </div>
            <div className="total">
              <p>
                الاجمالي :{" "}
                <span>
                  {(item?.product?.offer_price
                    ? item?.product?.offer_price
                    : item?.product?.price) * item.quantity}
                </span>{" "}
                {t("currency.sar")}
              </p>
              <button onClick={() => setShowConfirmation(true)}>
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
        eventFun={handleDeleteItem}
        buttonText={t("delete")}
        loading={loading}
        text={t("orders.areYouSureYouWantToDeleteOrder")}
      />
    </>
  );
}

export default CartItem;
