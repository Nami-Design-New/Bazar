import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import axios from "../../utils/axios";
import PhoneField from "../../ui/form-elements/PhoneField";
import SubmitButton from "../../ui/form-elements/SubmitButton";

function ForgetStep1({ setStep, formData, handleChange, setOtpData }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/user/check_phone", formData);
      if (res.data.code === 200 || res?.data?.code === 201) {
        toast.success(t("auth.otpSentSuccess"));
        setOtpData((prev) => ({
          ...prev,
          hashed_code: res.data.data,
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

  return (
    <>
      <div className="form-header-image">
        <img src="/images/forget-1.svg" alt="forget password" />
      </div>
      <div className="form-title">
        <h5 className="sub-title">{t("auth.forgetPasswordSubtitle")}</h5>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="d-flex gap-2 flex-lg-row flex-column w-100">
          <PhoneField
            label={t("auth.phone")}
            onChange={handleChange}
            value={formData.phone}
            id="phone"
            name="phone"
            type="tel"
            placeholder={t("5XXXXXXX")}
            maxLength={9}
            required={true}
          />
        </div>
        <SubmitButton
          className={"custom-btn filled"}
          name={t("auth.next")}
          loading={loading}
        />
        {/* <Link
          to="/login"
          className="custom-btn stroke"
          style={{ cursor: "pointer" }}
        >
          <span>{t("auth.login")}</span>
        </Link> */}
      </form>
    </>
  );
}

export default ForgetStep1;
