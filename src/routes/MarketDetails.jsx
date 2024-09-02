import marketLogoImage from "../assets/images/market-logo-1.jpg";
import marketCoverImage from "../assets/images/market-cover-1.png";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dropdown, Tab, Tabs } from "react-bootstrap";
function MarketDetails() {
  const { t } = useTranslation();
  const [isAdded, setIsAdded] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

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
            <Dropdown style={{ position: "relative" }}>
              <Dropdown.Toggle className="btn-box menu" id="dropdown-basic">
                <i className="fa-regular fa-circle-ellipsis-vertical"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu lang-menu">
                <Dropdown.Item></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <span className="btn-box share">
              <i className="fa-sharp fa-solid fa-share-nodes"></i>
            </span>
            <span className="btn-box shopping">
              <i className="fa-regular fa-cart-shopping"></i>
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
        <Tabs defaultActiveKey="products" id="uncontrolled-tab-example">
          <Tab eventKey="products" title={t("markets.products")}>
            <div className="content-wrapper container">products</div>
          </Tab>
          <Tab eventKey="aboutMarket" title={t("markets.aboutMarket")}>
            <div className="content-wrapper container">about market</div>
          </Tab>
          <Tab eventKey="rates" title={t("markets.rates")}>
            <div className="content-wrapper container">rates</div>
          </Tab>
        </Tabs>
      </section>
    </div>
  );
}

export default MarketDetails;
