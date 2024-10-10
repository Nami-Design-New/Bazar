import { Modal } from "react-bootstrap";
import SubmitButton from "../form-elements/SubmitButton";
import TextField from "../form-elements/TextField";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../utils/axios";
import { handleChange } from "../../utils/helpers";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import ReplayCard from "../cards/ReplayCard";

function CreateReplayModal({ showModal, setShowModal, targetComment }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    comment_id: targetComment?.id,
    comment: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isLogged = useSelector((state) => state.authedUser.isLogged);

  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isLogged) {
      try {
        const res = await axios.post(`/user/create_replay`, formData);
        if (res.status === 201 || res.status === 200) {
          toast.success(t("successfullyReplied"));
          queryClient.invalidateQueries(["comments", "replays"]);
          setShowModal(false);
          setFormData({
            comment_id: targetComment?.id,
            comment: "",
          })
        } else {
          toast.error(t("someThingWentWrong"));
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || t("someThingWentWrong"));
      } finally {
        setLoading(false);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header className="pb-0" closeButton>
        <h5>{t(`addReplay`)}</h5>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="col-12 p-2">
            <ReplayCard targetComment={targetComment} type="replay" />
          </div>
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
                      name={t("add")}
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

export default CreateReplayModal;
