import { useEffect, useState } from "react";
import InputField from "../ui/form-elements/InputField";
import { useTranslation } from "react-i18next";
import { handleChange } from "../utils/helpers";
import SelectField from "../ui/form-elements/SelectField";
import useCategoriesList from "../components/categories/useCategoriesList";
import useGetCities from "../hooks/settings/useGetCities";
import useGetAreas from "../hooks/settings/useGetAreas";
import SubmitButton from "../ui/form-elements/SubmitButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../utils/axios";
import { Modal } from "react-bootstrap";

function AddInterest({ interest, showModal, setShowModal, setTargetInterest }) {
  const { t } = useTranslation();
  const { data: categories } = useCategoriesList();
  const [subCategories, setSubCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    sub_category_id: "",
    city_id: "",
    area_id: "",
  });
  const { data: cities } = useGetCities();
  const { data: areas } = useGetAreas(
    formData?.city_id,
    formData?.city_id ? true : false
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (formData?.category_id) {
      setSubCategories(
        categories?.data?.find((c) => c.id === Number(formData?.category_id))
          ?.sub_categories
      );
    }
  }, [formData?.category_id, categories]);

  useEffect(() => {
    setFormData({
      ...formData,
      name: interest?.name || "",
      category_id: interest?.category_id || "",
      sub_category_id: interest?.sub_category_id || "",
      city_id: interest?.city_id || "",
      area_id: interest?.area_id || "",
    });
  }, [interest]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `/user/${interest ? `update_interest` : "create_interest"}`,
        { ...formData, id: +interest?.data?.id },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 201 || res.status === 200) {
        toast.success(
          `${
            interest
              ? t("interests.successfullyEdited")
              : t("interests.successfullyAdded")
          }`
        );
        navigate("/profile");
        setTargetInterest(null);
      } else {
        toast.error(t("someThingWentWrong"));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || t("someThingWentWrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header className="pb-0" closeButton>
        <h5>{t(`interests.${interest ? "editInterest" : "addInterest"}`)}</h5>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="col-12 p-2">
            <form onSubmit={handleSubmit} className="form">
              <div className="row w-100">
                <div className="col-12 py-2 px-0">
                  <InputField
                    required
                    label={t("ads.name")}
                    placeholder={t("writeHere")}
                    name="name"
                    id="name"
                    value={formData?.name}
                    onChange={(e) => {
                      handleChange(e, setFormData);
                    }}
                  />
                </div>
                {/* ** */}
                <div className="col-12 py-2 px-0">
                  <SelectField
                    required
                    label={t("ads.category")}
                    name="category_id"
                    id="category_id"
                    value={formData?.category_id}
                    onChange={(e) => handleChange(e, setFormData)}
                    disabledOption={t("ads.selectCategory")}
                    options={categories?.data?.map((category) => ({
                      name: category.name,
                      value: category.id,
                    }))}
                  />
                </div>
                {/* ** */}
                <div className="col-12 py-2 px-0">
                  <SelectField
                    label={t("ads.subCategory")}
                    disabledOption={
                      formData?.category_id
                        ? t("ads.selectSubCategory")
                        : t("ads.selectCategoryFirst")
                    }
                    name="sub_category_id"
                    id="sub_category_id"
                    required
                    value={formData?.sub_category_id}
                    onChange={(e) => handleChange(e, setFormData)}
                    options={subCategories?.map((category) => ({
                      name: category.name,
                      value: category.id,
                    }))}
                  />
                </div>
                {/* ** */}
                <div className="col-12 py-2 px-0">
                  <SelectField
                    required
                    label={t("ads.city")}
                    name="city_id"
                    id="city_id"
                    value={formData?.city_id}
                    onChange={(e) => handleChange(e, setFormData)}
                    disabledOption={t("ads.selectCity")}
                    options={cities?.data?.map((city) => {
                      return { name: city.name, value: city.id };
                    })}
                  />
                </div>
                <div className="col-12 py-2 px-0">
                  <SelectField
                    required
                    label={t("ads.area")}
                    name="area_id"
                    id="area_id"
                    value={formData?.area_id}
                    onChange={(e) => handleChange(e, setFormData)}
                    disabledOption={t("ads.selectArea")}
                    options={areas?.data?.map((area) => {
                      return { name: area.name, value: area.id };
                    })}
                  />
                </div>
                <div className="col-12 py-2 px-0">
                  <div className="btns">
                    <SubmitButton
                      name={
                        interest ? t("interests.save") : t("interests.publish")
                      }
                      className="wizard_btn next"
                      loading={loading}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AddInterest;
