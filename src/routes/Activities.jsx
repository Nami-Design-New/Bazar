import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { IconCirclePlus } from "@tabler/icons-react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ADMiniCard from "../ui/cards/ADMiniCard";
import InterestMiniCard from "../ui/cards/InterestMiniCard";
import OrderMiniCard from "../ui/cards/OrderMiniCard";
import SectionHeader from "../ui/layout/SectionHeader";

function Activities() {
  const { t } = useTranslation();

  return (
    <>
      <SectionHeader />
      <section className="activities-section tabs-section container col-lg-10 col-12">
        <Tabs defaultActiveKey="ads" id="uncontrolled-tab-example">
          {/* ADs */}
          <Tab
            eventKey="ads"
            title={t("activities.myADs")}
            className="tab_item"
          >
            <div className="content-wrapper">
              <div className="btn-wrapper d-flex justify-content-end">
                <Link to="/add-ad" className="add-btn">
                  <IconCirclePlus stroke={2} /> {t("ads.addAD")}
                </Link>
              </div>
              <div className="cards-wrapper">
                <div className="col-lg-6 col-12 p-3">
                  <ADMiniCard />
                </div>
                <div className="col-lg-6 col-12 p-3">
                  <ADMiniCard />
                </div>
                <div className="col-lg-6 col-12 p-3">
                  <ADMiniCard />
                </div>
              </div>
            </div>
          </Tab>

          {/* Interests */}
          <Tab
            eventKey="interests"
            title={t("activities.myInterests")}
            className="tab_item"
          >
            <div className="content-wrapper">
              <div className="btn-wrapper d-flex justify-content-end">
                <Link to="/add-interest" className="add-btn">
                  <IconCirclePlus stroke={2} /> {t("interests.addInterest")}
                </Link>
              </div>
              <div className="cards-wrapper">
                <div className="col-lg-6 col-12 p-3">
                  <InterestMiniCard />
                </div>
                <div className="col-lg-6 col-12 p-3">
                  <InterestMiniCard />
                </div>
                <div className="col-lg-6 col-12 p-3">
                  <InterestMiniCard />
                </div>
              </div>
            </div>
          </Tab>

          {/* Orders */}
          <Tab
            eventKey="orders"
            title={t("activities.myOrders")}
            className="tab_item"
          >
            <div className="content-wrapper">
              <div className="btn-wrapper d-flex justify-content-end">
                <Link to="/add-order" className="add-btn">
                  <IconCirclePlus stroke={2} /> {t("orders.addOrder")}
                </Link>
              </div>
              <div className="cards-wrapper">
                <div className="col-lg-6 col-12 p-3">
                  <OrderMiniCard />
                </div>
                <div className="col-lg-6 col-12 p-3">
                  <OrderMiniCard />
                </div>
                <div className="col-lg-6 col-12 p-3">
                  <OrderMiniCard />
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </section>
    </>
  );
}

export default Activities;
