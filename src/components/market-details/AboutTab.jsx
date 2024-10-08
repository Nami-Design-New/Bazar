import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "12px",
  overflow: "hidden",
};

function AboutTab({ market, type }) {
  const { t } = useTranslation();

  return (
    <div className="content-wrapper">
      <div className="details-wrapper">
        <div className="details-header">
          <div className="heading">
            {market?.data?.name ? <h3>{market?.data?.name}</h3> : null}
            {type === "coupon" ? null : (
              <div className="statistic">
                <i className="fa-regular fa-eye "></i>
                <span className="value">{market?.data?.views_count}</span>
              </div>
            )}
          </div>
          {market?.data?.bio ? <p>{market?.data?.bio}</p> : null}
        </div>
        <div className="details-box " style={{ gap: "16px" }}>
          {/* <div className="title">
            <span>{t("markets.contactWithMarket")}</span>
          </div> */}
          <div className="contact-wrapper">
            {market?.data?.whatsapp ? (
              <Link
                target="_blank"
                to={`https://wa.me/${market?.data?.whatsapp}`}
                className="contact-link"
              >
                <i className="fa-brands fa-whatsapp "></i>
              </Link>
            ) : null}
            {market?.data?.email ? (
              <Link
                target="_blank"
                to={`mailto:${market?.data?.email}`}
                className="contact-link"
              >
                <i className="fa-regular fa-envelope "></i>
              </Link>
            ) : null}
            {market?.data?.instagram ? (
              <Link
                target="_blank"
                to={market?.data?.instagram}
                className="contact-link"
              >
                <i className="fa-brands fa-instagram "></i>
              </Link>
            ) : null}
            {market?.data?.phone ? (
              <Link
                target="_blank"
                to={`tel:+966${market?.data?.phone}`}
                className="contact-link"
              >
                <i className="fa-regular fa-phone "></i>
              </Link>
            ) : null}
            {market?.data?.website ? (
              <Link
                target="_blank"
                to={market?.data?.website}
                className="contact-link"
                style={{
                  width: "unset !important",
                  aspectRatio: "unset !important",
                  height: "40px",
                  padding: "8px 16px",
                }}
              >
                <i className="fa-regular fa-globe"></i>
                <span style={{ fontSize: "14px" }}>
                  {t("markets.visitWebsite")}
                </span>
              </Link>
            ) : null}
          </div>
        </div>
        {type === "coupon" ? null : (
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
        )}
        {market?.data?.identity_id ? (
          <div className="details-box">
            <div className="title">
              <div className="icon">
                <i className="fa-regular fa-id-card "></i>
              </div>
              <span>
                {t("markets.identity")}{" "}
                <span className="">{market?.data?.identity_id}</span>
              </span>
            </div>
          </div>
        ) : null}
        {type === "coupon" ? null : (
          <div className="details-box">
            <div className="title">
              <div className="icon">
                <i className={`fa-regular fa-truck-container  `}></i>
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
        )}

        <div className="details-box">
          {market?.data?.address ? (
            <div className="title mb-3">
              <div className="icon">
                <i className="fa-sharp fa-solid fa-location-dot "></i>
              </div>
              <span>{market?.data?.address}</span>
            </div>
          ) : null}
          {market?.data?.lat && market?.data?.lng ? (
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
                  icon="/images/map-pin.svg"
                  position={{
                    lat: market?.data?.lat,
                    lng: market?.data?.lng,
                  }}
                ></Marker>
              </GoogleMap>
            </LoadScript>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default AboutTab;
