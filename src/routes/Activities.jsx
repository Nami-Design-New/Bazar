import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { useTranslation } from "react-i18next";
import ADMiniCard from "../ui/cards/ADMiniCard";
import InterestMiniCard from "../ui/cards/InterestMiniCard";
import OrderMiniCard from "../ui/cards/OrderMiniCard";

function Activities() {
  const { t } = useTranslation();

  return (
    <section className="activities-section container">
      <Tabs defaultActiveKey="ads" id="uncontrolled-tab-example">
        {/* ADs */}
        <Tab eventKey="ads" title={t("profile.myADs")} className="tab_item">
          <div className="content-wrapper">
            <ADMiniCard />
          </div>
        </Tab>

        {/* Interests */}
        <Tab
          eventKey="interests"
          title={t("profile.myInterests")}
          className="tab_item"
        >
          <div className="content-wrapper">
            <InterestMiniCard />
          </div>
        </Tab>

        {/* Orders */}
        <Tab
          eventKey="orders"
          title={t("profile.myOrders")}
          className="tab_item"
        >
          <div className="content-wrapper">
            <OrderMiniCard />
          </div>
        </Tab>
      </Tabs>
    </section>
  );
}

export default Activities;
