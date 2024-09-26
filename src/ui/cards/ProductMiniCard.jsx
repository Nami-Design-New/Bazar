import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { deleteProductFromCart } from "../../services/apiCart";
import axios from "./../../utils/axios";
import DeleteCartAndAdd from "../modals/DeleteCartAndAdd";
import { Link } from "react-router-dom";
function ProductMiniCard({ product, marketId }) {
  const { t } = useTranslation();
  const cart = useSelector((state) => state.cart.cartList);
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState();
  const [inCart, setInCart] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (cart && cart?.length > 0) {
      setInCart(cart?.some((c) => c?.product?.id === product?.id));
    }
  }, [cart, product?.id]);
  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (cart?.[0]?.market?.id && marketId !== cart?.[0]?.market?.id) {
      setShowModal(true);
      return;
    }
    try {
      const res = await axios.post("/user/add_to_cart", {
        quantity: 1,
        market_id: marketId,
        product_id: product?.id,
      });
      if (res.status === 200 || res.status === 201) {
        toast.success(t("cart.addedToCart"));
        queryClient.invalidateQueries(["cart"]);
        setInCart(true);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || t("somethingWentWrong"));
      throw new Error(error);
    }
  };
  const handleDeleteItem = async (e) => {
    e.stopPropagation();
    try {
      const res = await deleteProductFromCart(product?.id);
      if (res?.data?.code) {
        queryClient.invalidateQueries(["cart"]);
        toast.success(t("cart.productDeleted"));
        setInCart(false);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  const handleConfirmModal = async () => {
    setLoading(true);
    try {
      const deleteCart = await axios.post("/user/delete_cart");
      if (deleteCart?.data?.code) {
        try {
          const res = await axios.post("/user/add_to_cart", {
            quantity: 1,
            market_id: marketId,
            product_id: product?.id,
          });
          if (res.status === 200 || res.status === 201) {
            toast.success(t("cart.addedToCart"));
            queryClient.invalidateQueries(["cart"]);
            setInCart(true);
          }
        } catch (error) {
          toast.error(
            error?.response?.data?.message || t("somethingWentWrong")
          );
          throw new Error(error);
        }
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };
  return (
    <div className="product_crad">
      <div className="product_image">
        <Link to={`/product-details/${product?.id}`}>
          <img src={product?.image} alt="product" />
        </Link>
        {/* <span>أوريون</span>
        <button>
          <i className="fa-sharp fa-light fa-heart"></i>
        </button> */}
      </div>
      <div className="product_info">
        <Link to={`/product-details/${product?.id}`}>
          <h5 className="pro_name">{product?.title || "مشروم thio"}</h5>
        </Link>
        <p className="pro_number one-line-wrap">
          {product?.description || "مشروم طازج ٢٠٠ جرام"}
        </p>
        <div className="price_buy">
          <h6>
            {product?.offer_price ? product?.offer_price : product?.price}{" "}
            {t("currency.sar")}
          </h6>
          <button onClick={inCart ? handleDeleteItem : handleAddToCart}>
            {inCart ? (
              <i className="fa-light fa-trash"></i>
            ) : (
              <i className="fa-light fa-cart-plus"></i>
            )}{" "}
            {inCart ? t("cart.remove") : t("cart.add")}
          </button>
        </div>
        <div className="rate_sale">
          {product?.offer_price && (
            <p>
              <span className="old_price">
                {product?.price} {t("currency.sar")}
              </span>{" "}
              <span className="sale">
                {t("cart.off")}{" "}
                {(
                  ((product?.price - product?.offer_price) / product?.price) *
                  100
                ).toFixed(2)}
                %
              </span>
            </p>
          )}
        </div>
      </div>
      <DeleteCartAndAdd
        showModal={showModal}
        setShowModal={setShowModal}
        eventFun={handleConfirmModal}
        loading={loading}
      />
    </div>
  );
}
export default ProductMiniCard;
