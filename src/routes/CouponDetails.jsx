import { useTranslation } from "react-i18next";
// import { useState } from "react";
// import { Form } from "react-bootstrap";
import CouponCard from "../ui/cards/CouponCard";
import SectionHeader from "../ui/layout/SectionHeader";
import MarketBanner from "../features/market-details/MarketBanner";
import useMarketCoupons from "../features/markets/useMarketCoupons";
import DataLoader from "../ui/DataLoader";
import useMarketDetails from "../features/markets/useMarketDetails";
import EmptyData from "../ui/EmptyData";

function CouponDetails() {
  const { t } = useTranslation();
  // const [wantNotifications, setWantNotifications] = useState(false);
  const { isLoading: couponsLoading, data: coupons } = useMarketCoupons();
  const { isLoading: marketLoading, data: market } = useMarketDetails();

  console.log(coupons);

  return couponsLoading || marketLoading ? (
    <DataLoader minHeight="200px" />
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
              <div className="content-wrapper container col-lg-10 col-12 align-items-center">
                {/* <div className="notification-box">
                  <div className="icon-box">
                    <i className="fa-solid fa-bell gradient-icon"></i>
                  </div>
                  <p>ارسل لي اشعار عندما يتم اضافة عروض جديده على هذا الكود</p>
                  <Form.Switch
                    id="wantChangePassword"
                    name="wantChangePassword"
                    checked={wantNotifications}
                    onChange={() => setWantNotifications(!wantNotifications)}
                  />
                </div> */}
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CouponDetails;
