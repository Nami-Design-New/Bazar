import { useState } from "react";
import SectionHeader from "../ui/layout/SectionHeader";
import { useTranslation } from "react-i18next";

function OrderDetails() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);

  return (
    <div className="order-details-page ">
      <SectionHeader />
      <div className="order-details-wrapper container col-lg-10 col-12">
        <div className="order-header">
          <h3>مطلوب سياره AGM مستعمله</h3>
        </div>
        <div className="status-wrapper">
          <div className="status-header">
            <div className="info">
              <h5>{t("orders.newOrder")}</h5>
              <div className="info-boxes">
                <div className="box gradient-text">
                  <i className="fa-regular fa-calendar-days"></i>2024/2/2
                </div>
                <div className="box gradient-text">
                  <i className="fa-solid fa-clock"></i>10 : 30 AM
                </div>
              </div>
            </div>
            <div className="icon">
              {step === 1 && (
                <i className={`fa-solid fa-memo gradient-icon `}></i>
              )}
              {step === 2 && (
                <i className={`fa-solid fa-memo-circle-check active `}></i>
              )}
              {step === 3 && (
                <i
                  className={`fa-regular fa-truck-container gradient-icon `}
                ></i>
              )}
              {step === 4 && (
                <i className={`fa-solid fa-circle-check active `}></i>
              )}
            </div>
          </div>
          <div className="status-progress">
            <div className="progress-box">
              <div className="icon-box">
                <i
                  className={`fa-solid fa-memo ${
                    step >= 1 ? "gradient-icon" : ""
                  }`}
                ></i>
              </div>
              <span className="status">{t("orders.newOrder")}</span>
            </div>
            <div className={`progress-line ${step >= 1 ? "active" : ""}`}></div>
            <div className="progress-box">
              <div className="icon-box">
                <i
                  className={`fa-solid fa-memo-circle-check  ${
                    step >= 2 ? "active" : ""
                  }`}
                ></i>
              </div>
              <span className="status">{t("orders.accepted")}</span>
            </div>
            <div className={`progress-line ${step >= 2 ? "active" : ""}`}></div>
            <div className="progress-box">
              <div className="icon-box">
                <i
                  className={`fa-regular fa-truck-container  ${
                    step >= 3 ? "gradient-icon" : ""
                  }`}
                ></i>
              </div>
              <span className="status">{t("orders.onDelivery")}</span>
            </div>
            <div className={`progress-line ${step >= 3 ? "active" : ""}`}></div>
            <div className="progress-box">
              <div className="icon-box">
                <i
                  className={`fa-solid fa-circle-check  ${
                    step >= 4 ? "active" : ""
                  }`}
                ></i>
              </div>
              <span className="status">{t("orders.completed")}</span>
            </div>
          </div>
        </div>
        <div className="details-wrapper">
          <div className="details-box">
            <div className="title">
              <div className="icon">
                <i className="fa-sharp fa-solid fa-cube  gradient-icon"></i>
              </div>
              <span className="secondary">{t("orders.orderId")}: 342353</span>
            </div>
          </div>
          <div className="details-box">
            <div className="title">
              <div className="icon">
                <i className="fa-brands fa-cc-visa gradient-icon"></i>
              </div>
              <span>{t("orders.paymentMethod")}</span>
            </div>
            <div className="sub-title">{t("orders.creditCards")}</div>
          </div>
          <div className="details-box">
            <div className="title">
              <div className="icon">
                <i className="fa-sharp fa-solid fa-location-dot gradient-icon"></i>
              </div>
              <span>{t("orders.address")}</span>
            </div>
            <div className="sub-title">السعوديه / الرياض/ شارع فيصل</div>
          </div>
          <div className="details-box">
            <div className="title">
              <div className="icon">
                <i className="fa-solid fa-memo-circle-info gradient-icon"></i>
              </div>
              <span>{t("orders.orderDetails")}</span>
            </div>
            <div className="menu">
              <ol>
                <li>
                  <div className="header">
                    <h6>نانو سيراميك x2</h6>
                    <span className="price gradient-text">200 ريال</span>
                  </div>
                  <ul>
                    <li>
                      <div className="title">زجاج امامي :</div>
                      <div className="value">شفاف اسود</div>
                    </li>
                    <li>
                      <div className="title">زجاج خلفي :</div>
                      <div className="value">شفاف ٨٠٪</div>
                    </li>
                    <li>
                      <div className="title">زجاج جانبي : </div>
                      <div className="value">شفاف ابيض</div>
                    </li>
                    <li>
                      <div className="title">زجاج يسار : </div>
                      <div className="value">شفاف ملون</div>
                    </li>
                  </ul>
                </li>
                <li>
                  <div className="header">
                    <h6>نانو زجاج شباك</h6>
                    <span className="price gradient-text">200 ريال</span>
                  </div>
                  <ul>
                    <li>
                      <div className="title">عازل ٨ متر :</div>
                      <div className="value">شفاف اسود ٢٠٪</div>
                    </li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
          <div className="details-box">
            <div className="title">
              <div className="icon">
                <i className="fa-solid fa-money-check-dollar gradient-icon"></i>
              </div>
              <span>{t("orders.totalCost")}</span>
            </div>
            <div className="menu checkout-details">
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
          </div>
        </div>
        {step === 1 && (
          <div className="btn-wrapper">
            <span className="custom-btn">
              <span>{t("orders.cancelOrder")}</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderDetails;
