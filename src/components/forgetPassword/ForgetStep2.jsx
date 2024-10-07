import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import OtpContainer from "../../ui/form-elements/OtpContainer";
import SubmitButton from "../../ui/form-elements/SubmitButton";
import axios from "../../utils/axios";

function ForgetStep2({ formData, setStep, otpData, setOtpData, phone }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);

  const handleResend = async (e) => {
    e.preventDefault();
    setResendDisabled(true);
    setLoading(true);

    try {
      const res = await axios.post("/user/check_phone", formData);
      if (res.data.code === 200 || res?.data?.code === 201) {
        setTimer(60);
        toast.success(t("auth.otpResentSuccess"));
        setOtpData((prev) => ({
          ...prev,
          hashed_code: res.data.data
        }));
        setStep(2);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Forget password error:", error);
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  const headers = {
    Accept: "application/json",
    "Content-Type": "multipart/form-data"
  };

  const checkCodeRequest = {
    method: "POST",
    headers: headers,
    data: {
      ...otpData,
      type: "verify_phone"
    },
    url: "/user/check_code"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.request(checkCodeRequest);
      if (res.data.code === 200 || res?.data?.code === 201) {
        setStep(3);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Forget password error:", error);
      toast.error(t("auth.otpCheckError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="form-header-image">
        <img src="/images/forget-2.svg" alt="forget password" />
      </div>
      <div className="form-title">
        <h5 className="sub-title">
          {t(`${phone ? "auth.enterPhoneOTP" : "auth.enterOTP"}`)}{" "}
          <span className="">{phone}</span>
        </h5>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="d-flex gap-2 flex-lg-row flex-column w-100">
          <OtpContainer formData={otpData} setFormData={setOtpData} />
        </div>
        <div className="resend-code">
          <span className={`resend_link ${resendDisabled ? "disabled" : ""}`}>
            {t("auth.didnotReceiveCode")}
            <span
              className=""
              style={{ cursor: "pointer" }}
              onClick={handleResend}
            >
              {t("auth.resendCode")}
            </span>
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
            className={"custom-btn filled"}
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
