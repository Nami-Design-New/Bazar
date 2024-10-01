import { useState } from "react";
import { useTranslation } from "react-i18next";
import SectionHeader from "../ui/layout/SectionHeader";
import SubmitButton from "../ui/form-elements/SubmitButton";

function FalVerification() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    images: [],
  });

  const handleRemoveImage = (index, image) => {
    if (image.id) {
      setFormData((prevState) => ({
        ...prevState,
        images: prevState.images.filter((_, i) => i !== index),
        delete_images: [...prevState.delete_images, image.id],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        images: prevState.images.filter((_, i) => i !== index),
      }));
    }
  };

  const handleImagesChange = (e) => {
    e.preventDefault();
    const newImages = Array.from(e.target.files);

    if (formData.images.length + newImages.length > 5) {
      return;
    }
    setFormData((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...newImages],
    }));
  };

  return (
    <div className="verification-page">
      <SectionHeader />
      <form className="content-wrapper container col-lg-10 col-12">
        <div className="form-header-image">
          <img src="/images/verification-2.svg" alt="verification" />
        </div>
        <ul className="hint-wrapper">
          <h5>{t("profile.verificationBenifints")}:</h5>
          <li>{t("profile.verififcationHint1")}</li>
          <li>{t("profile.verififcationHint2")}</li>
          <li>{t("profile.verififcationHint3")}</li>
        </ul>

        {/* images */}
        <div className="col-12 p-2">
          <div className="input-field d-flex flex-column gap-3">
            <label htmlFor="certificate-image" className="label-with-hint">
              {t("profile.uploadImagesMax5")}
            </label>
            <div className="images_grid_upload">
              {formData.images.length < 5 && (
                <div className="file_upload">
                  <label htmlFor="file_upload">
                    <input
                      type="file"
                      id="file_upload"
                      accept="image/*"
                      name="images"
                      multiple
                      onChange={handleImagesChange}
                    />
                    <img src="/images/gallery.svg" alt="upload" />
                    <div className="file_upload_dimensions"></div>
                  </label>
                </div>
              )}
              {formData?.images && (
                <>
                  {formData?.images?.map((image, index) => (
                    <div className="uploaded_file" key={index}>
                      <img
                        src={
                          image?.type?.startsWith("image/")
                            ? URL.createObjectURL(image)
                            : image?.image
                        }
                        alt="file"
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleRemoveImage(index, image);
                        }}
                      >
                        <i className="fa-light fa-xmark"></i>
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="submit-wrapper col-12">
          <SubmitButton name={t("send")} className="custom-btn filled" />
        </div>
      </form>
    </div>
  );
}

export default FalVerification;
