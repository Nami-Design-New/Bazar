import { IconCirclePlus } from "@tabler/icons-react";
import { Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import useUserAds from "../ads/useUserAds";
import useUserOrders from "../orders/useUserOrders.js";
import { useTranslation } from "react-i18next";
import DataLoader from "../../ui/DataLoader";
import FavoriteADCard from "../../ui/cards/FavoriteADCard";
import EmptyData from "../../ui/EmptyData";
import { subscriptionRemainingDays } from "../../utils/helpers";
import OrderCard from "../../ui/cards/OrderCard.jsx";
import InterestMiniCard from "../../ui/cards/InterestMiniCard.jsx";
import useUserInterests from "../interests/useUserInterests.js";

function ProfileTabs({ user, isMyAccount }) {
  const { t } = useTranslation();
  const { isLoading: adsLoading, data: ads } = useUserAds(user?.id);
  const { isLoading: ordersLoading, data: orders } = useUserOrders(user?.id);
  const { isLoading: interestsLoading, data: interests } = useUserInterests(
    user?.id
  );

  return (
    <div className="tabs-section">
      <Tabs
        className="profileNavCol col-md-5 col-lg-4 col-xl-3 p-2"
        defaultActiveKey="ads"
        id="uncontrolled-tab-example"
      >
        {/* ADs */}
        <Tab eventKey="ads" title={t("profile.ads")} className="tab_item p-2">
          <>
            {isMyAccount && (
              <div className="w-100 btn-wrapper d-flex justify-content-end mb-3 p-2">
                <Link to="/add-ad" className="custom-btn stroke">
                  <span>
                    <IconCirclePlus stroke={2} /> {t("ads.addAD")}
                  </span>
                </Link>
              </div>
            )}
            {adsLoading ? (
              <DataLoader minHeight="200px" />
            ) : ads?.data && ads?.data?.length > 0 ? (
              ads?.data?.map((ad) => (
                <div className="col-lg-6 col-12 p-3" key={ad?.id}>
                  <FavoriteADCard ad={ad} isMyAccount={isMyAccount} />
                </div>
              ))
            ) : (
              <EmptyData minHeight={"300px"}>{t("profile.noAds")}</EmptyData>
            )}
          </>
        </Tab>
        {/* Orders */}
        {isMyAccount && (
          <Tab
            eventKey="orders"
            title={t("profile.orders")}
            className="tab_item p-2"
          >
            {ordersLoading ? (
              <DataLoader minHeight="200px" />
            ) : orders?.data && orders?.data?.length > 0 ? (
              orders?.data?.map((order) => (
                <div className="col-lg-6 col-12 p-3" key={order?.id}>
                  <OrderCard order={order} isMyAccount={isMyAccount} />
                </div>
              ))
            ) : (
              <EmptyData minHeight={"300px"}>{t("profile.noOrders")}</EmptyData>
            )}
          </Tab>
        )}
        {/* Interests */}
        {isMyAccount && (
          <Tab
            eventKey="interests"
            title={t("profile.interests")}
            className="tab_item p-2"
          >
            {interestsLoading ? (
              <DataLoader minHeight="200px" />
            ) : interests?.data && interests?.data?.length > 0 ? (
              interests?.data?.map((interest) => (
                <div className="col-lg-6 col-12 p-3" key={interest?.id}>
                  <InterestMiniCard
                    interest={interest}
                    isMyAccount={isMyAccount}
                  />
                </div>
              ))
            ) : (
              <EmptyData minHeight={"300px"}>{t("profile.noOrders")}</EmptyData>
            )}
          </Tab>
        )}
        {/* Verifications */}
        <Tab
          eventKey="verifications"
          title={t("profile.verifications")}
          className="tab_item p-2"
        >
          <div className="profile-verification-wrapper">
            <ul className="hint-wrapper mx-3">
              <h5>{t("profile.verificationBenifints")}:</h5>
              <li className="px-3">{t("profile.verififcationHint1")}</li>
              <li className="px-3">{t("profile.verififcationHint2")}</li>
              <li className="px-3">{t("profile.verififcationHint3")}</li>
            </ul>
            <div className="verification-box">
              <div className="box-info">
                <div className="icon-box">
                  <i className="fa-solid fa-shield-check"></i>
                </div>
                <h5>{t("profile.verifyWithApp")}</h5>
              </div>
              <div className="btn-wrapper">
                {user?.verified ? (
                  <div className="btn-box custom-btn filled">
                    <span>
                      <i className="fa-solid fa-check-double"></i>
                      {t(`profile.verified`)}
                    </span>
                  </div>
                ) : isMyAccount ? (
                  <Link
                    to="/app-verification"
                    className="btn-box custom-btn filled"
                  >
                    <span>{t(`profile.verify`)}</span>
                  </Link>
                ) : (
                  <div className="btn-box custom-btn filled">
                    <span>{t(`profile.notVerified`)}</span>
                  </div>
                )}
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
                {subscriptionRemainingDays(user?.end_date) > 0 ? (
                  <div className="btn-box custom-btn filled">
                    <span>
                      <i className="fa-solid fa-check-double"></i>
                      {t(`profile.subscribed`)}
                    </span>
                  </div>
                ) : isMyAccount ? (
                  user?.end_date ? (
                    <Link
                      to="/commercial-verification"
                      className="btn-box custom-btn filled"
                    >
                      <span>{t(`profile.renewSubscribe`)}</span>
                    </Link>
                  ) : (
                    <Link
                      to="/commercial-verification"
                      className="btn-box custom-btn filled"
                    >
                      <span>{t(`profile.subscribe`)}</span>
                    </Link>
                  )
                ) : (
                  <div className="btn-box custom-btn filled">
                    <span>{t(`profile.notSubscribed`)}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="verification-box">
              <div className="box-info">
                <div className="icon-box">
                  <i className="fa-regular fa-memo-circle-check"></i>
                </div>
                <h5>{t("profile.falVerification")}</h5>
              </div>
              <div className="btn-wrapper">
                {user?.fal_verified ? (
                  <div className="btn-box custom-btn filled">
                    <span>
                      <i className="fa-solid fa-check-double"></i>
                      {t(`profile.verified`)}
                    </span>
                  </div>
                ) : isMyAccount ? (
                  <Link
                    to="/fal-verification"
                    className="btn-box custom-btn filled"
                  >
                    <span>{t(`profile.verify`)}</span>
                  </Link>
                ) : (
                  <div className="btn-box custom-btn filled">
                    <span>{t(`profile.notVerified`)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Tab>

        {/* reward */}
        {isMyAccount && (
          <Tab
            eventKey="rewards"
            title={t("profile.rewards")}
            className="tab_item p-2"
          >
            {ordersLoading ? (
              <DataLoader minHeight="200px" />
            ) : ads?.data && ads?.data?.length > 0 ? (
              ads?.data?.map((ad) => (
                <div className="col-lg-6 col-12 p-3" key={ad?.id}>
                  <FavoriteADCard ad={ad} isMyAccount={isMyAccount} />
                </div>
              ))
            ) : (
              <EmptyData minHeight={"300px"}>{t("profile.noAds")}</EmptyData>
            )}
          </Tab>
        )}
      </Tabs>
    </div>
  );
}

export default ProfileTabs;
