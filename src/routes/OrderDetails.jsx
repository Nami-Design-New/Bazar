import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { ORDER_STATUS_AR, ORDER_STATUS_EN } from "../utils/constants";
import { formatTimeDifference, getTimeDifference } from "../utils/helpers";
import { Link } from "react-router-dom";
import DataLoader from "../ui/DataLoader";
import SectionHeader from "../ui/layout/SectionHeader";
import useOrderDetails from "./../hooks/orders/useOrderDetails";
import { useState } from "react";
import SubmitButton from "../ui/form-elements/SubmitButton";
import axios from "../utils/axios";
import { toast } from "react-toastify";

function OrderDetails() {
  const { t } = useTranslation();
  const { isLoading: orderLoading, data: order, refetch } = useOrderDetails();
  const [loading, setLoading] = useState(false);
  const lang = useSelector((state) => state.language.lang);
  const timeDifference = getTimeDifference(order?.data?.created_at);
  const creationTime = formatTimeDifference(
    timeDifference.years,
    timeDifference.months,
    timeDifference.days,
    timeDifference.hours,
    timeDifference.minutes,
    t
  );

  const handleCancelOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/user/update_order_status", {
        id: order?.data?.id,
        status: "user_canceled",
      });
      if (res?.data?.code === 200) {
        toast.success(t("orders.orderCanceled"));
        refetch();
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error.response.data.message || t("someThingWentWrong"));
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="order-details-page ">
      <SectionHeader />
      {orderLoading ? (
        <DataLoader minHeight="400px" />
      ) : order?.data ? (
        <div className="order-details-wrapper">
          <div className="container">
            <div className="row">
              <div className="status-wrapper">
                <div className="status-header">
                  <div className="info">
                    <h5>
                      <Link
                        to={`/market-details/${order?.data?.market_id}`}
                        className="image-wrapper"
                      >
                        <img
                          src={order?.data?.market?.logo}
                          alt="market image"
                        />
                      </Link>
                      <div className="d-flex flex-column gap-2">
                      {order?.data?.market?.name}
                        <span className="box gradient-text">
                          <i className="fa-solid fa-clock"></i>
                          {creationTime}
                        </span>
                      </div>
                    </h5>
                    <div className="info-boxes">
                      {/* <div className="box gradient-text">
                    <i className="fa-regular fa-calendar-days"></i>
                    {calculateDate(order?.data?.created_at)}
                  </div> */}
                    </div>
                  </div>
                  <div className="icon">
                    {order?.data?.status === "pending" && (
                      <i
                        className={`fa-solid fa-memo ${order?.data?.status} `}
                      ></i>
                    )}
                    {order?.data?.status === "accepted" && (
                      <i
                        className={`fa-solid fa-memo-circle-check  ${order?.data?.status} `}
                      ></i>
                    )}
                    {order?.data?.status === "delivering" && (
                      <i
                        className={`fa-regular fa-truck-container ${order?.data?.status} `}
                      ></i>
                    )}
                    {order?.data?.status === "completed" && (
                      <i
                        className={`fa-solid fa-circle-check  ${order?.data?.status} `}
                      ></i>
                    )}
                    {(order?.data?.status === "canceled" ||
                      order?.data?.status === "user_canceled") && (
                      <i
                        className={`fa-solid fa-ban  ${order?.data?.status} `}
                      ></i>
                    )}
                  </div>
                </div>
                <div className="status-progress">
                  <div className="progress-box">
                    <div className="icon-box">
                      <i
                        className={`fa-solid fa-memo ${
                          order?.data?.status === "pending" ||
                          order?.data?.status === "accepted" ||
                          order?.data?.status === "delivering" ||
                          order?.data?.status === "completed" ||
                          order?.data?.status === "canceled" ||
                          order?.data?.status === "user_canceled"
                            ? `active pending`
                            : ""
                        }`}
                      ></i>
                    </div>
                    <span className="status">{t("orders.pending")}</span>
                  </div>
                  <div
                    className={`progress-line ${
                      order?.data?.status === "accepted" ||
                      order?.data?.status === "delivering" ||
                      order?.data?.status === "completed" ||
                      order?.data?.status === "canceled" ||
                      order?.data?.status === "user_canceled"
                        ? `active ${
                            order?.data?.status === "canceled" ||
                            order?.data?.status === "user_canceled"
                              ? "pending-canceled"
                              : "pending-accepted"
                          }`
                        : ""
                    }`}
                  ></div>
                  {order?.data?.status === "canceled" ||
                  order?.data?.status === "user_canceled" ? null : (
                    <div className="progress-box">
                      <div className="icon-box">
                        <i
                          className={`fa-solid fa-memo-circle-check  ${
                            order?.data?.status === "accepted" ||
                            order?.data?.status === "delivering" ||
                            order?.data?.status === "completed"
                              ? `active accepted`
                              : ""
                          }`}
                        ></i>
                      </div>
                      <span className="status">{t("orders.accepted")}</span>
                    </div>
                  )}
                  {order?.data?.status === "canceled" ||
                  order?.data?.status === "user_canceled" ? null : order?.data
                      ?.delivery_price ? (
                    <>
                      <div
                        className={`progress-line ${
                          order?.data?.status === "delivering" ||
                          order?.data?.status === "completed"
                            ? `active ${
                                order?.data?.delivery_price
                                  ? "accepted-delivering"
                                  : ""
                              }`
                            : ""
                        }`}
                      ></div>
                      <div className="progress-box">
                        <div className="icon-box">
                          <i
                            className={`fa-regular fa-truck-container  ${
                              order?.data?.status === "delivering" ||
                              order?.data?.status === "completed"
                                ? `active delivering`
                                : ""
                            }`}
                          ></i>
                        </div>
                        <span className="status">{t("orders.onDelivery")}</span>
                      </div>
                    </>
                  ) : null}
                  {order?.data?.status === "canceled" ||
                  order?.data?.status === "user_canceled" ? null : (
                    <div
                      className={`progress-line ${
                        order?.data?.status === "completed"
                          ? `active ${
                              order?.data?.delivery_price
                                ? "delivering-completed"
                                : "accepted-completed"
                            }`
                          : ""
                      }`}
                    ></div>
                  )}
                  <div className="progress-box">
                    <div className="icon-box">
                      {order?.data?.status === "canceled" ||
                      order?.data?.status === "user_canceled" ? (
                        <i
                          className={`fa-solid fa-ban active ${order?.data?.status} `}
                        ></i>
                      ) : (
                        <i
                          className={`fa-solid fa-circle-check  ${
                            order?.data?.status === "completed"
                              ? `active completed`
                              : ""
                          }`}
                        ></i>
                      )}
                    </div>
                    <span className="status">
                      {t(
                        `orders.${
                          order?.data?.status === "canceled" ||
                          order?.data?.status === "user_canceled"
                            ? `${order?.data?.status}`
                            : "completed"
                        }`
                      )}
                    </span>
                  </div>
                </div>
                <div className="status-footer">
                  <Link
                    to={`/market-details/${order?.data?.market_id}`}
                    className="btn-box custom-btn stroke"
                  >
                    <span>
                      <i className="fa-regular fa-star"></i>
                      {t("orders.rateMarket")}
                    </span>
                  </Link>
                </div>
              </div>
              <div className="details-wrapper">
                <div className="col-lg-6 col-12 p-2">
                  <div className="order-section">
                    {/* Order ID */}
                    <div className="details-box">
                      <div className="title">
                        <div className="icon">
                          <i className="fa-sharp fa-solid fa-cube  gradient-icon"></i>
                        </div>
                        <span className="secondary">
                          {t("orders.orderId")}:{" "}
                          <span className="gradient-text">
                            #{order?.data?.id}
                          </span>
                        </span>
                      </div>
                    </div>
                    {/* Address */}
                    <div className="details-box">
                      <div className="title">
                        <div className="icon">
                          <i className="fa-sharp fa-solid fa-location-dot gradient-icon"></i>
                        </div>
                        <span>{t("orders.address")}</span>
                      </div>
                      <div className="sub-title">
                        {order?.data?.address?.address}
                      </div>
                    </div>
                    {/* Order Details */}
                    <div className="details-box">
                      <div className="title">
                        <div className="icon">
                          <i className="fa-solid fa-memo-circle-info gradient-icon"></i>
                        </div>
                        <span>{t("orders.orderDetails")}</span>
                      </div>
                      <div className="menu mt-2">
                        <ul className="no-indent">
                          {order?.data?.products?.map((product) => (
                            <li
                              key={product?.id}
                              className="order-product-item"
                            >
                              <div className="image-wrapper">
                                <img
                                  src={product?.product?.image}
                                  alt={product?.product?.title}
                                />
                              </div>
                              <div className="header">
                                <h6>{product?.product?.title} </h6>
                                <div className="d-flex align-items-center justify-content-between">
                                  <div className="d-flex align-items-center gap-2">
                                    <div className="title">
                                      {t("orders.quantity")}:{" "}
                                    </div>
                                    <div className="value gradient-text">
                                      X {product?.quantity}
                                    </div>
                                  </div>
                                  <div className="d-flex align-items-center gap-2">
                                    <div className="title">
                                      {t("orders.totalPrice")}:{" "}
                                    </div>
                                    <div className="value gradient-text">
                                      {product?.product?.offer_price
                                        ? product?.product?.offer_price
                                        : product?.product?.price}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-12 p-2">
                  <div className="order-section">
                    {/* Coupon */}
                    {order?.data?.coupon ? (
                      <div className="details-box">
                        <div className="title">
                          <div className="icon">
                            <i className="fa-solid fa-receipt gradient-icon"></i>
                          </div>
                          <span>{t("orders.usedCoupon")}</span>
                        </div>
                        <div className="sub-title">{order?.data?.coupon}</div>
                      </div>
                    ) : null}
                    {/* Paynment Method */}
                    <div className="details-box">
                      <div className="title">
                        <div className="icon">
                          <i className="fa-brands fa-cc-visa gradient-icon"></i>
                        </div>
                        <span>{t("orders.paymentMethod")}</span>
                      </div>
                      <div className="sub-title">
                        {t(`orders.${order?.data?.payment_method}`)}
                      </div>
                    </div>
                    {/* Total Cost */}
                    <div className="details-box">
                      <div className="title">
                        <div className="icon">
                          <i className="fa-solid fa-money-check-dollar gradient-icon"></i>
                        </div>
                        <span>{t("orders.totalCost")}</span>
                      </div>
                      <div className="menu checkout-details mt-2">
                        <ul>
                          <li>
                            <div className="title">
                              {t("orders.orderPrice")}
                            </div>
                            <div className="value gradient-text">
                              {order?.data?.sub_total || 0}
                            </div>
                          </li>
                          <li>
                            <div className="title">{t("orders.taxes")}</div>
                            <div className="value gradient-text">
                              {order?.data?.taxes || 0}
                            </div>
                          </li>
                          <li className="discount">
                            <div className="title">{t("orders.discount")}</div>
                            <div className="value gradient-text">
                              {order?.data?.discount || 0}
                            </div>
                          </li>
                          {order?.data?.delivery_price ? (
                            <li className="bigger">
                              <div className="title">
                                {t("orders.deliveryCost")}
                              </div>
                              <div className="value gradient-text">
                                {order?.data?.delivery_price || 0}
                              </div>
                            </li>
                          ) : null}
                          <li className="bigger">
                            <div className="title">{t("orders.total")}</div>
                            <div className="value gradient-text">
                              {order?.data?.total || 0}
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {order?.data?.status === "pending" && (
                <div className="btn-wrapper">
                  <SubmitButton
                    className="custom-btn stroke"
                    loading={loading}
                    onClick={handleCancelOrder}
                    name={t("orders.cancelOrder")}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <section className="error-section">
          <img src="/images/error.svg" alt="error image" />
          <h2>{t("error.pageNotFound")}</h2>
          <Link to="/" className="backhome">
            <i className="fa-solid fa-home"></i>
            <span>{t("error.goHome")}</span>
          </Link>
        </section>
      )}
    </div>
  );
}

export default OrderDetails;
