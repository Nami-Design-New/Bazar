import { useState } from "react";
import { useTranslation } from "react-i18next";
import TextField from "../ui/form-elements/TextField";
import InputField from "../ui/form-elements/InputField";
import SectionHeader from "../ui/layout/SectionHeader";
import useGetCart from "./../features/cart/useGetCart";

function Checkout() {
  const { t } = useTranslation();
  const { data: cart } = useGetCart();
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const [formData, setFormData] = useState({
    address_id: "",
    notes: "",
    sub_total: "",
    taxes: "",
    discount: "",
    total: "",
    coupon: "",
    payment_method: "",
    delivery_price: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <SectionHeader />

      <section className="checkout_section">
        <div className="container">
          <div className="row m-0">
            <div className="col-lg-6 col-12 p-2">
              <div className="products">
                {cart?.map((c) => (
                  <div className="product" key={c.id}>
                    <div className="pro_img">
                      <img src={c?.product?.image} alt="product" />
                    </div>
                    <div className="info">
                      <h6>{c?.product?.title}</h6>
                      <div className="count_price">
                        <p>
                          الكمية : <span>X{c?.quantity}</span>
                        </p>
                        <p>
                          الاجمالي :{" "}
                          <span>{c?.product?.price * c?.quantity}</span> ريال
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-6 col-12 p-2">
              <div className="d-flex flex-column gap-3">
                {/* order details */}
                <div className="checkout-details">
                  <ul>
                    <li>
                      <div className="title">{t("orders.orderPrice")}</div>
                      <div className="value ">
                        {cart?.reduce(
                          (count, item) =>
                            count + item.quantity * item?.product?.price,
                          0
                        )}{" "}
                        ريال
                      </div>
                    </li>
                    <li>
                      <div className="title">{t("orders.taxes")}</div>
                      <div className="value ">150.0 ريال</div>
                    </li>
                    <li className="discount">
                      <div className="title">{t("orders.discount")}</div>
                      <div className="value ">150.0 ريال</div>
                    </li>
                    <li className="bigger">
                      <div className="title">{t("orders.deliveryCost")}</div>
                      <div className="value ">150.0 ريال</div>
                    </li>
                    <li className="bigger">
                      <div className="title">{t("orders.total")}</div>
                      <div className="value ">150.0 ريال</div>
                    </li>
                  </ul>
                </div>

                {/* checkout form */}
                <form className="form d-flex flex-column gap-3 p-0">
                  <TextField
                    name="details"
                    id="details"
                    value={formData?.details}
                    onChange={(e) => handleChange(e)}
                    placeholder={t("writeHere")}
                    label={t("cart.orderDetails")}
                  />

                  <div className="address-wrapper">
                    <h6>{t("cart.orderAddress")}</h6>
                    <div className="radios">
                      <label htmlFor="address1">
                        <input
                          type="radio"
                          name="address"
                          id="address1"
                          value={"عنوان المنزل ، الدمام ،فيلا 13"}
                          checked={address === "عنوان المنزل ، الدمام ،فيلا 13"}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                        <span className="address">
                          عنوان المنزل، الدمام، فيلا 13
                        </span>
                      </label>

                      <label htmlFor="address2">
                        <input
                          type="radio"
                          name="address"
                          id="address2"
                          value={"عنوان المكتب  ، الدمام ، شارع عزيز ،فيلا 13"}
                          checked={
                            address ===
                            "عنوان المكتب  ، الدمام ، شارع عزيز ،فيلا 13"
                          }
                          onChange={(e) => setAddress(e.target.value)}
                        />
                        <span className="address">
                          عنوان المكتب، الدمام، شارع عزيز، فيلا 13
                        </span>
                      </label>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <i className="fa-regular fa-location-plus "></i>
                      <span>{t("cart.addAddress")}</span>
                    </div>
                  </div>

                  <div className="paymentMethod-wrapper">
                    <h6>{t("cart.paymentMethod")}</h6>
                    <div className="radios">
                      <label htmlFor="cach">
                        <input
                          type="radio"
                          name="paymentMethod"
                          id="cach"
                          value="cach"
                          checked={paymentMethod === "cach"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span className="address">{t("cart.cach")}</span>
                      </label>

                      <label htmlFor="wallet">
                        <input
                          type="radio"
                          name="paymentMethod"
                          id="wallet"
                          value="wallet"
                          checked={paymentMethod === "wallet"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span className="address">{t("cart.wallet")}</span>
                      </label>

                      <label htmlFor="visa">
                        <input
                          type="radio"
                          name="paymentMethod"
                          id="visa"
                          value="visa"
                          checked={paymentMethod === "visa"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span className="address">{t("cart.visa")}</span>
                      </label>
                    </div>
                  </div>

                  {paymentMethod === "visa" && (
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
                  )}

                  <div className="w-100">
                    <h6 className="d-flex align-items-center gap-2">
                      <i className="fa-solid fa-receipt gradient-icon"></i>
                      {t("cart.addCoupon")}
                    </h6>
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

                  <div className="coupon-card">
                    <div className="header">
                      <i className="fa-solid fa-receipt"></i>
                      <h3>TAWFFER50%</h3>
                    </div>
                    <button className="discard_coupon">
                      <i className="fa-regular fa-trash delete"></i>
                    </button>
                    <div className="details">
                      <span className="details-box">الحد الادني ٢٠٠ ريال</span>
                      <span className="details-box">الحد الاقصي ٢٠٠٠ ريال</span>
                    </div>
                  </div>

                  <div className="cart_total">
                    <button type="submit">إرسال الطلب</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Checkout;
