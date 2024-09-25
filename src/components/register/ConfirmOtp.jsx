import { useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import OtpContainer from "../../ui/form-elements/OtpContainer";
import SubmitButton from "../../ui/form-elements/SubmitButton";
import axios from "../../utils/axios";
import { setIsLogged, setUser } from "../../redux/slices/authedUser";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";

const ConfirmOtp = ({ otpData, setOtpData, formData, phone }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [, setCookie] = useCookies(["token", "id"]);

  const headers = {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  };

  const checkCodeRequest = {
    method: "POST",
    headers: headers,
    data: {
      ...otpData,
      ...formData,
      type: "register",
    },
    url: "/user/check_code",
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
          dispatch(setUser(req.data.data));
          dispatch(setIsLogged(true));
          setCookie("token", req.data.data.token, {
            path: "/",
            secure: true,
            sameSite: "Strict"
          });
          setCookie("id", req.data.data.id, {
            path: "/",
            secure: true,
            sameSite: "Strict"
          });
          axios.defaults.headers.common[
            "Authorization"
          ] = `${req.data.data.token}`;
          navigate("/");
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
    <div className="row m-0">
      <div className="col-lg-7 col-12 p-2 d-flex align-items-center">
        <div className="otp_form_container">
          <h5 className="sub-title">
            {t(`${phone ? "auth.enterPhoneOTP" : "auth.enterOTP"}`)}{" "}
            <span className="">{phone}</span>
          </h5>
          <form
            className="form forgetpasswordForm otp-small"
            onSubmit={handleSubmit}
          >
            <OtpContainer formData={otpData} setFormData={setOtpData} />
            <SubmitButton
              loading={loading}
              name={t("confirm")}
              className={"mt-3"}
            />
          </form>
        </div>
      </div>
      <div className="col-lg-5 col-12 p-2">
        <div className="form-header-image">
          <img src="/images/forget-2.svg" alt="forget password" />
        </div>
      </div>
    </div>
  );
};

export default ConfirmOtp;
