import { Tab, Tabs } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import AboutTab from "./AboutTab";
import ProductsTab from "./ProductsTab";
import RatesTab from "./RatesTab";
import useMarketRates from "../markets/useMarketRates";

function MarketTabs({ market }) {
  const { t } = useTranslation();
  const { isLoading: ratesLoading, data: rates } = useMarketRates();

  return (
    <div className="tabs-section">
      <Tabs defaultActiveKey="aboutMarket" id="uncontrolled-tab-example">
        <Tab eventKey="aboutMarket" title={t("markets.aboutMarket")}>
          <AboutTab market={market} />
        </Tab>

        <Tab eventKey="products" title={t("markets.products")}>
          <ProductsTab market={market} />
        </Tab>

        <Tab
          eventKey="rates"
          title={`${t("markets.rates")} ${
            rates?.total ? "( " + rates?.total + " )" : ""
          }`}
        >
          <RatesTab market={market} rates={rates} ratesLoading={ratesLoading} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default MarketTabs;

/*
<Tabs defaultActiveKey="aboutMarket" id="uncontrolled-tab-example">
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

                  {productsLoading ? (
                    <DataLoader minHeight="200px" />
                  ) : products?.data && products?.data?.length > 0 ? (
                    products?.data?.map((product) => (
                      <div className="products-wrapper" key={product?.id}>
                        <div className="col-lg-4 col-md-6 col-12 p-2">
                          <ProductMiniCard product={product} />
                        </div>
                      </div>
                    ))
                  ) : (
                    <EmptyData minHeight={"300px"}>
                      {t("markets.noSectionProducts")}
                    </EmptyData>
                  )}
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
                    <h3>{market?.data?.name}</h3>
                    <div className="statistic">
                      <i className="fa-regular fa-eye gradient-icon"></i>
                      <span className="value">{market?.data?.views_count}</span>
                    </div>
                  </div>
                  <p>{market?.data?.bio}</p>
                </div>
                <div className="details-box">
                  <div className="title">
                    <span>
                      {t(
                        `markets.${
                          market?.data?.refund_duration > 0
                            ? "acceptsRecovery"
                            : "doesnotAcceptsRecovery"
                        }`
                      )}
                    </span>
                  </div>
                  {market?.data?.have_refund ? (
                    <div className="menu">
                      <ul>
                        <li>{t("markets.recoveryCondition1")}</li>
                        <li>
                          {t("markets.recoveryCondition2")}{" "}
                          {market?.data?.refund_duration}{" "}
                          {t(
                            `${
                              market?.data?.refund_duration > 1 &&
                              market?.data?.refund_duration < 10
                                ? "days"
                                : "day"
                            }`
                          )}
                        </li>
                      </ul>
                    </div>
                  ) : null}
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
                    <span>
                      {t(
                        `markets.${
                          market?.data?.delivery
                            ? "deliveryExisting"
                            : "noDeliveryExisting"
                        }`
                      )}
                    </span>
                  </div>
                </div>
                <div className="details-box">
                  <div className="title">
                    <div className="icon">
                      <i className="fa-sharp fa-solid fa-location-dot gradient-icon"></i>
                    </div>
                    <span>{market?.data?.address}</span>
                  </div>
                  <LoadScript googleMapsApiKey="AIzaSyD_N1k4WKCdiZqCIjjgO0aaKz1Y19JqYqw">
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={{
                        lat: market?.data?.lat,
                        lng: market?.data?.lng,
                      }}
                      zoom={10}
                    >
                      <Marker
                        icon={mapPin}
                        position={{
                          lat: market?.data?.lat,
                          lng: market?.data?.lng,
                        }}
                      ></Marker>
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
                    <Link
                      target="_blank"
                      to={`https://wa.me/${market?.data?.whatsapp}`}
                      className="contact-link"
                    >
                      <img src={whatsAppLogo} alt="WhatsApp" />
                    </Link>
                    <Link
                      target="_blank"
                      to={`mailto:${market?.data?.email}`}
                      className="contact-link"
                    >
                      <i
                        className="fa-regular fa-envelope gradient-icon"
                        style={{ fontSize: "32px" }}
                      ></i>
                    </Link>
                    <Link
                      target="_blank"
                      to={market?.data?.instagram}
                      className="contact-link"
                    >
                      <img src={instagramLogo} alt="Instagram" />
                    </Link>
                    <Link
                      target="_blank"
                      to={`tel:+966${market?.data?.phone}`}
                      className="contact-link"
                    >
                      <i className="fa-regular fa-phone gradient-icon"></i>
                      <span>+966{market?.data?.phone}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Tab>
          <Tab
            eventKey="rates"
            title={`${t("markets.rates")} ${
              rates?.total ? "( " + rates?.total + " )" : ""
            }`}
          >
            <div className="content-wrapper container col-lg-10 col-12">
              {ratesLoading ? (
                <DataLoader minHeight={"300px"} />
              ) : rates?.data && rates?.data?.length > 0 ? (
                <>
                  <div className="rates-wrapper">
                    {rates?.data?.map((rate) => (
                      <RateCard
                        setTargetedComment={setTargetedComment}
                        key={rate?._id}
                        rate={rate}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <EmptyData minHeight={"300px"}>
                  {t("markets.noRates")}
                </EmptyData>
              )}
              <CreateComment
                comment={targetedComment}
                setTargetedComment={setTargetedComment}
              />
            </div>
          </Tab>
        </Tabs>

*/
