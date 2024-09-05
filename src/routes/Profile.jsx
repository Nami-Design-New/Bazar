import { Tab, Tabs } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import avatarPlaceholder from "../assets/images/avatar-placeholder-2.svg";
import SectionHeader from "../ui/layout/SectionHeader";
import ADMiniCard from "../ui/cards/ADMiniCard";
import OrderMiniCard from "../ui/cards/OrderMiniCard";
import { Link } from "react-router-dom";
import { IconCirclePlus } from "@tabler/icons-react";
import { useState } from "react";

function Profile() {
  const { t } = useTranslation();
  const [isValVerified, setIsValVerified] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <section className="profile-page profile">
      <SectionHeader />
      <div className="content-wrapper container col-lg-10 col-12">
        <div className="row">
          <div className="userInfo">
            <div className="top-wrapper">
              <div className="user-avatar-wrapper">
                <img className="userImg" src={avatarPlaceholder} alt="" />
                <div className="verified-badge">
                  <i className="fa-solid fa-badge-check"></i>
                </div>
              </div>
              <div className="userName">
                <h4 className="name"> Ahmed Abdelghany </h4>
                <div className="userDetails">
                  <span className="details-box phone">
                    <i className="fa-regular fa-phone gradient-icon"></i>
                    +1 0123456789{" "}
                  </span>
                  <span className="details-box location">
                    <i className="fa-sharp fa-solid fa-location-dot gradient-icon"></i>
                    السعودية, الرياض
                  </span>
                </div>
                <div className="verification-details">
                  <span className="verification-item">
                    <i className="fa-regular fa-memo-circle-check gradient-icon"></i>
                    {t("profile.verifiedVal")}
                  </span>
                </div>
              </div>
              <div className="action-boxes">
                <div className="following-details">
                  <div className="details-box">
                    <span className="value gradient-text"> 100 </span>
                    <span className="title">{t("profile.followings")}</span>
                  </div>
                  <div className="details-box">
                    <span className="value gradient-text"> 200 </span>
                    <span className="title">{t("profile.followers")}</span>
                  </div>
                </div>
                <div className="actions-wrapper">
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
                      className={`fa-regular fa-user-${
                        isAdded ? "check" : "plus"
                      }`}
                    ></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="tabs-section">
            <Tabs
              className="profileNavCol col-md-5 col-lg-4 col-xl-3 p-2"
              defaultActiveKey="ads"
              id="uncontrolled-tab-example"
            >
              {/* ADs */}
              <Tab
                eventKey="ads"
                title={t("profile.ads")}
                className="tab_item p-2"
              >
                <div className="w-100 btn-wrapper d-flex justify-content-end mb-3 p-2">
                  <Link to="/add-ad" className="custom-btn stroke">
                    <span>
                      <IconCirclePlus stroke={2} /> {t("ads.addAD")}
                    </span>
                  </Link>
                </div>
                <div className="col-lg-6 col-12 p-3">
                  <ADMiniCard />
                </div>
                <div className="col-lg-6 col-12 p-3">
                  <ADMiniCard />
                </div>
                <div className="col-lg-6 col-12 p-3">
                  <ADMiniCard />
                </div>
              </Tab>
              {/* Orders */}
              <Tab
                eventKey="orders"
                title={t("profile.orders")}
                className="tab_item p-2"
              >
                <div className="w-100 btn-wrapper d-flex justify-content-end mb-3 p-2">
                  <Link to="/add-order" className="custom-btn stroke">
                    <span>
                      <IconCirclePlus stroke={2} /> {t("orders.addOrder")}
                    </span>
                  </Link>
                </div>
                <div className="col-lg-6 col-12 p-3">
                  <OrderMiniCard />
                </div>
                <div className="col-lg-6 col-12 p-3">
                  <OrderMiniCard />
                </div>
                <div className="col-lg-6 col-12 p-3">
                  <OrderMiniCard />
                </div>
              </Tab>
              {/* Verifications */}
              <Tab
                eventKey="verifications"
                title={t("profile.verifications")}
                className="tab_item p-2"
              >
                <div className="profile-verification-wrapper">
                  <h6>{t("profile.verificationHeading")}</h6>
                  <div className="verification-box">
                    <div className="box-info">
                      <div className="icon-box">
                        <i className="fa-solid fa-shield-check"></i>
                      </div>
                      <h5>{t("profile.verifyWithAbsher")}</h5>
                    </div>
                    <div className="btn-wrapper">
                      <Link
                        to="/absher-verification"
                        className="btn-box custom-btn filled"
                      >
                        <span>{t("profile.verify")}</span>
                      </Link>
                    </div>
                  </div>
                  <div className="verification-box">
                    <div className="box-info">
                      <div className="icon-box">
                        <i className="fa-regular fa-box-circle-check"></i>
                      </div>
                      <h5>{t("profile.commercialVerification")}</h5>
                    </div>
                    <div className="btn-wrapper">
                      <Link
                        to="/commercial-verification"
                        className="btn-box custom-btn filled"
                      >
                        <span>{t("profile.subscribe")}</span>
                      </Link>
                    </div>
                  </div>
                  <div className="verification-box">
                    <div className="box-info">
                      <div className="icon-box">
                        <i className="fa-regular fa-memo-circle-check"></i>
                      </div>
                      <h5>{t("profile.valVerification")}</h5>
                    </div>
                    <div className="btn-wrapper">
                      {isValVerified ? (
                        <div className="btn-box custom-btn filled">
                          <span>{t(`profile.verified`)}</span>
                        </div>
                      ) : (
                        <Link
                          to="/val-verification"
                          className="btn-box custom-btn filled"
                        >
                          <span>
                            {isValVerified && (
                              <i className="fa-solid fa-check-double"></i>
                            )}
                            {t(`profile.verify`)}
                          </span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
