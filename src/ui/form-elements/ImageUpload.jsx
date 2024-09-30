import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const ImageUpload = ({ formData, setFormData, image }) => {
  const { t } = useTranslation();
  const imgView = useRef(null);
  const inputRef = useRef(null);

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
    <div
      className="w-100 p-2 image-change-wrapper"
      onClick={() => inputRef.current.click()}
    >
      <div className="img-wrap">
        <img ref={imgView} src="/images/userr.webp" alt="avatar" />
      </div>
      <div className="d-flex w-100 justify-content-between align-items-center">
        <label htmlFor="img-upload">{t("auth.personalPhoto")}</label>
        <label className="upload">
          <input
            type="file"
            name="image"
            id="img-upload"
            accept="image/*"
            onChange={handleUpload}
            ref={inputRef}
          />
        </label>
      </div>
    </div>
  );
};
export default ImageUpload;
