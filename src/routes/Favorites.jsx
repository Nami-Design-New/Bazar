import { Tab, Tabs } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import SectionHeader from "../ui/layout/SectionHeader";
import FavoriteMarketCard from "../ui/cards/FavoriteMarketCard";
import FavoriteADCard from "../ui/cards/FavoriteADCard";

function Favorites() {
  const { t } = useTranslation();

  return (
    <>
      <SectionHeader />
      <section className="favorites-section tabs-section container col-lg-10 col-12">
        <Tabs defaultActiveKey="ads" id="uncontrolled-tab-example">
          {/* ADs */}
          <Tab eventKey="ads" title={t("favorites.ads")} className="tab_item">
            <div className="content-wrapper">
              <div className="col-lg-6 col-12 p-3">
                <FavoriteADCard />
              </div>
              <div className="col-lg-6 col-12 p-3">
                <FavoriteADCard />
              </div>
              <div className="col-lg-6 col-12 p-3">
                <FavoriteADCard />
              </div>
            </div>
          </Tab>

          {/* Markets */}
          <Tab
            eventKey="markets"
            title={t("favorites.markets")}
            className="tab_item"
          >
            <div className="content-wrapper">
              <div className="col-lg-4 col-md-6 col-12 p-3">
                <FavoriteMarketCard />
              </div>
              <div className="col-lg-4 col-md-6 col-12 p-3">
                <FavoriteMarketCard />
              </div>
              <div className="col-lg-4 col-md-6 col-12 p-3">
                <FavoriteMarketCard />
              </div>
            </div>
          </Tab>
        </Tabs>
      </section>
    </>
  );
}

export default Favorites;
