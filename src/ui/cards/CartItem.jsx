import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import {
  changeProductQuantity,
  deleteProductFromCart,
} from "../../services/apiCart";
import { IconTrashFilled } from "@tabler/icons-react";
import ConfirmationModal from "../modals/ConfirmationModal";

function CartItem({ item }) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  console.log(item);

  const handleDecrease = async () => {
    try {
      setLoading(true);
      const res = await changeProductQuantity("/user/decrease_cart", item?.id);
      if (res?.data?.code === 200) {
        setLoading(false);
        queryClient.invalidateQueries(["cart"]);
      }
    } catch (error) {
      throw new Error(error);
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
      throw new Error(error);
    }
  };

  const handleDeleteItem = async () => {
    setLoading(true);
    try {
      const res = await deleteProductFromCart(item?.id);
      if (res?.data?.code === 200 || res?.data?.code === 201) {
        queryClient.invalidateQueries(["cart"]);
        setShowConfirmation(false);
        setLoading(false);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <>
      <div className="cart_item container">
        <div className="row m-0 w-100">
          <div className="col-lg-7 col-12 p-2">
            <div className="service-head">
              <Link
                to={`/product-details/${item?.product?.id}`}
                className="img"
              >
                <img src={item?.product?.image} alt="service" />
              </Link>
              <div className="title">
                <h5>{item?.product?.title}</h5>
                <div className="owner">
                  <div className="owner-avatar">
                    <img src={item?.market?.logo} alt="owner" />
                  </div>
                  <span>{item?.market?.name}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-12 p-2">
            <div className="add-cart">
              <div className="input-field">
                <button
                  className="add"
                  disabled={loading}
                  onClick={() => handleIncrease()}
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
                <input type="number" min={1} readOnly value={item?.quantity} />
                <button
                  className="minus"
                  disabled={loading}
                  onClick={() => handleDecrease()}
                >
                  <i className="fa-solid fa-minus"></i>
                </button>
              </div>
              <div className="total d-flex justify-content-between align-items-center">
                <p>{t("cart.total")} :</p>
                <div className="d-flex gap-3 align-items-center">
                  <h6 className="mb-0">
                    {(item?.product?.offer_price
                      ? item?.product?.offer_price
                      : item?.product?.price) * item.quantity}{" "}
                    {t("currency.sar")}
                  </h6>
                  <button
                    className="delete_btn"
                    onClick={() => handleDeleteItem()}
                    disabled={loading}
                  >
                    <IconTrashFilled />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
