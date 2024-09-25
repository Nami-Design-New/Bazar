import { useTranslation } from "react-i18next";
import CouponCard from "../../ui/cards/CouponCard";
import DataLoader from "../../ui/DataLoader";
import EmptyData from "../../ui/EmptyData";
import useAvailableCoupons from "../../hooks/coupons/useAvailableCoupons";

function CouponsTab({user}) {
  const { t } = useTranslation();
  const { isLoading: couponsLoading, data: coupons } = useAvailableCoupons(
    user?.id
  );

  return couponsLoading ? (
    <DataLoader minHeight="400px" />
  ) : coupons?.data && coupons?.data?.length > 0 ? (
    coupons?.data?.map((coupon) => (
      <div className="col-lg-4 col-md-6 col-12 p-2" key={coupon?.id}>
        <CouponCard coupon={coupon} type="profile" />
      </div>
    ))
  ) : (
    <EmptyData minHeight={"300px"}>{t("profile.noAds")}</EmptyData>
  );
}

export default CouponsTab;
