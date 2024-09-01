import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { useTranslation } from "react-i18next";
import ADMiniCard from "../ui/cards/ADMiniCard";
import InterestMiniCard from "../ui/cards/InterestMiniCard";
import OrderMiniCard from "../ui/cards/OrderMiniCard";
import { Link } from "react-router-dom";
import { IconCirclePlus } from "@tabler/icons-react";

function Activities() {
  const { t } = useTranslation();

  return (
    <section className="activities-section container">
      <Tabs defaultActiveKey="ads" id="uncontrolled-tab-example">
        {/* ADs */}
        <Tab eventKey="ads" title={t("profile.myADs")} className="tab_item">
          <div className="content-wrapper">
            <Link to="/add-ad" className="add-btn">
              <IconCirclePlus stroke={2} /> {t("profile.addAD")}
            </Link>
            <ADMiniCard />
            <ADMiniCard />
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
            <Link to="/add-interest" className="add-btn">
              <IconCirclePlus stroke={2} /> {t("profile.addInterest")}
            </Link>
            <InterestMiniCard />
            <InterestMiniCard />
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
            <Link to="/add-order" className="add-btn">
              <IconCirclePlus stroke={2} /> {t("profile.addOrder")}
            </Link>
            <OrderMiniCard />
            <OrderMiniCard />
            <OrderMiniCard />
          </div>
        </Tab>
      </Tabs>
    </section>
  );
}

export default Activities;
