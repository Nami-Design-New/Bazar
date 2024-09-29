import { Tab, Tabs } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import VerificationTab from "./VerificationTab.jsx";
import AdsTab from "./AdsTab.jsx";
import OrderTab from "./OrderTab.jsx";
import InterestsTab from "./InterestsTab.jsx";
import CouponsTab from "./CouponsTab.jsx";
import RewardsTab from "./RewardsTab.jsx";
import BalanceTab from "./BalanceTab.jsx";
import AddressTab from "./AddressTab.jsx";
import { useSearchParams } from "react-router-dom";

function ProfileTabs({ user, isMyAccount }) {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "ads";

  function handleTabChange(tab) {
    setSearchParams({ tab });
  }

  return (
    <div className="col-12 p-2">
      <div className="tabs-section">
        <Tabs
          className="profileNavCol col-md-5 col-lg-4 col-xl-3 p-2"
          activeKey={activeTab}
          onSelect={(tab) => handleTabChange(tab)}
          id="uncontrolled-tab-example"
        >
          {/* ADs */}
          <Tab
            eventKey="ads"
            title={t("profile.ads")}
            className="tab_item p-2 pt-0"
          >
            <AdsTab isMyAccount={isMyAccount} user={user} />
          </Tab>

          {/* Orders */}
          {isMyAccount && (
            <Tab
              eventKey="orders"
              title={t("profile.orders")}
              className="tab_item p-2 pt-0"
            >
              <OrderTab isMyAccount={isMyAccount} user={user} />
            </Tab>
          )}

          {/* Interests */}
          {isMyAccount && (
            <Tab
              eventKey="interests"
              title={t("profile.interests")}
              className="tab_item p-2 pt-0"
            >
              <InterestsTab isMyAccount={isMyAccount} user={user} />
            </Tab>
          )}

          {/* Verifications */}
          <Tab
            eventKey="verifications"
            title={t("profile.verifications")}
            className="tab_item p-2 pt-0"
          >
            <VerificationTab isMyAccount={isMyAccount} user={user} />
          </Tab>

          {/* Coupons */}
          {isMyAccount && (
            <Tab
              eventKey="coupons"
              title={t("profile.coupons")}
              className="tab_item p-2 pt-0"
            >
              <CouponsTab user={user} isMyAccount={isMyAccount} />
            </Tab>
          )}

          {/* Rewards */}
          {isMyAccount && (
            <Tab
              eventKey="rewards"
              title={t("profile.rewards")}
              className="tab_item p-2 pt-0"
            >
              <RewardsTab user={user} isMyAccount={isMyAccount} />
            </Tab>
          )}

          {/* Balance */}
          {isMyAccount && (
            <Tab
              eventKey="balance"
              title={t("profile.balance")}
              className="tab_item p-2 pt-0"
            >
              <BalanceTab user={user} isMyAccount={isMyAccount} />
            </Tab>
          )}

          {/* Addresses */}
          <Tab
            eventKey="addresses"
            title={t("profile.addresses")}
            className="tab_item p-2 pt-0"
          >
            <AddressTab user={user} isMyAccount={isMyAccount} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default ProfileTabs;
