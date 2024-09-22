import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { handleChange } from "../../utils/helpers";
import InputField from "./../../ui/form-elements/InputField";
import SubmitButton from "../../ui/form-elements/SubmitButton";
import axios from "../../utils/axios";

function Pricing({ formData, setFormData, setForm, loading }) {
  const { t } = useTranslation();
  const { id } = useParams();
  const [whatsappLoading, setWhatsappLoading] = useState(false);
  const [whatsapp, setWhatsapp] = useState(formData?.whatsapp_number || "");
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [phone, setPhone] = useState(formData?.phone_number || "");

  const verifyPhone = async (e) => {
    e.preventDefault();
    setPhoneLoading(true);
    try {
      const res = await axios.post("/user/check_phone", {
        phone: phone
      });
      if (res?.data?.code === 200) {
        toast.success(t("ads.successfullyAdded"));
        setFormData({
          ...formData,
          phone: phone
        });
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error);
    } finally {
      setPhoneLoading(false);
    }
  };

  return (
    <div className="row w-100">
      <div className="col-12 p-2">
        <InputField
          required
          label={t("ads.price")}
          placeholder="00"
          name="price"
          id="price"
          type="number"
          value={formData?.price}
          onChange={(e) => {
            handleChange(e, setFormData);
          }}
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
                  checked={formData?.price_type === "min"}
                  onChange={(e) => handleChange(e, setFormData)}
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
                  checked={formData?.price_type === "negotiable"}
                  onChange={(e) => handleChange(e, setFormData)}
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
                  checked={formData?.price_type === "fixed"}
                  onChange={(e) => handleChange(e, setFormData)}
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
          </label>

          <div className="types">
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
                  checked={formData?.whatsapp === 1}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      whatsapp: e.target.checked ? 1 : 0
                    }))
                  }
                />
              </div>
              {formData?.whatsapp === 1 && (
                <div className="check_phone d-flex">
                  <InputField
                    type="number"
                    name="whatsapp_number"
                    id="whatsapp_number"
                    noFullWidth={true}
                    value={whatsapp}
                    placeholder={t("ads.whatsappNumber")}
                    onChange={(e) => setWhatsapp(e.target.value)}
                  />
                  <SubmitButton
                    className=""
                    name={t("ads.verify")}
                    loading={whatsappLoading}
                    onClick={verifyPhone}
                  />
                </div>
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
                  checked={formData?.phone === 1}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      phone: e.target.checked ? 1 : 0
                    }))
                  }
                />
              </div>
              {formData?.phone === 1 && (
                <div className="check_phone d-flex">
                  <InputField
                    type="number"
                    name="phone_number"
                    id="phone_number"
                    placeholder={t("ads.callNumber")}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <SubmitButton
                    className=""
                    name={t("ads.verify")}
                    loading={phoneLoading}
                    onClick={verifyPhone}
                  />
                </div>
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
                  checked={formData?.chat === 1}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      chat: e.target.checked ? 1 : 0
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
