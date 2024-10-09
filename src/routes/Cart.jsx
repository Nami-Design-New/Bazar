import { deleteCart } from "../services/apiCart";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import CartItem from "../ui/cards/CartItem";
import SectionHeader from "../ui/layout/SectionHeader";
import SubmitButton from "../ui/form-elements/SubmitButton";

function Cart() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const cart = useSelector((state) => state.cart.cartList);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteCart(queryClient);
      toast.success(t("cart.cartDelted"));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SectionHeader />
      <section className="shopping_cart">
        <div className="container">
          <div className="row m-0">
            {cart && cart?.length === 0 ? (
              <div className="col-12 p-2">
                <div className="empty_cart">
                  <img src="/images/emptyCart.svg" alt="empty-cart" />
                  <h3>{t("cart.empty")}</h3>
                  <Link to="/markets">{t("cart.markets")}</Link>
                </div>
              </div>
            ) : (
              <>
                {cart?.map((c) => (
                  <div className="col-12 p-2" key={c.id}>
                    <CartItem type="cart" item={c} />
                  </div>
                ))}

                <div className="col-lg-8 col-12 p-2">
                  <div className="cartTotalPrice">
                    <p>{t("cart.total")}:</p>
                    <h6 className="mb-0">
                      {cart?.reduce(
                        (count, item) =>
                          count +
                          item.quantity *
                            (item?.product?.offer_price
                              ? item?.product?.offer_price
                              : item?.product?.price),
                        0
                      )}
                      {t("currency.sar")}
                    </h6>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6 col-12">
                  <SubmitButton
                    className="order-now delete"
                    name={t("cart.deleteCart")}
                    onClick={handleDelete}
                    loading={loading}
                  />
                </div>

                <div className="col-lg-6 col-md-6 col-12">
                  <Link to="/checkout" className="order-now">
                    {t("cart.completePurchese")}
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;
