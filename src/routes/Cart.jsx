import { Link } from "react-router-dom";
import CartItem from "../ui/cards/CartItem";
import SectionHeader from "../ui/layout/SectionHeader";
import { useTranslation } from "react-i18next";

function Cart() {
  const { t } = useTranslation();

  return (
    <div className="cart-page">
      <SectionHeader />
      <div className="cart-details-wrapper container col-lg-10 col-12">
        <CartItem type="cart" />
        <CartItem type="cart" />
        <CartItem type="cart" />

        <div className="checkout-btn-wrapper">
          <Link to="/checkout" className="custom-btn filled">
            <span>
              <i className="fa-regular fa-wallet"></i>
              {t("cart.completePurchese")}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
