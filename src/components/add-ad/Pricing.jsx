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

  const applyWhatsapp = async (e) => {
    e.preventDefault();
    setWhatsappLoading(true);

    try {
      const res = await axios.post("/user/check_phone", {
        phone: whatsapp
      });
      if (res?.data?.code === 200) {
        toast.success(t("ads.successfullyAdded"));
        setFormData({
          ...formData,
          whatsapp_number: whatsapp
        });
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error);
    } finally {
      setWhatsappLoading(false);
    }
  };

  return (
    <div className="row w-100">
      <div className="col-12 p-2">
        <InputField
          required
          label="السعر"
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
            نوع التسعير
          </label>
          <div className="types">
            <div className="type">
              <div className="label">
                <label htmlFor="min" className="content">
                  <img src="/images/best-price.svg" alt="best" />
                  <div className="text">
                    <h4>افضل سعر</h4>
                    <p>لا يوجد سعر محدد سيتم قبول افضل سعر مقدم</p>
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
                    <h4>سعر قابل لتفاوض</h4>
                    <p>
                      سيتمكن المشترين من تقديم طلبات شراء باقل من السعر المحدد
                    </p>
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
                    <h4>سعر ثابت</h4>
                    <p>
                      سيتمكن المشترين من الدفع مباشرة دون ارسال طلب شراء وانتظار
                      القبول
                    </p>
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
            نوع التواصل
          </label>

          <div className="types">
            <div className="type">
              <div className="label">
                <label htmlFor="whatsapp" className="content">
                  <img src="/images/whatsapp-icon.svg" alt="best" />
                  <div className="text">
                    <h4>واتساب</h4>
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
                    placeholder="رقم الواتساب"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    noFullWidth={true}
                  />
                  <SubmitButton
                    className=""
                    name={"تحقق"}
                    loading={whatsappLoading}
                    onClick={applyWhatsapp}
                  />
                </div>
              )}
            </div>

            <div className="type">
              <div className="label">
                <label htmlFor="phone" className="content">
                  <img src="/images/call.svg" alt="" />
                  <div className="text">
                    <h4>اتصال</h4>
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
                <InputField
                  type="number"
                  name="phone_number"
                  id="phone_number"
                  placeholder="رقم الهاتف"
                  value={formData?.phone_number}
                  onChange={(e) => handleChange(e, setFormData)}
                />
              )}
            </div>

            <div className="type">
              <div className="label">
                <label htmlFor="chat" className="content">
                  <img src="/images/Message.svg" alt="fixed" />
                  <div className="text">
                    <h4>رسائل</h4>
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
            <i className="fa-regular fa-angle-right"></i> السابق
          </button>
          <SubmitButton
            name={id ? "حفظ" : "نشر الاعلان"}
            className="wizard_btn next"
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default Pricing;
