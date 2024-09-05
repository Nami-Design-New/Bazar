import { useTranslation } from "react-i18next";
import SubmitButton from "../ui/form-elements/SubmitButton";
import SectionHeader from "../ui/layout/SectionHeader";
import headerImg from "../assets/images/verification-3.svg";
import { useState } from "react";

const plans = [
  {
    value: "شهر واحد",
    price: 200,
  },
  {
    value: "شهرين",
    price: 380,
  },
  {
    value: "3 أشهر",
    price: 450,
  },
  {
    value: "4 أشهر",
    price: 520,
  },
];

function CommercialVerification() {
  const { t } = useTranslation();
  const [plan, setPlan] = useState("");

  return (
    <div className="verification-page">
      <SectionHeader />
      <form className="content-wrapper container col-lg-10 col-12">
        <div className="form-header-image">
          <img src={headerImg} alt="verification" />
        </div>
        <ul className="hint-wrapper">
          <h5>{t("profile.verificationBenifints")}:</h5>
          <li>{t("profile.verififcationHint1")}</li>
          <li>{t("profile.verififcationHint2")}</li>
          <li>{t("profile.verififcationHint3")}</li>
        </ul>
        <div className="col-12 plan-wrapper">
          <h6>{t("profile.planMethod")}</h6>
          <div className="inputs-wrapper">
            {plans?.map((plan) => (
              <div className="radio-group" key={plan.value}>
                <input
                  type="radio"
                  name="plan"
                  id={plan.value}
                  value={plan.value}
                  onChange={() => setPlan(plan.value)}
                />
                <label htmlFor={plan.value}>{plan.value}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="col-12 price-wrapper">
          <h6>{t("profile.planPrice")}</h6>
          <div className="content d-flex gap-3 align-items-center justify-content-between">
            <span className="title">{plan}</span>
            <span className="price gradient-text">300 {t("currency.sar")}</span>
          </div>
        </div>
        <div className="submit-wrapper col-12">
          <SubmitButton name={t("send")} />
        </div>
      </form>
    </div>
  );
}

export default CommercialVerification;
