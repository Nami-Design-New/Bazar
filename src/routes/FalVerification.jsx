import { useState } from "react";
import SectionHeader from "../ui/layout/SectionHeader";
import headerImg from "../assets/images/verification-2.svg";

// Import FilePond and FilePond plugins
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useTranslation } from "react-i18next";
import SubmitButton from "../ui/form-elements/SubmitButton";

// Register the plugin
registerPlugin(FilePondPluginImagePreview);

function FalVerification() {
  const { t } = useTranslation();
  const [files, setFiles] = useState([]);

  return (
    <div className="verification-page">
      <SectionHeader />
      <form className="content-wrapper container col-lg-10 col-12">
        <div className="form-header-image">
          <img src={headerImg} alt="verification" />
        </div>
        <ul className="hint-wrapper">
          <h5>{t("profile.verificationBenifints")}:</h5>
          <li>{t("profile.verififcationHint1")}</li>
          <li>{t("profile.verififcationHint2")}</li>
          <li>{t("profile.verififcationHint3")}</li>
        </ul>
        <div className="file-upload-wrapper">
          <FilePond
            files={files}
            onupdatefiles={setFiles}
            allowMultiple={true}
            maxFiles={5}
            name="images"
            labelIdle={t("profile.uploadImagesMax5")}
          />
        </div>
        <div className="submit-wrapper col-12">
          <SubmitButton name={t("send")} />
        </div>
      </form>
    </div>
  );
}

export default FalVerification;
