import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { handleChange } from "../../utils/helpers";
import SubmitButton from "../form-elements/SubmitButton";
import { toast } from "react-toastify";
import axios from "../../utils/axios";
import { Modal } from "react-bootstrap";
import TextField from "../form-elements/TextField";

function ReportModal({ id, type, showModal, setShowModal }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    comment: "",
    type: "",
    reported_id: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData({
      ...formData,
      reported_id: id || "",
      type: type || "",
    });
  }, [id, type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`/user/create_report`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 201 || res.status === 200) {
        toast.success(`t("interests.successfullyReported")`);
        setShowModal(false);
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
        <h5>{t(`createReport`)}</h5>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="col-12 p-2">
            <form onSubmit={handleSubmit} className="form">
              <div className="row w-100">
                <div className="col-12 py-2 px-0">
                  <TextField
                    required
                    placeholder={t("writeHere")}
                    name="comment"
                    id="comment"
                    value={formData?.comment}
                    onChange={(e) => {
                      handleChange(e, setFormData);
                    }}
                  />
                </div>
                <div className="col-12 py-2 px-0">
                  <div className="btns">
                    <SubmitButton
                      name={t("send")}
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

export default ReportModal;
