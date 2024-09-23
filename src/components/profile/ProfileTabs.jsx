import { useState } from "react";
import { IconCirclePlus } from "@tabler/icons-react";
import { Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { subscriptionRemainingDays } from "../../utils/helpers";
import DataLoader from "../../ui/DataLoader";
import EmptyData from "../../ui/EmptyData";
import OrderCard from "../../ui/cards/OrderCard.jsx";
import InterestMiniCard from "../../ui/cards/InterestMiniCard.jsx";
import useUserAds from "./../../hooks/ads/useUserAds";
import useUserOrders from "./../../hooks/orders/useUserOrders";
import useUserInterests from "./../../hooks/profile/useUserInterests";
import useUserRewards from "./../../hooks/profile/useUserRewards";
import useGetSettings from "./../../hooks/settings/useGetSettings";
import Transactions from "./../../ui/layout/Transactions";
import ChargeModal from "./../../ui/modals/ChargeModal";
import WithdrawModal from "./../../ui/modals/WithdrawModal";
import Post from "../../ui/cards/Post.jsx";
import useGetAddresses from "../../hooks/profile/useGetAddresses.js";
import AddressCard from "../../ui/cards/AddressCard.jsx";
import AddAddress from "../addresses/AddAddress.jsx";

function ProfileTabs({ user, isMyAccount }) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [targetAddress, setTargetAddress] = useState(null);
  const { isLoading: adsLoading, data: ads } = useUserAds(user?.id);
  const { isLoading: ordersLoading, data: orders } = useUserOrders(user?.id);
  const { isLoading: rewardsLoading, data: rewards } = useUserRewards(user?.id);
  const { isLoading: settingsLoading, data: settings } = useGetSettings();
  const { isLoading: interestsLoading, data: interests } = useUserInterests(
    user?.id
  );
  const { isLoading: addressesLoading, data: addresses } = useGetAddresses(
    user?.id
  );

  const [showChargeModel, setShowChargeModel] = useState(false);
  const [showWithdrawModel, setShowWithdrawModel] = useState(false);

  const hasReward =
    rewards?.data && rewards?.data?.length > 0
      ? rewards?.data?.some((reward) => reward?.rewarded)
      : false;

  return (
    <div className="col-12 p-2">
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
            className="tab_item p-2 pt-0"
          >
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
                <DataLoader minHeight="400px" />
              ) : ads?.data && ads?.data?.length > 0 ? (
                ads?.data?.map((ad) => (
                  <div className="col-lg-4 col-md-6 col-12 p-2" key={ad?.id}>
                    <Post
                      userId={user?.id}
                      post={ad}
                      isMyAccount={isMyAccount}
                    />
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
              className="tab_item p-2 pt-0"
            >
              {ordersLoading ? (
                <DataLoader minHeight="400px" />
              ) : orders?.data && orders?.data?.length > 0 ? (
                orders?.data?.map((order) => (
                  <div className="col-lg-6 col-12 p-2" key={order?.id}>
                    <OrderCard order={order} isMyAccount={isMyAccount} />
                  </div>
                ))
              ) : (
                <EmptyData minHeight={"300px"}>
                  {t("profile.noOrders")}
                </EmptyData>
              )}
            </Tab>
          )}

          {/* Interests */}
          {isMyAccount && (
            <Tab
              eventKey="interests"
              title={t("profile.interests")}
              className="tab_item p-2 pt-0"
            >
              {isMyAccount && (
                <div className="w-100 btn-wrapper d-flex justify-content-end mb-3 p-2">
                  <Link to="/add-interest" className="custom-btn stroke">
                    <span>
                      <IconCirclePlus stroke={2} /> {t("profile.addInterest")}
                    </span>
                  </Link>
                </div>
              )}
              {interestsLoading ? (
                <DataLoader minHeight="400px" />
              ) : interests?.data && interests?.data?.length > 0 ? (
                interests?.data?.map((interest) => (
                  <div className="col-lg-6 col-12 p-2" key={interest?.id}>
                    <InterestMiniCard
                      interest={interest}
                      isMyAccount={isMyAccount}
                    />
                  </div>
                ))
              ) : (
                <EmptyData minHeight={"300px"}>
                  {t("profile.noOrders")}
                </EmptyData>
              )}
            </Tab>
          )}
          {/* Verifications */}
          <Tab
            eventKey="verifications"
            title={t("profile.verifications")}
            className="tab_item p-2 pt-0"
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
              className="tab_item p-2 pt-0"
            >
              {rewardsLoading || settingsLoading ? (
                <DataLoader minHeight="400px" />
              ) : rewards?.data && rewards?.data?.length > 0 ? (
                <>
                  {isMyAccount &&
                    (hasReward ? (
                      <div className="w-100 btn-wrapper d-flex justify-content-end mb-3 p-2">
                        <div className="btns-wrapper">
                          <button
                            className="btn custom-btn filled"
                            style={{ width: "unset !important" }}
                            onClick={() => setShowWithdrawModel(true)}
                          >
                            <span>{t("profile.withdrawRewards")}</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="w-100 btn-wrapper d-flex gap-3 justify-content-end flex-column mb-3 p-2">
                        <h4 style={{ textWrap: "balance" }}>
                          {t("profile.noRewards")}
                        </h4>
                        {settings?.reward_rate_average ||
                        settings?.reward_favorite_count ? (
                          <>
                            <h5>{t("profile.rewardsConditions")}:</h5>
                            <ol className="px-4 d-flex flex-column gap-1">
                              {settings?.reward_favorite_count ? (
                                <li>
                                  {t("profile.rewardsFavoritesConditions1")}{" "}
                                  {settings?.reward_favorite_count}{" "}
                                  {t("profile.rewardsFavoritesConditions2")}
                                </li>
                              ) : null}
                              {settings?.reward_rate_average ? (
                                <li>
                                  {t("profile.rewardsRateConditions1")}{" "}
                                  {settings?.reward_rate_average}{" "}
                                  {t("profile.rewardsRateConditions2")}
                                </li>
                              ) : null}
                            </ol>
                          </>
                        ) : null}
                      </div>
                    ))}
                  {rewards?.data?.map((reward) => (
                    <div
                      className="col-lg-4 col-md-6 col-12 p-2"
                      key={reward?.id}
                    >
                      <Post
                        userId={user?.id}
                        post={reward}
                        isMyAccount={isMyAccount}
                        type="reward"
                      />
                    </div>
                  ))}
                </>
              ) : (
                <EmptyData minHeight={"300px"}>{t("profile.noAds")}</EmptyData>
              )}
            </Tab>
          )}

          {/* balance */}
          {isMyAccount && (
            <Tab
              eventKey="balance"
              title={t("profile.balance")}
              className="tab_item p-2 pt-0"
            >
              <section className="balance_section">
                <div className="balanceContainer">
                  <div className="blanceHeader">
                    <h3>{t("balance.accountBalance")}</h3>
                    <div className="btns-wrapper">
                      <button
                        className="btn custom-btn filled"
                        onClick={() => setShowChargeModel(true)}
                      >
                        <span>{t("balance.depositBalance")}</span>
                      </button>
                      <button
                        className="btn custom-btn filled"
                        onClick={() => setShowWithdrawModel(true)}
                      >
                        <span>{t("balance.withdrawBalance")}</span>
                      </button>
                    </div>
                  </div>
                  <div className="content-body">
                    <div className="balance-boxes-wrapper">
                      <div className="balance-box">
                        <span className="d-flex align-items-center justify-content-between w-100">
                          {t("balance.totalBalance")}
                        </span>
                        <h6>
                          {user?.wallet}{" "}
                          <i className="fa-solid fa-dollar-sign"></i>
                        </h6>
                      </div>
                    </div>
                    <Transactions />
                  </div>
                </div>
                <ChargeModal
                  showModal={showChargeModel}
                  setShowModal={setShowChargeModel}
                />

                <WithdrawModal
                  showModal={showWithdrawModel}
                  setShowModal={setShowWithdrawModel}
                />
              </section>
            </Tab>
          )}
          {/* addresses */}
          <Tab
            eventKey="addresses"
            title={t("profile.addresses")}
            className="tab_item p-2 pt-0"
          >
            <>
              {isMyAccount && (
                <div className="w-100 btn-wrapper d-flex justify-content-end mb-3 p-2">
                  <span
                    className="custom-btn stroke"
                    onClick={() => setShowModal(true)}
                    style={{ cursor: "pointer" }}
                  >
                    <span>
                      <IconCirclePlus stroke={2} /> {t("profile.addAddress")}
                    </span>
                  </span>
                </div>
              )}
              {addressesLoading ? (
                <DataLoader minHeight="400px" />
              ) : addresses?.data && addresses?.data?.length > 0 ? (
                addresses?.data?.map((address) => (
                  <div className="col-lg-6 col-12 p-2" key={address?.id}>
                    <AddressCard
                      userId={user?.id}
                      address={address}
                      isMyAccount={isMyAccount}
                      setTargetAddress={setTargetAddress}
                      setShowModal={setShowModal}
                    />
                  </div>
                ))
              ) : (
                <EmptyData minHeight={"300px"}>{t("profile.noAds")}</EmptyData>
              )}
            </>
          </Tab>
        </Tabs>
      </div>
      <AddAddress
        showModal={showModal}
        setShowModal={setShowModal}
        targetAddress={targetAddress}
        setTargetAddress={setTargetAddress}
      />
    </div>
  );
}

export default ProfileTabs;
