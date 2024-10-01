import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ConfirmationModal from "../modals/ConfirmationModal";
import { useState } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import axios from "./../../utils/axios";

function InterestMiniCard({
  interest,
  isMyAccount,
  setTargetInterest,
  setShowInterestModal,
}) {
  const { t } = useTranslation();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  function handleOpenConfirmation(e) {
    e.stopPropagation();
    setShowConfirmation(true);
  }
  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/user/delete_interest", {
        id: interest?.id,
      });
      if (res.data?.code === 200) {
        toast.success(t("interests.successfullyDeleted"));
        setShowConfirmation(false);
        queryClient.invalidateQueries(["userInterests"]);
      } else {
        toast.error(res.data?.message);
      }
    } catch (error) {
      toast.error(error.response);
      throw new Error(error.message);
    } finally {
      setShowConfirmation(false);
      setLoading(false);
    }
  };
  return (
    <div
      className="interest-mini-card ad-mini-card activity-card"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="card-header">
        <div className="card-content">
          <h5 className="title ">{interest?.name}</h5>
          <div className="categories-wrapper">
            {interest?.category?.name ? (
              <Link to="" className="category ">
                <i className="far fa-cubes"></i>
                {interest?.category?.name}
              </Link>
            ) : null}
            {interest?.sub_category?.name ? (
              <Link to="" className="category ">
                <i className="far fa-cubes"></i>
                {interest?.sub_category?.name}
              </Link>
            ) : null}
            {interest?.city?.name ? (
              <Link to="" className="category ">
                <i className="fa-sharp far fa-location-dot"></i>{" "}
                {interest?.city?.name}
              </Link>
            ) : null}
            {interest?.area?.name ? (
              <Link to="" className="category ">
                <i className="far fa-home"></i> {interest?.area?.name}
              </Link>
            ) : null}
          </div>
        </div>
        {isMyAccount && (
          <div className="action-boxes">
            <span
              className="action-btn delete"
              onClick={handleOpenConfirmation}
            >
              <i className="fa-regular fa-trash "></i>
            </span>
            <span
              className="action-btn edit"
              onClick={() => {
                setShowInterestModal(true);
                setTargetInterest(interest);
              }}
            >
              <i className="fa-regular fa-pen-to-square "></i>
            </span>
          </div>
        )}
      </div>
      <ConfirmationModal
        showModal={showConfirmation}
        setShowModal={setShowConfirmation}
        type="delete"
        eventFun={handleDelete}
        buttonText={t("delete")}
        text={t("interests.areYouSureYouWantToDeleteInterest")}
        loading={loading}
      />
    </div>
  );
}

export default InterestMiniCard;
