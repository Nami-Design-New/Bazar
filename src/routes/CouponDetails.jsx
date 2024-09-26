import { useTranslation } from "react-i18next";
import CouponCard from "../ui/cards/CouponCard";
import EmptyData from "../ui/EmptyData";
import DataLoader from "../ui/DataLoader";
import SectionHeader from "../ui/layout/SectionHeader";
import MarketBanner from "../components/market-details/MarketBanner";
import useMarketCoupons from "./../hooks/markets/useMarketCoupons";
import useMarketDetails from "./../hooks/markets/useMarketDetails";
import { Tab, Tabs } from "react-bootstrap";
import AboutTab from "../components/market-details/AboutTab";
function CouponDetails() {
  const { t } = useTranslation();
  const { isLoading: couponsLoading, data: coupons } = useMarketCoupons();
  const { isLoading: marketLoading, data: market } = useMarketDetails();
  return couponsLoading || marketLoading ? (
    <DataLoader />
  ) : (
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
                  <div className="tabs-section">
                    <Tabs
                      defaultActiveKey="aboutMarket"
                      id="uncontrolled-tab-example"
                    >
                      <Tab
                        eventKey="aboutMarket"
                        title={t("markets.aboutMarket")}
                      >
                        <AboutTab market={market} type="coupon" />
                      </Tab>
                      <Tab eventKey="coupons" title={t("markets.coupons")}>
                        {coupons?.data && coupons?.data?.length > 0 ? (
                          coupons?.data?.map((coupon) => (
                            <div
                              className="col-lg-4 col-md-6 col-12 p-2"
                              key={coupon?.id}
                            >
                              <CouponCard coupon={coupon} />
                            </div>
                          ))
                        ) : (
                          <EmptyData minHeight={"300px"}>
                            {t("markets.noCoupons")}
                          </EmptyData>
                        )}
                      </Tab>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default CouponDetails;
