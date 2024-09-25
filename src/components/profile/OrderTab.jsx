import { useTranslation } from "react-i18next";
import useUserOrders from "../../hooks/orders/useUserOrders";
import DataLoader from "../../ui/DataLoader";
import EmptyData from "../../ui/EmptyData";
import OrderCard from "../../ui/cards/OrderCard";

function OrderTab({ isMyAccount, user }) {
  const { t } = useTranslation();
  const { isLoading: ordersLoading, data: orders } = useUserOrders(user?.id);

  return ordersLoading ? (
    <DataLoader minHeight="400px" />
  ) : orders?.data && orders?.data?.length > 0 ? (
    orders?.data?.map((order) => (
      <div className="col-lg-6 col-12 p-2" key={order?.id}>
        <OrderCard order={order} isMyAccount={isMyAccount} />
      </div>
    ))
  ) : (
    <EmptyData minHeight={"300px"}>{t("profile.noOrders")}</EmptyData>
  );
}

export default OrderTab;
