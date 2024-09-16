import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import CartItem from "../ui/cards/CartItem";
import SectionHeader from "../ui/layout/SectionHeader";
import emptyCart from "../assets/images/emptyCart.svg";

function Cart() {
  const { t } = useTranslation();
  const cart = useSelector((state) => state.cart.cartList);

  return (
    <>
      <SectionHeader />
      <section className="shopping_cart">
        <div className="container">
          <div className="row m-0">
            {cart && cart?.length === 0 ? (
              <div className="col-12 p-2">
                <div className="empty_cart">
                  <img src={emptyCart} alt="empty-cart" />
                  <h3>{t("cart.empty")}</h3>
                  <Link to="/markets">{t("cart.markets")}</Link>
                </div>
              </div>
            ) : (
              <>
                {cart?.map((c) => (
                  <div className="col-12" key={c.id}>
                    <CartItem type="cart" item={c} />
                  </div>
                ))}
                <div className="col-12">
                  <div className="cart_total">
                    <p>
                      الإجمالى :{" "}
                      <span>
                        {cart?.reduce(
                          (count, item) =>
                            count +
                            item.quantity *
                              (item?.product?.offer_price
                                ? item?.product?.offer_price
                                : item?.product?.price),
                          0
                        )}
                      </span>{" "}
                      ريال
                    </p>
                    <Link to="/checkout">
                      <span>{t("cart.completePurchese")}</span>
                    </Link>
                  </div>
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
