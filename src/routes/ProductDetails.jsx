import { useTranslation } from "react-i18next";
import AdDetailsSlider from "../components/ad-details/AdDetailsSlider";
import { formatTimeDifference, getTimeDifference } from "../utils/helpers";
import { Link } from "react-router-dom";
import useProductDetails from "../hooks/useProductDetails";
import DataLoader from "../ui/DataLoader";
import { useState } from "react";
import { deleteProductFromCart } from "../services/apiCart";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import DeleteCartAndAdd from "../ui/modals/DeleteCartAndAdd";
import axios from "../utils/axios";

function ProductDetails() {
  const { t } = useTranslation();
  const [inCart, setInCart] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isLoading: productLoading, data: product } = useProductDetails();
  const cart = useSelector((state) => state.cart.cartList);
  const queryClient = useQueryClient();

  const timeDifference = getTimeDifference(product?.data?.created_at);
  const creationTime = formatTimeDifference(
    timeDifference.years,
    timeDifference.months,
    timeDifference.days,
    timeDifference.hours,
    timeDifference.minutes,
    t
  );

  const handleAddToCart = async () => {
    if (
      cart?.[0]?.market?.id &&
      product?.data?.market?.id !== cart?.[0]?.market?.id
    ) {
      setShowModal(true);
      return;
    }
    try {
      const res = await axios.post("/user/add_to_cart", {
        quantity: 1,
        market_id: product?.data?.market_id,
        product_id: product?.data?.id,
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

  const handleDeleteItem = async () => {
    try {
      const res = await deleteProductFromCart(product?.data?.id);
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
            market_id: product?.data?.market?.id,
            product_id: product?.data?.id,
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

  return productLoading ? (
    <DataLoader minHeight="200px" />
  ) : product?.data ? (
    <section className="itemDetails">
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex flex-row gap-4 p-0 pb-3 p-md-3">
            <AdDetailsSlider
              images={product?.data?.images}
              className="col-lg-6 col-12 p-0"
            />
            <div className="col-lg-6 col-12 p-0">
              <div className="priceInfo d-flex align-items-center justify-content-between gap-3 w-100">
                {product?.data?.title && (
                  <h3 className="title">{product?.data?.title}</h3>
                )}
                {product?.data?.price ? (
                  <div
                    className="price"
                    style={{
                      width: "unset !important",
                      flex: "unset !important",
                    }}
                  >
                    <span> ${product?.data?.price} </span>
                  </div>
                ) : null}
              </div>

              <div className="itemInfo">
                <div className="itemBottom">
                  <Link className="location">
                    {product?.data?.address ? (
                      <>
                        <img src="/images/location.svg" alt="" />
                        <span> {product?.data?.address} </span>
                      </>
                    ) : null}
                  </Link>
                  {product?.data?.created_at ? (
                    <div className="time">
                      <img src="/images/clock.svg" alt="" />{" "}
                      {product?.data?.created_at ? creationTime : "1h ago"}
                    </div>
                  ) : null}
                  {product?.data?.view_count ? (
                    <div className="views">
                      <img src="/images/eye.svg" alt="" />{" "}
                      {product?.data?.view_count}
                    </div>
                  ) : null}
                </div>
                {product?.data?.description && (
                  <p className="description">{product?.data?.description}</p>
                )}
                <div className="actions-wrapper w-100 d-flex justify-content-end mt-4">
                  <button
                    onClick={inCart ? handleDeleteItem : handleAddToCart}
                    className="custom-btn stroke"
                    style={{ maxWidth: "300px" }}
                  >
                    <span>
                      {inCart ? (
                        <i className="fa-light fa-trash"></i>
                      ) : (
                        <i className="fa-light fa-cart-plus"></i>
                      )}{" "}
                      {inCart ? t("cart.remove") : t("cart.add")}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeleteCartAndAdd
        showModal={showModal}
        setShowModal={setShowModal}
        eventFun={handleConfirmModal}
        loading={loading}
      />
    </section>
  ) : (
    <section className="error-section">
      <img src="/images/error.svg" alt="error image" />
      <h2>{t("error.pageNotFound")}</h2>
      <Link to="/" className="backhome">
        <i className="fa-solid fa-home"></i>
        <span>{t("error.goHome")}</span>
      </Link>
    </section>
  );
}

export default ProductDetails;
