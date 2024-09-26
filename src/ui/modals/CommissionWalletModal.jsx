import { useTranslation } from "react-i18next";
import useBanksList from "../../hooks/banks/useBanksList";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import { createTransfer } from "../../services/apiCommissions";
import BankTransferCard from "../cards/BankTransferCard";
import InputField from "../form-elements/InputField";
import { Link } from "react-router-dom";

function CommissionWalletModal({ setShowModal, showModal, cartTotalPrice }) {
  const { t } = useTranslation();
  const { isLoading, data: banks } = useBanksList();
  const [amount, setAmount] = useState("");
  const [bankId, setBankId] = useState("");
  const [loading, setLoading] = useState(false);

  const [conditionsCheck, setConditionsCheck] = useState({
    responsibility: false,
    duration: false,
    fees: false,
  });

  const handleConditionsChange = (e) => {
    setConditionsCheck({
      ...conditionsCheck,
      [e.target.name]: e.target.checked,
    });
  };

  const queryClint = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const requestBody = {};

    requestBody.amount = amount;
    requestBody.bank_id = bankId;

    try {
      await createTransfer(requestBody, queryClint);
      toast.success(t("commissions.payedSuccessfully"));
      setShowModal(false);
    } catch (error) {
      setShowModal(false);
      throw new Error(error.message);
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header className="pb-0" closeButton>
        <h5>{t("balance.withdrawBalance")}</h5>
      </Modal.Header>
      <Modal.Body className="pay_modal">
        {cartTotalPrice && (
          <h3 className="text-center">
            {t("cart.youDontHaveEnoughBallance")}{" "}
            <span>
              {cartTotalPrice}
              <i className="fa-solid fa-dollar-sign"></i>
            </span>
          </h3>
        )}

        <form className="form">
          <InputField
            type="number"
            id="amount"
            name="amount"
            placeholder={"00"}
            value={amount}
            label={`${t("balance.amount")} *`}
            onChange={(e) => setAmount(e.target.value)}
            disabled={loading}
            required={true}
          />

          {isLoading ? (
            <div className="skeleton-container">
              <div className="skeleton-item"></div>
            </div>
          ) : (
            banks &&
            banks?.length > 0 &&
            banks.map((bank) => (
              <BankTransferCard
                key={bank.id}
                bank={bank}
                bankTransfer={bankId}
                onChange={(id) => setBankId(id)}
                disabled={loading}
                required={true}
              />
            ))
          )}

          <Link to="/manage-accounts" className="btn custom-btn filled">
            <span>{t("manageAccount")}</span>
          </Link>

          <div className="conditions-wrapper">
            <div className="checkbox-group">
              <input
                type="checkbox"
                name="fees"
                id="fees"
                checked={conditionsCheck.fees}
                onChange={handleConditionsChange}
                disabled={loading}
                required={true}
              />

              <label htmlFor="fees">{t("balance.feesCondition")}</label>
            </div>
            <div className="checkbox-group">
              <input
                type="checkbox"
                name="duration"
                id="duration"
                checked={conditionsCheck.duration}
                onChange={handleConditionsChange}
                disabled={loading}
                required={true}
              />
              <label htmlFor="duration">{t("balance.durationCondition")}</label>
            </div>
            <div className="checkbox-group">
              <input
                type="checkbox"
                name="responsibility"
                id="responsibility"
                checked={conditionsCheck.responsibility}
                onChange={handleConditionsChange}
                disabled={loading}
                required={true}
              />
              <label htmlFor="responsibility">
                {t("balance.responsibilityCondition")}
              </label>
            </div>
            <p className="condition-note">
              الحوالات البنكية التي ترسلها دولية، وحسب البنك الذي تتعامل معه. قد
              تمر الحوالة عبر بنك وسيط لاتمام التحويل مما يؤدي لاقتطاع رسوم
              إضافية.
            </p>
            <p className="condition-note">
              قد يقتطع البنك المحلي الذي تستخدمه رسوم إضافية لاستقبال حوالات
              بنكية دولية أو رسوم لتحويل العملة من الدولار إلى العملة المحلية.
            </p>
          </div>
        </form>

        <div className="d-flex justify-content-end gap-3">
          <button
            onClick={() => setShowModal(false)}
            className="cancel-btn custom-btn stroke"
          >
            <span>{t("cancel")}</span>
          </button>
          <button
            className="order-now text-center custom-btn filled"
            type="submit"
            onClick={handleSubmit}
          >
            <span>{t("balance.withdrawBalance")}</span>
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default CommissionWalletModal;
