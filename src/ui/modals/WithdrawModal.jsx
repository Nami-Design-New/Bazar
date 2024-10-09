import { useState } from "react";
import { Modal, Nav, Row, Tab } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import InputField from "../form-elements/InputField";
import { useQueryClient } from "@tanstack/react-query";
import { createWithdraw } from "../../services/apiBanks";
import { toast } from "react-toastify";
import BankTransferCard from "../cards/BankTransferCard";
import useBanksList from "./../../hooks/banks/useBanksList";

const WithdrawModal = ({ showModal, setShowModal, cartTotalPrice }) => {
  const { t } = useTranslation();
  const { isLoading, data: banks } = useBanksList();
  const [activeTab, setActiveTab] = useState("bankTransfer");
  const [amount, setAmount] = useState("");
  const [paypal, setPaypal] = useState("");
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

  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const requestBody = {};

    if (activeTab === "bankTransfer") {
      requestBody.amount = amount;
      requestBody.bank_id = bankId;
    }
    if (activeTab === "paypal") {
      requestBody.amount = amount;
      requestBody.paypal = paypal;
    }

    try {
      if (
        (activeTab === "bankTransfer" &&
          bankId &&
          amount &&
          conditionsCheck.responsibility &&
          conditionsCheck.fees &&
          conditionsCheck.duration) ||
        (activeTab === "paypal" &&
          paypal &&
          amount &&
          conditionsCheck.responsibility &&
          conditionsCheck.fees &&
          conditionsCheck.duration)
      ) {
        await createWithdraw(requestBody, queryClient);
        toast.success(t("balance.withdrawSuccessfully"));
        setShowModal(false);
      }
    } catch (error) {
      console.error("Register error:", error);
      throw new Error(error.message);
    } finally {
      setLoading(false);
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
              {t("currency.sar")}
            </span>
          </h3>
        )}
        <Tab.Container
          id="left-tabs-example"
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
        >
          <Row>
            <Nav variant="pills">
              <Nav.Item>
                <Nav.Link eventKey="bankTransfer">
                  <i className="fa-sharp fa-regular fa-building-columns"></i>
                  {t("balance.bankTransfer")}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="paypal">
                  <i className="fa-brands fa-paypal"></i>
                  Paypal
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="bankTransfer">
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
                      <label htmlFor="duration">
                        {t("balance.durationCondition")}
                      </label>
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
                      {t("balance.conditionNote1")}
                    </p>
                    <p className="condition-note">
                      {t("balance.conditionNote2")}
                    </p>
                  </div>
                </form>
              </Tab.Pane>
              <Tab.Pane eventKey="paypal">
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
                  <InputField
                    type="number"
                    id="paypal"
                    name="paypal"
                    placeholder={"001321913231"}
                    value={paypal}
                    label={`${t("balance.paypalAccount")} *`}
                    onChange={(e) => setPaypal(e.target.value)}
                    disabled={loading}
                    required={true}
                  />
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
                      <label htmlFor="duration">
                        {t("balance.durationCondition")}
                      </label>
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
                      الحوالات البنكية التي ترسلها دولية، وحسب البنك الذي تتعامل
                      معه. قد تمر الحوالة عبر بنك وسيط لاتمام التحويل مما يؤدي
                      لاقتطاع رسوم إضافية.
                    </p>
                    <p className="condition-note">
                      قد يقتطع البنك المحلي الذي تستخدمه رسوم إضافية لاستقبال
                      حوالات بنكية دولية أو رسوم لتحويل العملة من الدولار إلى
                      العملة المحلية.
                    </p>
                  </div>
                </form>
              </Tab.Pane>
            </Tab.Content>
          </Row>
        </Tab.Container>

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
};

export default WithdrawModal;
