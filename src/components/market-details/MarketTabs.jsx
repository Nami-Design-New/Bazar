import { Tab, Tabs } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import AboutTab from "./AboutTab";
import ProductsTab from "./ProductsTab";
import RatesTab from "./RatesTab";
import useMarketRates from './../../hooks/markets/useMarketRates';

function MarketTabs({ market }) {
  const { t } = useTranslation();
  const { isLoading: ratesLoading, data: rates } = useMarketRates();

  return (
    <div className="tabs-section">
      <Tabs defaultActiveKey="aboutMarket" id="uncontrolled-tab-example">
        <Tab eventKey="aboutMarket" title={t("markets.aboutMarket")}>
          <AboutTab market={market} />
        </Tab>

        <Tab eventKey="products" title={t("markets.products")}>
          <ProductsTab market={market} />
        </Tab>

        <Tab
          eventKey="rates"
          title={`${t("markets.rates")} ${
            rates?.total ? "( " + rates?.total + " )" : ""
          }`}
        >
          <RatesTab market={market} rates={rates} ratesLoading={ratesLoading} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default MarketTabs;

