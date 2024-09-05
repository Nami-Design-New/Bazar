import { useState } from "react";
import { handleChange } from "../utils/helpers";
import { useTranslation } from "react-i18next";
import InputField from "../ui/form-elements/InputField";
import SectionHeader from "../ui/layout/SectionHeader";
import TextField from "./../ui/form-elements/TextField";
import SelectField from "./../ui/form-elements/SelectField";

function AddAdvertisment() {
  const { t } = useTranslation();
  const [form, setForm] = useState("main-info");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category_id: "",
    sub_category_id: ""
  });
  return (
    <>
      <SectionHeader />
      <section className="add-advertisment">
        <div className="container">
          <div className="row m-0">
            {/* wizard tabs buttons */}
            <div className="col-12 p-2">
              <div className="wizard_tabs">
                {["main-info", "location"].map((fo, i) => (
                  <div
                    key={i}
                    className={`wizard_tab ${form === fo ? "active" : ""}`}
                  >
                    <div className="step_no">{i + 1}</div>
                    <h6>{t(`tabs.${fo}`)}</h6>
                  </div>
                ))}
              </div>
            </div>

            {/* wizard tab content */}
            <div className="col-12 p-2">
              <div className="form">
                <div className="row w-100">
                  {/* ** */}
                  <div className="col-12 p-2">
                    <InputField
                      required
                      label="عنوان الاعلان"
                      placeholder="مثال: موبايل"
                      name="title"
                      id="title"
                      value={formData?.title}
                      onChange={(e) => {
                        handleChange(e, setFormData);
                      }}
                    />
                  </div>
                  {/* ** */}
                  <div className="col-lg-6 col-12 p-2">
                    <SelectField
                      required
                      label="التصنيف"
                      name="category_id"
                      id="category_id"
                      value={formData?.category_id}
                      onChange={(e) => handleChange(e, setFormData)}
                      disabledOption={"اختر التصنيف"}
                      options={[
                        {
                          name: "تصنيف 1",
                          value: 1
                        },
                        {
                          name: "تصنيف 2",
                          value: 2
                        }
                      ]}
                    />
                  </div>
                  {/* ** */}
                  <div className="col-lg-6 col-12 p-2">
                    <SelectField
                      label="التصنيف الفرعي"
                      disabledOption={
                        formData?.category_id
                          ? "اختر التصنيف الفرعي"
                          : "اختر التصنيف أولاً"
                      }
                      name="sub_category_id"
                      id="sub_category_id"
                      value={formData?.sub_category_id}
                      onChange={(e) => handleChange(e, setFormData)}
                      options={[
                        {
                          name: "تصنيف فرعي 1",
                          value: 1
                        },
                        {
                          name: "تصنيف فرعي 2",
                          value: 2
                        }
                      ]}
                    />
                  </div>
                  {/* ** */}
                  <div className="col-12 p-2">
                    <TextField
                      required
                      label="تفاصيل الاعلان"
                      placeholder="مثال: ايفون 15 للبيع جديد 512 جيجا"
                      name="description"
                      id="description"
                      value={formData?.description}
                      onChange={(e) => {
                        handleChange(e, setFormData);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AddAdvertisment;
