import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import mapPin from "../../assets/images/map-pin.svg";
import whatsAppLogo from "../../assets/images/whatsapp-icon.svg";
import instagramLogo from "../../assets/images/instagram-icon.svg";

const containerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "12px",
  overflow: "hidden",
};

function AboutTab({ market }) {
  const { t } = useTranslation();

  return (
    <div className="content-wrapper">
      <div className="details-wrapper">
        <div className="details-header">
          <div className="heading">
            <h3>{market?.data?.name}</h3>
            <div className="statistic">
              <i className="fa-regular fa-eye "></i>
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
              <i className="fa-solid fa-id-card "></i>
            </div>
            <span>
              {t("markets.identity")} <span className="">24232525</span>
            </span>
          </div>
        </div>
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
        <div className="details-box">
          <div className="title">
            <div className="icon">
              <i className="fa-sharp fa-solid fa-location-dot "></i>
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
                className="fa-regular fa-envelope "
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
              <i className="fa-regular fa-phone "></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutTab;
