import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { subscriptionRemainingDays } from "../../utils/helpers";

function VerificationTab({ isMyAccount, user }) {
  const { t } = useTranslation();
  return (
    <div className="profile-verification-wrapper">
      <ul className="hint-wrapper mx-3">
        <h5>{t("profile.verificationBenifints")}:</h5>
        <li className="px-3">{t("profile.verififcationHint1")}</li>
        <li className="px-3">{t("profile.verififcationHint2")}</li>
        <li className="px-3">{t("profile.verififcationHint3")}</li>
      </ul>
      <div className="verification-box">
        <div className="box-info">
          <div className="icon-box">
            <i className="fa-solid fa-shield-check"></i>
          </div>
          <h5>{t("profile.verifyWithApp")}</h5>
        </div>
        <div className="btn-wrapper">
          {user?.verified ? (
            <div
              className={`${
                user?.verified ? "green" : ""
              }  btn-box custom-btn filled`}
            >
              <span>
                <i className="fa-solid fa-check-double"></i>
                {t(`profile.verified`)}
              </span>
            </div>
          ) : isMyAccount ? (
            <Link to="/app-verification" className="btn-box custom-btn filled">
              <span>{t(`profile.verify`)}</span>
            </Link>
          ) : (
            <div className="btn-box custom-btn filled">
              <span>{t(`profile.notVerified`)}</span>
            </div>
          )}
        </div>
      </div>
      <div className="verification-box">
        <div className="box-info">
          <div className="icon-box">
            <i className="fa-regular fa-box-circle-check"></i>
          </div>
          <h5>{t("profile.commercialVerification")}</h5>
        </div>
        <div className="btn-wrapper">
          {subscriptionRemainingDays(user?.end_date) > 0 ? (
            <div className="btn-box custom-btn filled green">
              <span>
                <i className="fa-solid fa-check-double"></i>
                {t(`profile.subscribed`)}
              </span>
            </div>
          ) : isMyAccount ? (
            user?.end_date ? (
              <Link
                to="/commercial-verification"
                className="btn-box custom-btn filled"
              >
                <span>{t(`profile.renewSubscribe`)}</span>
              </Link>
            ) : (
              <Link
                to="/commercial-verification"
                className="btn-box custom-btn filled"
              >
                <span>{t(`profile.subscribe`)}</span>
              </Link>
            )
          ) : (
            <div className="btn-box custom-btn filled">
              <span>{t(`profile.notSubscribed`)}</span>
            </div>
          )}
        </div>
      </div>
      <div className="verification-box">
        <div className="box-info">
          <div className="icon-box">
            <i className="fa-regular fa-memo-circle-check"></i>
          </div>
          <h5>{t("profile.falVerification")}</h5>
        </div>
        <div className="btn-wrapper">
          {user?.fal_verified ? (
            <div className="btn-box custom-btn filled green">
              <span>
                <i className="fa-solid fa-check-double"></i>
                {t(`profile.verified`)}
              </span>
            </div>
          ) : isMyAccount ? (
            <Link to="/fal-verification" className="btn-box custom-btn filled">
              <span>{t(`profile.verify`)}</span>
            </Link>
          ) : (
            <div className="btn-box custom-btn filled">
              <span>{t(`profile.notVerified`)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerificationTab;