import marketLogoImage from "../assets/images/market-logo-1.jpg";
import marketCoverImage from "../assets/images/market-cover-1.png";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Tab, Tabs } from "react-bootstrap";
import ProductMiniCard from "../ui/cards/ProductMiniCard";
import { Link } from "react-router-dom";
import whatsAppLogo from "../assets/images/whatsapp-icon.svg";
import instagramLogo from "../assets/images/instagram-icon.svg";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import mapPin from "../assets/images/mapPin.svg";
import RateScale from "../ui/form-elements/RateScale";
import SubmitButton from "../ui/form-elements/SubmitButton";
import TextField from "../ui/form-elements/TextField";

const containerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "12px",
  overflow: "hidden",
};

const position = {
  lat: 24.7136,
  lng: 46.6753,
};

function MarketDetails() {
  const { t } = useTranslation();
  const [isAdded, setIsAdded] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [productsCategory, setProductsCategory] = useState("all");
  const [formData, setFormData] = useState({
    rate: 0,
    comment: "",
  });
  const [commentLoading, setCommentLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRatingChange = (rate) => {
    setFormData({
      ...formData,
      rate,
    });
  };

  return (
    <div className="market-details-page no-padding">
      <div className="page-header">
        <div className="cover-wrapper">
          <img src={marketCoverImage} alt="market cover image" />
        </div>
        <div className="top-wrapper">
          <div className="btns-wrapper">
            <span className="btn-box back">
              <i className="fa-regular fa-arrow-right"></i>
            </span>
          </div>
          <div className="logo-follow-wrapper">
            <div className="logo-wrapper">
              <img src={marketLogoImage} alt="market logo image" />
            </div>

            <div className="action-boxes">
              <span
                className="action-btn follow"
                onClick={() => setIsFollowing(!isFollowing)}
              >
                {isFollowing ? t("following") : t("follow")}
              </span>
              <span
                className="action-btn add"
                onClick={() => setIsAdded(!isAdded)}
              >
                <i
                  className={`fa-regular fa-user-${isAdded ? "check" : "plus"}`}
                ></i>
              </span>
            </div>
          </div>
          <div className="btns-wrapper">
            <span className="btn-box share">
              <i className="fa-sharp fa-solid fa-share-nodes"></i>
            </span>
          </div>
        </div>
        <div className="info-wrapper">
          <h3>متجر كرفور</h3>
          <p>
            الجروب مخصص فقط لكل ما يخص اعمال النجاره مثل الموبيليات و الديكور و
            الباب و الشباك
          </p>
        </div>
      </div>
      <section className="tabs-section">
        <Tabs defaultActiveKey="rates" id="uncontrolled-tab-example">
          <Tab eventKey="products" title={t("markets.products")}>
            <div className="content-wrapper container col-lg-10 col-12">
              <div className="filter-wrapper">
                <h5 className="filter-heading">{t("categories.categories")}</h5>
                <ul className="filter-list">
                  <li
                    className={`filter-item ${
                      productsCategory === "all" ? "active" : ""
                    }`}
                    onClick={() => setProductsCategory("all")}
                  >
                    {t("categories.all")}
                  </li>
                  <li
                    className={`filter-item ${
                      productsCategory === "food" ? "active" : ""
                    }`}
                    onClick={() => setProductsCategory("food")}
                  >
                    {t("categories.food")}
                  </li>
                  <li
                    className={`filter-item ${
                      productsCategory === "clothes" ? "active" : ""
                    }`}
                    onClick={() => setProductsCategory("clothes")}
                  >
                    {t("categories.clothes")}
                  </li>
                  <li
                    className={`filter-item ${
                      productsCategory === "painting" ? "active" : ""
                    }`}
                    onClick={() => setProductsCategory("painting")}
                  >
                    {t("categories.paintingProducts")}
                  </li>
                  <li
                    className={`filter-item ${
                      productsCategory === "electronics"
                        ? "active"
                        : "electronics"
                    }`}
                    onClick={() => setProductsCategory("")}
                  >
                    {t("categories.electronics")}
                  </li>
                  <li
                    className={`filter-item ${
                      productsCategory === "carpentry" ? "active" : ""
                    }`}
                    onClick={() => setProductsCategory("carpentry")}
                  >
                    {t("categories.carpentryTools")}
                  </li>
                </ul>
              </div>

              <div className="products-wrapper">
                <ProductMiniCard discount={true} />
                <ProductMiniCard />
                <ProductMiniCard newest={true} discount={true} />
              </div>
            </div>
          </Tab>
          <Tab eventKey="aboutMarket" title={t("markets.aboutMarket")}>
            <div className="content-wrapper container col-lg-10 col-12">
              <div className="details-wrapper">
                <div className="details-header">
                  <div className="heading">
                    <h3>أكثر من 1000 منتج سعودي بأقل الأسعار</h3>
                    <div className="statistic">
                      <i className="fa-regular fa-eye gradient-icon"></i>
                      <span className="value">22 {t("thousand")}</span>
                    </div>
                  </div>
                  <p>
                    تسوق عبر الإنترنت عروض كارفور - اشتر البقالة والإلكترونيات
                    والتلفزيون والهواتف المحمولة على تطبيق كارفور - استمتع
                    بالشحن
                  </p>
                </div>
                <div className="details-box">
                  <div className="title">
                    <span>{t("markets.acceptsRecovery")}</span>
                  </div>
                  <div className="menu">
                    <ul>
                      <li>{t("markets.recoveryCondition1")}</li>
                      <li>{t("markets.recoveryCondition2")}</li>
                    </ul>
                  </div>
                </div>
                <div className="details-box">
                  <div className="title">
                    <div className="icon">
                      <i className="fa-solid fa-id-card gradient-icon"></i>
                    </div>
                    <span>
                      {t("markets.identity")}{" "}
                      <span className="gradient-text">24232525</span>
                    </span>
                  </div>
                </div>
                <div className="details-box">
                  <div className="title">
                    <div className="icon">
                      <i
                        className={`fa-regular fa-truck-container gradient-icon `}
                      ></i>
                    </div>
                    <span>{t("markets.deliveryExisting")}</span>
                  </div>
                </div>
                <div className="details-box">
                  <div className="title">
                    <div className="icon">
                      <i className="fa-sharp fa-solid fa-location-dot gradient-icon"></i>
                    </div>
                    <span>الرياض - المنطقة الشمالية</span>
                  </div>
                  <LoadScript googleMapsApiKey="AIzaSyD_N1k4WKCdiZqCIjjgO0aaKz1Y19JqYqw">
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={position}
                      zoom={10}
                    >
                      <Marker icon={mapPin} position={position}></Marker>
                    </GoogleMap>
                  </LoadScript>
                </div>
                <div className="details-box">
                  <div className="title">
                    <span>{t("markets.workTimes")}</span>
                  </div>
                  <div className="sub-title">
                    من الساعه 12 صباحا حتي الساعه 11 مساء
                  </div>
                </div>
                <div className="details-box">
                  <div className="title">
                    <span>{t("markets.contactWithMarket")}</span>
                  </div>
                  <div className="contact-wrapper">
                    <Link target="_blank" to="" className="contact-link">
                      <img src={whatsAppLogo} alt="WhatsApp" />
                    </Link>
                    <Link target="_blank" to="" className="contact-link">
                      <img src={instagramLogo} alt="Instagram" />
                    </Link>
                    <Link target="_blank" to="" className="contact-link">
                      <i className="fa-regular fa-phone gradient-icon"></i>
                      <span>+9023423424</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey="rates" title={t("markets.rates")}>
            <div className="content-wrapper container col-lg-10 col-12">
              <form action="" className="rate-form">
                <TextField
                  name="comment"
                  id="comment"
                  value={formData?.comment}
                  onChange={(e) => handleChange(e)}
                  placeholder={t("shareYourComment")}
                />
                <div className="btn-rate-wrapper">
                  <SubmitButton
                    loading={commentLoading}
                    name={t("publishRate")}
                  />
                  <RateScale
                    rate={formData?.rate}
                    handleRatingChange={handleRatingChange}
                  />
                </div>
              </form>
            </div>
          </Tab>
        </Tabs>
      </section>
    </div>
  );
}

export default MarketDetails;
