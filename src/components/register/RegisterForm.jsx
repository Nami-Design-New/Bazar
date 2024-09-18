import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import InputField from "../../ui/form-elements/InputField";
import ImageUpload from "../../ui/form-elements/ImageUpload";
import PhoneField from "../../ui/form-elements/PhoneField";
import PasswordField from "../../ui/form-elements/PasswordField";
import SubmitButton from "../../ui/form-elements/SubmitButton";
import axios from "../../utils/axios";
import useGetSettings from "../../hooks/useGetSettings";

function RegisterForm({
  formData,
  setFormData,
  handleChange,
  setShowOtp,
  setOtpData
}) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { data: settings } = useGetSettings();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      !formData?.email ||
      !formData?.name ||
      !formData?.phone ||
      !formData?.password
    ) {
      toast.error(t("auth.fillAllFieldsRequired"));
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "/user/can_register",
        {
          ...formData,
          phone: Number(formData.phone)
        },
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      if (res.data.code === 200) {
        setShowOtp(true);
        setOtpData((prev) => ({
          ...prev,
          hashed_code: res.data.data
        }));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Register error:", error);
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container">
      <div className="row m-0 justify-content-center">
        <div className="col-lg-8 col-12 p-2">
          <div className="auth-form">
            <div className="form-title">
              <h1 className="title">{t("auth.register")}</h1>
              <h5 className="sub-title text-center">
                {t("auth.registerSubtitle")}
              </h5>
            </div>
            <form onSubmit={handleSubmit}>
              <ImageUpload
                type="file"
                name="userImage"
                id="img-upload"
                accept="image/*"
                formData={formData}
                setFormData={setFormData}
              />
              <div className="d-flex gap-2 flex-lg-row flex-column w-100">
                <InputField
                  label={t("auth.name")}
                  placeholder={t("auth.name")}
                  name="name"
                  type="text"
                  id="name"
                  required={true}
                  value={formData.name}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="d-flex gap-2 flex-lg-row flex-column w-100">
                <InputField
                  label={t("auth.email")}
                  placeholder="example@example.com"
                  type="email"
                  name="email"
                  id="email"
                  required={true}
                  formData={formData}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="d-flex gap-2 flex-lg-row flex-column w-100">
                <PhoneField
                  label={t("auth.phone")}
                  onChange={handleChange}
                  value={formData.phone}
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder={t("0XXXXXXXXXX")}
                  maxLength={9}
                  required={true}
                />
              </div>
              <div className="d-flex gap-2 flex-lg-row flex-column w-100">
                <PasswordField
                  label={t("auth.password")}
                  name={"password"}
                  id={"password"}
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <p className="d-flex w-100 gap-2 terms-condition-alert">
                {t("auth.acceptingTermsByContinue1")}
                <Link to={settings?.data?.terms_link} className="">
                  {t("auth.terms")}
                </Link>
                {t("auth.acceptingTermsByContinueAnd")}
                <Link to={settings?.data?.privacy_link} className="">
                  {t("auth.privacy")}
                </Link>
                {t("auth.acceptingTermsByContinue2")}
              </p>
              <div className="d-flex gap-2 flex-lg-row flex-column w-100">
                <SubmitButton
                  className={"custom-btn filled"}
                  loading={loading}
                  name={t("auth.createAccount")}
                />
              </div>
              <div className="d-flex gap-2 flex-lg-row flex-column w-100">
                <Link to="/login" className="noAccount">
                  {t("auth.alreadyHaveAccount")}{" "}
                  <span className=" ">{t("auth.login")}</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterForm;
