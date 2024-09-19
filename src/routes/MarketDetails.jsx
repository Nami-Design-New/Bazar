import DataLoader from "../ui/DataLoader";
import SectionHeader from "./../ui/layout/SectionHeader";
import MarketBanner from "./../components/market-details/MarketBanner";
import MarketTabs from "./../components/market-details/MarketTabs";
import useMarketDetails from "./../hooks/markets/useMarketDetails";

function MarketDetails() {
  const { isLoading: marketLoading, data: market } = useMarketDetails();

  console.log(market);

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
