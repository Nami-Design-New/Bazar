import PasswordField from "../../ui/form-elements/PasswordField";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SubmitButton from "../../ui/form-elements/SubmitButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import headerImg from "../../assets/images/forget-3.svg";

function ForgetStep3({ setStep }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleConfirmChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirmPassword !== formData.password) {
      toast.error(t("auth.passwordNotMatched"));
      return;
    } else {
      toast.success(t("auth.newPasswordSuccess"));
      navigate("/");
    }
  };

  return (
    <>
      <div className="form-header-image">
        <img src={headerImg} alt="forget password" />
      </div>
      <div className="form-title">
        <h5 className="sub-title">{t("auth.addNewPassword")}</h5>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="d-flex gap-2 flex-lg-row flex-column w-100">
          <PasswordField
            label={t("auth.password")}
            name={"password"}
            id={"password"}
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="d-flex gap-2 flex-lg-row flex-column w-100">
          <PasswordField
            label={t("auth.confirmPassword")}
            name={"confirmPassword"}
            id={"confirmPassword"}
            value={confirmPassword}
            onChange={handleConfirmChange}
          />
        </div>
        <SubmitButton
          onClick={() => {
            handleSubmit();
            setStep(1);
          }}
          name={t("auth.next")}
          loading={loading}
        />
      </form>
    </>
  );
}

export default ForgetStep3;
