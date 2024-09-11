import { Link } from "react-router-dom";
import CartItem from "../ui/cards/CartItem";
import SectionHeader from "../ui/layout/SectionHeader";
import { useTranslation } from "react-i18next";

function Cart() {
  const { t } = useTranslation();

  return (
    <>
      <SectionHeader />
      <section className="shopping_cart">
        <div className="container">
          <div className="row m-0">
            <div className="col-12">
              <CartItem type="cart" />
            </div>
            <div className="col-12">
              <CartItem type="cart" />
            </div>
            <div className="col-12">
              <CartItem type="cart" />
            </div>
            <div className="col-12">
              <CartItem type="cart" />
            </div>
            <div className="col-12">
              <div className="cart_total">
                <p>
                  الإجمالى : <span>120.00</span> ريال
                </p>
                <Link to="/checkout">
                  <span>{t("cart.completePurchese")}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;
