import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ConfirmationModal from "../modals/ConfirmationModal";
import { useState } from "react";

function InterestMiniCard({
  interest,
  isMyAccount,
  setTargetInterest,
  setShowInterestModal,
}) {
  const { t } = useTranslation();
  const [showConfirmation, setShowConfirmation] = useState(false);

  function handleOpenConfirmation(e) {
    e.stopPropagation();
    setShowConfirmation(true);
  }
  function handleDelete() {
    setShowConfirmation(false);
  }
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
      />
    </div>
  );
}

export default InterestMiniCard;
