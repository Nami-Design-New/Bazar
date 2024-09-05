import headerImg from "../../assets/images/forget-2.svg";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SubmitButton from "../../ui/form-elements/SubmitButton";

function ForgetStep2({ setStep }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [formData, setFormData] = useState({
    otp: "",
  });

  function handleResend() {
    setTimer(60);
  }

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  return (
    <>
      <div className="form-header-image">
        <img src={headerImg} alt="forget password" />
      </div>
      <div className="form-title">
        <h5 className="sub-title">{t("auth.enterOTP")}</h5>
      </div>
      <form>
        {/* <div className="d-flex gap-2 flex-lg-row flex-column w-100">
          <Otpcontainer formData={formData} setFormData={setFormData} />
        </div> */}
        <div className="resend-code">
          <span
            onClick={handleResend}
            className={`resend_link ${resendDisabled ? "disabled" : ""}`}
          >
            {t("auth.didnotReceiveCode")}
            <span className="gradient-text">{t("auth.resendCode")}</span>
          </span>
          <div className="timer">
            <span>
              {Math.floor(timer / 60)
                .toString()
                .padStart(2, "0")}
            </span>
            :<span>{(timer % 60).toString().padStart(2, "0")}</span>
          </div>
        </div>
        <div className="d-flex gap-3 align-items-center flex-column w-100">
          <SubmitButton
            onClick={() => setStep(3)}
            name={t("auth.next")}
            loading={loading}
          />
          <span
            to="/"
            className="custom-btn stroke"
            style={{ cursor: "pointer" }}
            onClick={() => setStep(1)}
          >
            <span>{t("auth.back")}</span>
          </span>
        </div>
      </form>
    </>
  );
}

export default ForgetStep2;
