import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dropdown, Tab, Tabs } from "react-bootstrap";
import ProductMiniCard from "../ui/cards/ProductMiniCard";
import { Link, useNavigate } from "react-router-dom";
import whatsAppLogo from "../assets/images/whatsapp-icon.svg";
import instagramLogo from "../assets/images/instagram-icon.svg";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import mapPin from "../assets/images/mapPin.svg";
import RateCard from "../ui/cards/RateCard";
import CreateComment from "../ui/CreateComment";
import useMarketSections from "../features/markets/useMarketSections";
import useMarketDetails from "../features/markets/useMarketDetails.js";
import DataLoader from "../ui/DataLoader";
import EmptyData from "../ui/EmptyData";

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
  const { isLoading: sectionLoading, data: sections } = useMarketSections();
  const { isLoading: marketLoading, data: market } = useMarketDetails();
  const [isFollowing, setIsFollowing] = useState(false);
  const [productsCategory, setProductsCategory] = useState();
  const [targetedComment, setTargetedComment] = useState("");
  const navigate = useNavigate();

  console.log(market?.data);

  return marketLoading ? (
    <DataLoader minHeight="200px" />
  ) : (
    <div className="market-details-page ">
      <div className="page-header">
        <div className="cover-wrapper">
          <img src={market?.data?.banner} alt="market cover image" />
        </div>
        <div className="top-wrapper">
          <div className="btns-wrapper">
            <span className="btn-box back" onClick={() => navigate(-1)}>
              <i className="fa-regular fa-arrow-right"></i>
            </span>
          </div>
          <div className="logo-follow-wrapper">
            <div className="logo-wrapper">
              <img src={market?.data?.logo} alt="market logo image" />
            </div>

            <div className="action-boxes">
              <span
                className="action-btn follow"
                onClick={() => setIsFollowing(!isFollowing)}
              >
                <i
                  className={`fa-regular fa-user-${
                    isFollowing ? "check" : "plus"
                  }`}
                ></i>
                {isFollowing ? t("following") : t("follow")}
              </span>
            </div>
          </div>
          <div className="btns-wrapper">
            <span className="btn-box share">
              <i className="fa-sharp fa-solid fa-share-nodes"></i>
            </span>
            <Dropdown className="">
              <Dropdown.Toggle className="btn-box butn" id="dropdown-basic">
                <i className="fa-regular fa-ellipsis-vertical"></i>
                {/* <i class="fa-regular fa-circle-ellipsis-vertical"></i> */}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/profile">
                  {t("report")}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="info-wrapper">
          <h3>{market?.data?.name}</h3>
          <p>{market?.data?.bio}</p>
        </div>
      </div>
      <section className="tabs-section">
        <Tabs defaultActiveKey="products" id="uncontrolled-tab-example">
          <Tab eventKey="products" title={t("markets.products")}>
            <div className="content-wrapper container col-lg-10 col-12">
              {sectionLoading ? (
                <DataLoader minHeight="200px" />
              ) : sections?.data && sections?.data?.length > 0 ? (
                <>
                  <div className="filter-wrapper">
                    <h5 className="filter-heading">
                      {t("categories.categories")}
                    </h5>
                    <ul className="filter-list">
                      {sections?.data?.map((section) => (
                        <li
                          className={`filter-item ${
                            productsCategory === section?.id ? "active" : ""
                          }`}
                          key={section?.id}
                          onClick={() => setProductsCategory(section?.id)}
                        >
                          {section?.name}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="products-wrapper">
                    <ProductMiniCard discount={true} />
                    <ProductMiniCard />
                    <ProductMiniCard newest={true} discount={true} />
                  </div>
                </>
              ) : (
                <EmptyData minHeight={"300px"}>
                  {t("markets.noProducts")}
                </EmptyData>
              )}
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
                      <i className="fa-regular fa-globe"></i>
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
              <div className="rates-wrapper">
                <RateCard setTargetedComment={setTargetedComment} />
                <RateCard setTargetedComment={setTargetedComment} />
              </div>
              <CreateComment
                comment={targetedComment}
                setTargetedComment={setTargetedComment}
              />
            </div>
          </Tab>
        </Tabs>
      </section>
    </div>
  );
}

export default MarketDetails;
