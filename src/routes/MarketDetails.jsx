import useMarketDetails from "../features/markets/useMarketDetails.js";
import DataLoader from "../ui/DataLoader";
import SectionHeader from "./../ui/layout/SectionHeader";
import MarketBanner from "./../features/market-details/MarketBanner";
import MarketTabs from "./../features/market-details/MarketTabs";

function MarketDetails() {
  const { isLoading: marketLoading, data: market } = useMarketDetails();

  return marketLoading ? (
    <DataLoader />
  ) : (
    <>
      <SectionHeader title={market?.data?.name} backLinks={["markets"]} />
      <section className="market-details-page ">
        <div className="container">
          <div className="row m-0">
            <div className="col-12 p-2">
              <MarketBanner market={market} />
            </div>
            <div className="col-12 p-2">
              <MarketTabs market={market} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MarketDetails;
