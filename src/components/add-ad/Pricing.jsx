import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { handleChange } from "../../utils/helpers";
import InputField from "./../../ui/form-elements/InputField";
import SubmitButton from "../../ui/form-elements/SubmitButton";
import axios from "../../utils/axios";
import OtpContainer from "./../../ui/form-elements/OtpContainer";

function Pricing({ formData, setFormData, setForm, loading }) {
  const { t } = useTranslation();
  const { id } = useParams();

  const [otpLoading, setOtpLoading] = useState(false);
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [whatsappLoading, setWhatsappLoading] = useState(false);
  const [verified, setVerified] = useState({
    whatsapp: false,
    phone: false,
  });

  const whatsappInputRef = useRef(null);
  const phoneInputRef = useRef(null);

  const [phone, setPhone] = useState(formData?.phone_number || "");
  const [whatsapp, setWhatsapp] = useState(formData?.whatsapp_number || "");

  const [phoneChecked, setPhoneChecked] = useState(
    Boolean(formData?.phone_number)
  );
  const [whatsappChecked, setWhatsappChecked] = useState(
    Boolean(formData?.whatsapp_number)
  );

  const [showPhoneOtp, setShowPhoneOtp] = useState(false);
  const [showWhatsappOtp, setShowWhatsappOtp] = useState(false);

  const verifyContact = async (phone, setLoading, setShowOtp, type) => {
    setLoading(true);
    try {
      const res = await axios.post("/user/check_verify_phone", { phone });
      if (res?.data?.code === 200 || res?.data?.code === 201) {
        if (res?.data?.data?.check) {
          toast.success(t(`ads.${type}Verified`));
          setFormData((prev) => ({
            ...prev,
            [`${type}_number`]: phone,
          }));
          setVerified({
            ...verified,
            [`${type}`]: true,
          });
        } else {
          toast.success(t("ads.checkTheCodeOnYourPhone"));
          setFormData((prev) => ({
            ...prev,
            hashed_code: res?.data?.data?.code,
          }));
          setShowOtp(true);
        }
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || t("somethingWentWrong"));
    } finally {
      setLoading(false);
    }
  };

  const verifyOtpCode = async (phone, type) => {
    setOtpLoading(true);
    try {
      const res = await axios.post("/user/check_code", {
        phone,
        type: "add_phone_ad",
        code: formData?.code,
        hashed_code: formData?.hashed_code,
      });
      if (res?.data?.code === 200 || res?.data?.code === 201) {
        toast.success(t("ads.phoneVerified"));
        type === "phone" ? setShowPhoneOtp(false) : setShowWhatsappOtp(false);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || t("somethingWentWrong"));
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <div className="row w-100">
      <div className="col-12 p-2">
        <InputField
          label={t("ads.price")}
          placeholder="00"
          name="price"
          id="price"
          type="number"
          value={formData?.price}
          onChange={(e) => {
            handleChange(e, setFormData);
          }}
          required={true}
        />
      </div>

      <div className="col-12 p-2">
        <div className="input-field">
          <label htmlFor="price_type">
            <img src="/images/price_type.svg" alt="price" />
            {t("ads.priceType")}
          </label>
          <div className="types">
            <div className="type">
              <div className="label">
                <label htmlFor="min" className="content">
                  <img src="/images/best-price.svg" alt="best" />
                  <div className="text">
                    <h4>{t("ads.best-price")}</h4>
                    <p>{t("ads.bestHint")}</p>
                  </div>
                </label>
                <input
                  type="radio"
                  name="price_type"
                  id="min"
                  value="min"
                  className="form-input-check"
                  checked={formData?.price_type === "min"}
                  onChange={(e) => handleChange(e, setFormData)}
                  required={true}
                />
              </div>
            </div>
            <div className="type">
              <div className="label">
                <label htmlFor="negotiable" className="content">
                  <img src="/images/negotiable.svg" alt="" />
                  <div className="text">
                    <h4>{t("ads.negotiable")}</h4>
                    <p>{t("ads.negotiableHint")}</p>
                  </div>
                </label>
                <input
                  type="radio"
                  name="price_type"
                  id="negotiable"
                  value="negotiable"
                  className="form-input-check"
                  checked={formData?.price_type === "negotiable"}
                  onChange={(e) => handleChange(e, setFormData)}
                  required={true}
                />
              </div>
            </div>
            <div className="type">
              <div className="label">
                <label htmlFor="fixed" className="content">
                  <img src="/images/fixed.svg" alt="fixed" />
                  <div className="text">
                    <h4>{t("ads.fixed-price")}</h4>
                    <p>{t("ads.fixedHint")}</p>
                  </div>
                </label>
                <input
                  type="radio"
                  name="price_type"
                  id="fixed"
                  value="fixed"
                  className="form-input-check"
                  checked={formData?.price_type === "fixed"}
                  onChange={(e) => handleChange(e, setFormData)}
                  required={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 p-2 mt-3">
        <div className="input-field">
          <label htmlFor="price_type">
            <img src="/images/contact.svg" alt="price" />
            {t("ads.contactType")}
            <span>( {t("ads.contactTypeHint")} )</span>
          </label>

          <div className="types ">
            <div className="type">
              <div className="label">
                <label htmlFor="whatsapp" className="content">
                  <img src="/images/whatsapp-icon.svg" alt="best" />
                  <div className="text">
                    <h4>{t("ads.whatsapp")}</h4>
                  </div>
                </label>
                <input
                  type="checkbox"
                  name="whatsapp"
                  id="whatsapp"
                  className="form-input-check"
                  checked={whatsappChecked}
                  onChange={() => setWhatsappChecked(!whatsappChecked)}
                  ref={whatsappInputRef}
                />
              </div>
              {whatsappChecked && (
                <>
                  <div className="check_phone d-flex">
                    <InputField
                      type="number"
                      name="whatsapp_number"
                      id="whatsapp_number"
                      noFullWidth={true}
                      value={whatsapp}
                      placeholder={t("ads.whatsappNumber")}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      disabled={verified?.whatsapp}
                    />
                    {!verified?.whatsapp ? (
                      <SubmitButton
                        className=""
                        name={t("ads.verify")}
                        loading={whatsappLoading}
                        onClick={() =>
                          verifyContact(
                            whatsapp,
                            setWhatsappLoading,
                            setShowWhatsappOtp,
                            "whatsapp"
                          )
                        }
                      />
                    ) : (
                      <span
                        className="reverify"
                        onClick={() => {
                          setVerified({
                            ...verified,
                            whatsapp: false,
                          });
                          whatsappInputRef?.current?.focus();
                        }}
                      >
                        <i className="fa-solid fa-arrows-repeat"></i>
                      </span>
                    )}
                  </div>
                  {showWhatsappOtp && (
                    <div className="otp_container">
                      <OtpContainer
                        formData={formData}
                        setFormData={setFormData}
                      />

                      <SubmitButton
                        name={t("ads.verify")}
                        loading={otpLoading}
                        onClick={() => verifyOtpCode(whatsapp, "whatsapp")}
                      />
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="type">
              <div className="label">
                <label htmlFor="phone" className="content">
                  <img src="/images/call.svg" alt="" />
                  <div className="text">
                    <h4>{t("ads.call")}</h4>
                  </div>
                </label>
                <input
                  type="checkbox"
                  name="phone"
                  id="phone"
                  className="form-input-check"
                  checked={phoneChecked}
                  onChange={() => setPhoneChecked(!phoneChecked)}
                  ref={phoneInputRef}
                />
              </div>
              {phoneChecked && (
                <>
                  <div className="check_phone d-flex">
                    <InputField
                      type="number"
                      name="phone_number"
                      id="phone_number"
                      placeholder={t("ads.callNumber")}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    {!verified?.phone ? (
                      <SubmitButton
                        className=""
                        name={t("ads.verify")}
                        loading={phoneLoading}
                        onClick={() =>
                          verifyContact(
                            phone,
                            setPhoneLoading,
                            setShowPhoneOtp,
                            "phone"
                          )
                        }
                      />
                    ) : (
                      <span
                        className="reverify"
                        onClick={() => {
                          setVerified({
                            ...verified,
                            phone: false,
                          });
                          phoneInputRef?.current?.focus();
                        }}
                      >
                        <i className="fa-solid fa-arrows-repeat"></i>
                      </span>
                    )}
                  </div>
                  {showPhoneOtp && (
                    <div className="otp_container">
                      <OtpContainer
                        formData={formData}
                        setFormData={setFormData}
                      />
                      <SubmitButton
                        name={t("ads.verify")}
                        loading={otpLoading}
                        onClick={() => verifyOtpCode(phone, "phone")}
                      />
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="type">
              <div className="label">
                <label htmlFor="chat" className="content">
                  <img src="/images/Message.svg" alt="fixed" />
                  <div className="text">
                    <h4>{t("ads.chat")}</h4>
                  </div>
                </label>
                <input
                  type="checkbox"
                  name="chat"
                  id="chat"
                  className="form-input-check"
                  checked={formData?.chat === 1}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      chat: e.target.checked ? 1 : 0,
                    }))
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 p-2">
        <div className="btns">
          <button
            className="wizard_btn prev"
            onClick={(e) => {
              e.preventDefault();
              setForm("gallery");
            }}
          >
            <i className="fa-regular fa-angle-right"></i> {t("ads.previous")}
          </button>
          <SubmitButton
            name={id ? t("ads.save") : t("ads.publish")}
            className="wizard_btn next"
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default Pricing;
