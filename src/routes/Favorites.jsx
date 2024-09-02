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
      <section className="favorites-section tabs-section container">
        <Tabs defaultActiveKey="ads" id="uncontrolled-tab-example">
          {/* ADs */}
          <Tab eventKey="ads" title={t("favorites.ads")} className="tab_item">
            <div className="content-wrapper">
              <FavoriteADCard />
              <FavoriteADCard />
              <FavoriteADCard />
            </div>
          </Tab>

          {/* Markets */}
          <Tab
            eventKey="markets"
            title={t("favorites.markets")}
            className="tab_item"
          >
            <div className="content-wrapper">
              <FavoriteMarketCard />
              <FavoriteMarketCard />
              <FavoriteMarketCard />
            </div>
          </Tab>
        </Tabs>
      </section>
    </>
  );
}

export default Favorites;
