import { useTranslation } from "react-i18next";
import { formattedDate } from "../../utils/constants";
import { Link } from "react-router-dom";
import DataLoader from "../../ui/DataLoader";
import EmptyData from "./../../ui/EmptyData";
import useGetWalletOperations from './../../hooks/banks/useGetWalletOperations';

function Transactions() {
  const { t } = useTranslation();
  const { data: transactions, isLoading } = useGetWalletOperations();

  return isLoading ? (
    <DataLoader minHeight="400px" />
  ) : (
    <div className="transactions-wrapper">
      <h3>{t("balance.transactions")}</h3>
      <div className="row">
        <div className="col-12 p-2">
          {transactions?.data && transactions?.data?.length > 0 ? (
            <div className="transactions-body">
              {transactions?.data?.map((transaction, index) => (
                <Link to={``} className="transaction-box" key={index}>
                  <div className="money-wrapper">
                    <h5>
                      {transaction?.amount}
                      <i className="fa-solid fa-dollar-sign"></i>
                    </h5>
                  </div>
                  <div className="info-wrapper">
                    <h6 className="info-header">{transaction?.operation}</h6>
                    <div className="info-boxes-wrapper">
                      <div className="info-box">
                        <i className="fa-regular fa-timer"></i>
                        {formattedDate(transaction?.created_at)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyData>{t("balance.noTransactions")}</EmptyData>
          )}
        </div>
      </div>
    </div>
  );
}

export default Transactions;
