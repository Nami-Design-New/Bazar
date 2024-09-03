import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { useTranslation } from "react-i18next";
import ADMiniCard from "../ui/cards/ADMiniCard";
import InterestMiniCard from "../ui/cards/InterestMiniCard";
import OrderMiniCard from "../ui/cards/OrderMiniCard";
import { Link } from "react-router-dom";
import { IconCirclePlus } from "@tabler/icons-react";
import SectionHeader from "../ui/layout/SectionHeader";

function Activities() {
  const { t } = useTranslation();

  return (
    <>
      <SectionHeader />
      <section className="activities-section tabs-section container">
        <Tabs defaultActiveKey="ads" id="uncontrolled-tab-example">
          {/* ADs */}
          <Tab
            eventKey="ads"
            title={t("activities.myADs")}
            className="tab_item"
          >
            <div className="content-wrapper">
              <Link to="/add-ad" className="add-btn">
                <IconCirclePlus stroke={2} /> {t("ads.addAD")}
              </Link>
              <ADMiniCard />
              <ADMiniCard />
              <ADMiniCard />
            </div>
          </Tab>

          {/* Interests */}
          <Tab
            eventKey="interests"
            title={t("activities.myInterests")}
            className="tab_item"
          >
            <div className="content-wrapper">
              <Link to="/add-interest" className="add-btn">
                <IconCirclePlus stroke={2} /> {t("interests.addInterest")}
              </Link>
              <InterestMiniCard />
              <InterestMiniCard />
              <InterestMiniCard />
            </div>
          </Tab>

          {/* Orders */}
          <Tab
            eventKey="orders"
            title={t("activities.myOrders")}
            className="tab_item"
          >
            <div className="content-wrapper">
              <Link to="/add-order" className="add-btn">
                <IconCirclePlus stroke={2} /> {t("orders.addOrder")}
              </Link>
              <OrderMiniCard />
              <OrderMiniCard />
              <OrderMiniCard />
            </div>
          </Tab>
        </Tabs>
      </section>
    </>
  );
}

export default Activities;
