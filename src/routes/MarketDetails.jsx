import DataLoader from "../ui/DataLoader";
import SectionHeader from "./../ui/layout/SectionHeader";
import MarketBanner from "./../components/market-details/MarketBanner";
import MarketTabs from "./../components/market-details/MarketTabs";
import useMarketDetails from "./../hooks/markets/useMarketDetails";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function MarketDetails() {
  const { t } = useTranslation();
  const { isLoading: marketLoading, data: market } = useMarketDetails();

  return marketLoading ? (
    <DataLoader />
  ) : market?.data ? (
    <>
      <SectionHeader title={market?.data?.name} backLinks={["markets"]} />
      <section className="market-details-page ">
        <div className="container">
          <div className="row justify-content-center m-0">
            <div className="col-lg-10 p-0">
              <div className="row m-0">
                <div className="col-12 p-2">
                  <MarketBanner market={market} />
                </div>
                <div className="col-12 p-2">
                  <MarketTabs market={market} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  ) : (
    <section className="error-section">
      <img src="/images/error.svg" alt="error image" />
      <h2>{t("error.pageNotFound")}</h2>
      <Link to="/" className="backhome">
        <i className="fa-solid fa-home"></i>
        <span>{t("error.goHome")}</span>
      </Link>
    </section>
  );
}

export default MarketDetails;
