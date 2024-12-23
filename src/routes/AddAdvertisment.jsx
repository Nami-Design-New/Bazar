import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import SectionHeader from "../ui/layout/SectionHeader";
import MainInfo from "../components/add-ad/MainInfo";
import Location from "../components/add-ad/Location";
import Gallery from "../components/add-ad/Gallery";
import Pricing from "../components/add-ad/Pricing";
import axios from "./../utils/axios";
import useGetAdById from "./../hooks/ads/useGetAdById";
import AdCategoryStep from "../components/add-ad/AdCategoryStep";

function AddAdvertisment() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { data: ad } = useGetAdById();
  const [form, setForm] = useState("main-info");
  const [filterData, setFilterData] = useState({});

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
    cover: "",
    price_type: "fixed",
    chat: 0,
    phone: 0,
    whatsapp: 0,
    video: "",
    audio: "",
    delete_video: 0,
    delete_audio: 0,
    delete_images: [],
    filters: null,
  });

  const [phoneChecked, setPhoneChecked] = useState(
    Boolean(formData?.phone_number)
  );
  const [whatsappChecked, setWhatsappChecked] = useState(
    Boolean(formData?.whatsapp_number)
  );

  useEffect(() => {
    if (ad) {
      setFormData({
        ...formData,
        title: ad?.data?.title,
        description: ad?.data?.description,
        category_id: ad?.data?.category_id,
        sub_category_id: ad?.data?.sub_category_id,
        city_id: ad?.data?.city_id,
        area_id: ad?.data?.area_id,
        lat: ad?.data?.lat,
        lng: ad?.data?.lng,
        address: ad?.data?.address,
        images: ad?.data?.images,
        ad_type: ad?.data?.ad_type,
        price: ad?.data?.price,
        price_type: ad?.data?.price_type,
        chat: ad?.data?.chat,
        phone: ad?.data?.phone,
        cover: ad?.data?.cover,
        audio: ad?.data?.audio,
        whatsapp: ad?.data?.whatsapp,
        video: ad?.data?.video,
        filters: ad?.data?.filters,
      });
    }

    if (ad?.data?.filters) {
      ad?.data?.filters?.map((filter) => {
        if (filter?.filter?.type === "number") {
          setFilterData((filterData) => ({
            ...filterData,
            [filter?.filter_id]: +filter?.value,
          }));
        } else if (filter?.filter?.type === "boolean") {
          setFilterData((filterData) => ({
            ...filterData,
            [filter?.filter_id]:
              filter?.value === "true" || filter?.value ? true : false,
          }));
        } else if (filter?.filter?.type === "select") {
          setFilterData((filterData) => ({
            ...filterData,
            [filter?.filter_id]: +filter?.value?.id,
          }));
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const uploadedImages = [];

    formData?.images?.forEach((image) => {
      if (String(image?.type)?.startsWith("image")) {
        uploadedImages.push(image);
      }
    });

    if (whatsappChecked) {
      if (!formData.whatsapp_number) {
        toast.error(t("ads.whatsappRequired"));
        setLoading(false);
        return;
      }
    }

    if (phoneChecked) {
      if (!formData.phone_number) {
        toast.error(t("ads.phoneRequired"));
        setLoading(false);
        return;
      }
    }

    const payLoad = {
      title: formData.title,
      description: formData.description,
      category_id: formData.category_id,
      sub_category_id: formData.sub_category_id,
      city_id: formData.city_id,
      area_id: formData.area_id,
      lat: formData.lat,
      lng: formData.lng,
      address: formData.address,
      ad_type: formData.ad_type,
      price: formData.price,
      price_type: formData.price_type,
      chat: formData.chat,
      phone: formData.phone,
      whatsapp: formData.whatsapp,
      images: uploadedImages,
      audio: formData.audio ? formData.audio : null,
      video: formData.video ? formData.video : null,
      delete_images: formData.delete_images,
      delete_audio: formData.delete_audio,
      delete_video: formData.delete_video,
      filters: formData.filters,
      ...filterData,
    };

    if (!ad) {
      payLoad.cover = formData.cover;
    } else {
      if (formData?.video?.type?.startsWith("video")) {
        payLoad.video = formData.video;
      }
      if (formData?.cover?.type?.startsWith("image")) {
        payLoad.cover = formData.cover;
      }
    }

    if (id) {
      payLoad.id = +ad?.data?.id;
    }

    try {
      const res = await axios.post(
        `/user/${id ? `update_ad` : "create_ad"}`,
        payLoad,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 201 || res.status === 200) {
        toast.success(
          `${id ? t("ads.successfullyEdited") : t("ads.successfullyAdded")}`
        );
        setForm("main-info");
        navigate("/profile");
      } else {
        toast.error(t("someThingWentWrong"));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || t("someThingWentWrong"));
      throw new Error(
        error?.response?.data?.message || t("someThingWentWrong")
      );
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
                {[
                  "main-info",
                  "category-filters",
                  "location",
                  "gallery",
                  "pricing-contact",
                ].map((fo, i) => (
                  <div
                    key={i}
                    className={`wizard_tab ${
                      [
                        "main-info",
                        "category-filters",
                        "location",
                        "gallery",
                        "pricing-contact",
                      ].indexOf(form) >= i
                        ? "active"
                        : ""
                    }`}
                  >
                    <div className="step_no">{i + 1}</div>
                    <h6>{t(`tabs.${fo}`)}</h6>
                  </div>
                ))}
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
                {form === "category-filters" && (
                  <AdCategoryStep
                    formData={formData}
                    setFormData={setFormData}
                    setForm={setForm}
                    filterData={filterData}
                    setFilterData={setFilterData}
                    ad={ad}
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
                    phoneChecked={phoneChecked}
                    setPhoneChecked={setPhoneChecked}
                    whatsappChecked={whatsappChecked}
                    setWhatsappChecked={setWhatsappChecked}
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
