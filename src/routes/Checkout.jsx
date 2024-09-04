import { useState } from "react";
import CartItem from "../ui/cards/CartItem";
import TextField from "../ui/form-elements/TextField";
import InputField from "../ui/form-elements/InputField";
import SectionHeader from "../ui/layout/SectionHeader";
import { useTranslation } from "react-i18next";

function Checkout() {
  const { t } = useTranslation();

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [formData, setFormData] = useState({
    details: "",
    visaNumber: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="cart-page">
      <SectionHeader />
      <form className="cart-details-wrapper container col-lg-10 col-12">
        <div className="cart-items">
          <CartItem />
          <CartItem />
        </div>
        <div className="col-12">
          <TextField
            name="details"
            id="details"
            value={formData?.details}
            onChange={(e) => handleChange(e)}
            placeholder={t("writeHere")}
            label={t("cart.orderDetails")}
          />
        </div>
        <div className="col-12 address-wrapper">
          <h6>{t("cart.orderAddress")}</h6>
          <div className="radio-group">
            <input
              type="radio"
              name="address"
              id="address1"
              value={"عنوان المنزل ، الدمام ،فيلا 13"}
              checked={address === "عنوان المنزل ، الدمام ،فيلا 13"}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label htmlFor="address1">عنوان المنزل، الدمام، فيلا 13</label>
          </div>
          <div className="radio-group">
            <input
              type="radio"
              name="address"
              id="address2"
              value={"عنوان المكتب  ، الدمام ، شارع عزيز ،فيلا 13"}
              checked={
                address === "عنوان المكتب  ، الدمام ، شارع عزيز ،فيلا 13"
              }
              onChange={(e) => setAddress(e.target.value)}
            />
            <label htmlFor="address2">
              عنوان المكتب، الدمام، شارع عزيز، فيلا 13
            </label>
          </div>
          <div className="radio-group">
            <i className="fa-regular fa-location-plus "></i>
            <span>{t("cart.addAddress")}</span>
          </div>
        </div>
        <div className="col-12 coupon-form-wrapper">
          <h6 className="d-flex align-items-center gap-2">
            <i className="fa-solid fa-receipt gradient-icon"></i>
            {t("cart.addCoupon")}
          </h6>
          <div className="col-12">
            <InputField
              type="text"
              id="coupon"
              name="coupon"
              placeholder={t("writeHere")}
              value={formData?.coupon}
              onChange={handleChange}
              required={true}
            />
          </div>
        </div>
        <div className="coupon-card">
          <div className="header">
            <i className="fa-solid fa-receipt"></i>
            <h3>TAWFFER50%</h3>
          </div>
          <div className="btns-wrapper">
            <div className="btn-box">
              <i className="fa-regular fa-trash delete"></i>
            </div>
          </div>
          <div className="details">
            <span className="details-box">الحد الادني ٢٠٠ ريال</span>
            <span className="details-box">الحد الاقصي ٢٠٠٠ ريال</span>
          </div>
        </div>
        <div className="col-12 paymentMethod-wrapper">
          <h6>{t("cart.paymentMethod")}</h6>
          <div className="radio-group">
            <input
              type="radio"
              name="paymentMethod"
              id="cach"
              value="cach"
              checked={paymentMethod === "cach"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="cach">
              {/* <i className="fa-regular fa-money-bill"></i> */}
              <span>{t("cart.cach")}</span>
            </label>
          </div>
          <div className="radio-group">
            <input
              type="radio"
              name="paymentMethod"
              id="wallet"
              value="wallet"
              checked={paymentMethod === "wallet"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="wallet">
              {/* <i className="fa-regular fa-wallet"></i> */}
              <span>{t("cart.wallet")}</span>
            </label>
          </div>
          <div className="radio-group">
            <input
              type="radio"
              name="paymentMethod"
              id="visa"
              value="visa"
              checked={paymentMethod === "visa"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="visa">
              {/* <i className="fa-brands fa-cc-visa"></i> */}
              <span>{t("cart.visa")}</span>
            </label>
          </div>
          {paymentMethod === "visa" && (
            <div className="col-12 payment-key">
              <InputField
                type="number"
                id="visaNumber"
                name="visaNumber"
                placeholder={t("123456")}
                label={t("cart.visaNumber")}
                value={formData?.visaNumber}
                onChange={handleChange}
                required={true}
              />
            </div>
          )}
        </div>
        <div className="col-12 menu checkout-details">
          <ul>
            <li>
              <div className="title">{t("orders.orderPrice")}</div>
              <div className="value gradient-text">150.0 ريال</div>
            </li>
            <li>
              <div className="title">{t("orders.taxes")}</div>
              <div className="value gradient-text">150.0 ريال</div>
            </li>
            <li className="discount">
              <div className="title">{t("orders.discount")}</div>
              <div className="value gradient-text">150.0 ريال</div>
            </li>
            <li className="bigger">
              <div className="title">{t("orders.deliveryCost")}</div>
              <div className="value gradient-text">150.0 ريال</div>
            </li>
            <li className="bigger">
              <div className="title">{t("orders.total")}</div>
              <div className="value gradient-text">150.0 ريال</div>
            </li>
          </ul>
        </div>
        <div className="checkout-btn-wrapper">
          <span className="custom-btn filled">
            <i className="fa-regular fa-wallet"></i>
            {t("cart.completePurchese")}
          </span>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
