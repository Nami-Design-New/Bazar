import { useEffect, useState } from "react";
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
  const [timer, setTimer] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);

  const headers = {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  };

  const checkCodeRequest = {
    method: "POST",
    headers: headers,
    data: {
      ...otpData,
      type: "register",
    },
    url: "/user/check_code",
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  const handleResend = async (e) => {
    e.preventDefault();
    setResendDisabled(true);
    setLoading(true);

    try {
      const res = await axios.post("/user/can_register", formData);
      if (res.data.code === 200) {
        setTimer(60);
        toast.success(t("auth.otpResentSuccess"));
        setOtpData((prev) => ({
          ...prev,
          hashed_code: res.data.data,
        }));
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
            sameSite: "Strict",
          });
          setCookie("id", req.data.data.id, {
            path: "/",
            secure: true,
            sameSite: "Strict",
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
            <div className="d-flex gap-2 flex-lg-row flex-column w-100">
              <OtpContainer formData={otpData} setFormData={setOtpData} />
            </div>
            <div className="resend-code">
              <span
                className={`resend_link ${resendDisabled ? "disabled" : ""}`}
              >
                {t("auth.didnotReceiveCode")}
                <span
                  className=""
                  style={{ cursor: "pointer" }}
                  onClick={handleResend}
                >
                  {t("auth.resendCode")}
                </span>
              </span>
              <div
                className="timer flex-row-reverse"
                style={{ justifyContent: "end !important" }}
              >
                <span>
                  {Math.floor(timer / 60)
                    .toString()
                    .padStart(2, "0")}
                </span>
                :<span>{(timer % 60).toString().padStart(2, "0")}</span>
              </div>
            </div>
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
