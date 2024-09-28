import { useState } from "react";
import { useTranslation } from "react-i18next";
import Transactions from "./../../ui/layout/Transactions";
import ChargeModal from "../../ui/modals/ChargeModal";
import WithdrawModal from "../../ui/modals/WithdrawModal";

function BalanceTab({ user }) {
  const { t } = useTranslation();
  const [showChargeModel, setShowChargeModel] = useState(false);
  const [showWithdrawModel, setShowWithdrawModel] = useState(false);

  return (
    <section className="balance_section">
      <div className="balanceContainer">
        <div className="blanceHeader">
          <h3>{t("balance.accountBalance")}</h3>
          <div className="btns-wrapper">
            <button
              className="btn custom-btn filled"
              onClick={() => setShowChargeModel(true)}
            >
              <span>{t("balance.depositBalance")}</span>
            </button>
            <button
              className="btn custom-btn filled"
              onClick={() => setShowWithdrawModel(true)}
            >
              <span>{t("balance.withdrawBalance")}</span>
            </button>
          </div>
        </div>
        <div className="content-body">
          <div className="balance-boxes-wrapper">
            <div className="balance-box">
              <span className="d-flex align-items-center justify-content-between w-100">
                {t("balance.totalBalance")}
              </span>
              <h6>
                {user?.wallet} <i className="fa-solid fa-dollar-sign"></i>
              </h6>
            </div>
          </div>
          <Transactions />
        </div>
      </div>
      <ChargeModal
        showModal={showChargeModel}
        setShowModal={setShowChargeModel}
      />

      <WithdrawModal
        showModal={showWithdrawModel}
        setShowModal={setShowWithdrawModel}
      />
    </section>
  );
}

export default BalanceTab;