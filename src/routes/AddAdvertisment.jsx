import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../ui/layout/SectionHeader";
import MainInfo from "../features/add-ad/MainInfo";
import Location from "../features/add-ad/Location";
import Gallery from "../features/add-ad/Gallery";
import Pricing from "../features/add-ad/Pricing";
import axios from "./../utils/axios";

function AddAdvertisment() {
  const { t } = useTranslation();
  const [form, setForm] = useState("main-info");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category_id: "",
    sub_category_id: "",
    city_id: "",
    area_id: "",
    lat: 24.7136,
    lng: 46.6753,
    address: "",
    images: [],
    ad_type: "sell",
    price: "",
    price_type: "fixed",
    chat: 0,
    phone: 0,
    whatsapp: 0,
    video: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/user/create_ad", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      if (res.status === 201 || res.status === 200) {
        toast.success("تم الاضافة بنجاح");
        setForm("main-info");
        navigate("/profile");
      } else {
        toast.error("حدث خطأ ما");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "حدث خطأ ما");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SectionHeader />
      <section className="add-advertisment">
        <div className="container">
          <div className="row m-0">
            {/* wizard tabs buttons */}
            <div className="col-12 p-2">
              <div className="wizard_tabs">
                {["main-info", "location", "gallery", "pricing-contact"].map(
                  (fo, i) => (
                    <div
                      key={i}
                      className={`wizard_tab ${form === fo ? "active" : ""}`}
                    >
                      <div className="step_no">{i + 1}</div>
                      <h6>{t(`tabs.${fo}`)}</h6>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* wizard tab content */}
            <div className="col-12 p-2">
              <form onSubmit={handleSubmit} className="form">
                {form === "main-info" && (
                  <MainInfo
                    formData={formData}
                    setFormData={setFormData}
                    setForm={setForm}
                  />
                )}
                {form === "location" && (
                  <Location
                    formData={formData}
                    setFormData={setFormData}
                    setForm={setForm}
                  />
                )}
                {form === "gallery" && (
                  <Gallery
                    formData={formData}
                    setFormData={setFormData}
                    setForm={setForm}
                  />
                )}
                {form === "pricing-contact" && (
                  <Pricing
                    loading={loading}
                    formData={formData}
                    setFormData={setFormData}
                    setForm={setForm}
                  />
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AddAdvertisment;
