import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import avatar from "../../assets/images/userr.webp";

const ImageUpload = ({ formData, setFormData, image }) => {
  const { t } = useTranslation();
  const imgView = useRef(null);

  useEffect(() => {
    if (image) {
      imgView.current.src = image;
    }
  }, [image]);

  const handleUpload = (e) => {
    imgView.current.src = URL.createObjectURL(e.target.files[0]);
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };
  return (
    <div className="w-100 p-3 image-change-wrapper">
      <div className="img-wrap">
        <img ref={imgView} src={avatar} alt="avatar" />
      </div>
      <div className="d-flex w-100 justify-content-between align-items-center">
        <label htmlFor="img">{t("auth.personalPhoto")}</label>
        <label className="upload">
          <div className="plus">
            <i className="fa-regular fa-plus"></i>
          </div>
          <input
            type="file"
            name="image"
            id="img-upload"
            accept="image/*"
            onChange={handleUpload}
          />
        </label>
      </div>
    </div>
  );
};
export default ImageUpload;
