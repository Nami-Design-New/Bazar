import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../utils/axios";
import SubmitButton from "../../ui/form-elements/SubmitButton";
import PasswordField from "../../ui/form-elements/PasswordField";

function ForgetStep3({ setStep, code, phone }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    phone,
    code,
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleConfirmChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmPassword !== formData.password) {
      toast.error(t("auth.passwordNotMatched"));
      return;
    } else {
      setLoading(true);
      try {
        const res = await axios.post("/user/update_password", formData);
        if (res.data.code === 200 || res?.data?.code === 201) {
          toast.success(t("auth.newPasswordSuccess"));
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error("Forget password error:", error);
        throw new Error(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className="form-header-image">
        <img src="/images/forget-3.svg" alt="forget password" />
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

export default ForgetStep3;
