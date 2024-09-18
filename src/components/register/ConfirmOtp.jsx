import { useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import OtpContainer from "../../ui/form-elements/OtpContainer";
import SubmitButton from "../../ui/form-elements/SubmitButton";
import axios from "../../utils/axios";

const ConfirmOtp = ({ otpData, setOtpData, formData, phone }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const headers = {
    Accept: "application/json",
    "Content-Type": "multipart/form-data"
  };

  const checkCodeRequest = {
    method: "POST",
    headers: headers,
    data: {
      ...otpData,
      ...formData,
      type: "register"
    },
    url: "/user/check_code"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.request(checkCodeRequest);
      if (res.data.code === 200) {
        toast.success(t("auth.registerSuccess"));
        navigate("/");
        const req = await axios.post("/user/register", formData);
        if (req.data.code === 200) {
          toast.success(t("auth.registerSuccess"));
          navigate("/login");
        } else {
          toast.error(req.data.message);
        }
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
  return (
    <section className="auth-form container col-12 col-lg-6">
      <div className="form-header-image">
        <img src="/images/forget-2.svg" alt="forget password" />
      </div>
      <div className="form-title">
        <h5 className="sub-title">
          {t(`${phone ? "auth.enterPhoneOTP" : "auth.enterOTP"}`)}{" "}
          <span className="">{phone}</span>
        </h5>
      </div>
      <form
        className="form forgetpasswordForm otp-small"
        onSubmit={handleSubmit}
      >
        <OtpContainer formData={otpData} setFormData={setOtpData} />
        <SubmitButton
          loading={loading}
          name={t("auth.createAccount")}
          className={"mt-3"}
        />
      </form>
    </section>
  );
};

export default ConfirmOtp;
