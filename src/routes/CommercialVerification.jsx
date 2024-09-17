import { useTranslation } from "react-i18next";
import SubmitButton from "../ui/form-elements/SubmitButton";
import SectionHeader from "../ui/layout/SectionHeader";
import headerImg from "../assets/images/verification-3.svg";
import { useState } from "react";
import usePackagesList from "../features/packages/usePackagesList";
import DataLoader from "../ui/DataLoader";
import EmptyData from "../ui/EmptyData";

function CommercialVerification() {
  const { t } = useTranslation();
  const [selectedPlan, setPlan] = useState("");
  const { isLoading: packagesLoading, data: packages } = usePackagesList();

  console.log(packages);

  return packagesLoading ? (
    <DataLoader minHeight="200px" />
  ) : (
    <div className="verification-page">
      <SectionHeader />
      {packages?.data && packages?.data?.length > 0 ? (
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
          <div className="col-12 plan-wrapper d-flex flex-column gap-2">
            <h6>{t("profile.planMethod")}</h6>
            <div className="inputs-wrapper">
              {packages?.data?.map((plan) => (
                <div className="radio-group" key={plan.value}>
                  <input
                    type="radio"
                    name="plan"
                    id={plan.id}
                    checked={selectedPlan.id === plan.id}
                    value={plan.id}
                    onChange={() => setPlan(plan)}
                  />
                  <label
                    htmlFor={plan.id}
                    className="d-flex align-items-center flex-column gap-4 py-3"
                  >
                    <div className="icon d-flex">
                      <i
                        className="fa-solid fa-gem"
                        style={{ fontSize: "24px" }}
                      ></i>
                    </div>
                    <div
                      className="d-flex align-items-center justify-content-between w-100"
                      style={{ gap: "24px" }}
                    >
                      <span className="d-flex align-items-center gap-1">
                        <i className="fa-regular fa-calendar-days"></i>
                        {plan.days}{" "}
                        {t(
                          `${
                            plan?.days > 1 && plan?.days < 11 ? "days" : "day"
                          }`
                        )}
                      </span>

                      <span className="d-flex align-items-center gap-1">
                        <i className="fa-regular fa-money-check-dollar"></i>
                        {plan?.price}
                      </span>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>
          {selectedPlan && (
            <>
              <div className="col-12 price-wrapper">
                <h6>{t("profile.planPrice")}</h6>
                <div className="content d-flex gap-3 align-items-center justify-content-between">
                  <span className="title">
                    {selectedPlan.days}{" "}
                    {t(
                      `${
                        selectedPlan?.days > 1 && selectedPlan?.days < 11
                          ? "days"
                          : "day"
                      }`
                    )}
                  </span>
                  <span className="price ">{selectedPlan?.price}</span>
                </div>
              </div>
              <div className="submit-wrapper col-12">
                <SubmitButton
                  name={t("payNow")}
                  className="custom-btn filled"
                />
              </div>
            </>
          )}
        </form>
      ) : (
        <EmptyData minHeight={"300px"}>{t("profile.noPackages")}</EmptyData>
      )}
    </div>
  );
}

export default CommercialVerification;
