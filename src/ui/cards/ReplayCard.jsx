import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ReportModal from "../modals/ReportModal";

function ReplayCard({ targetComment, type }) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="replay-card">
      <div className="info-wrapper">
        <Link
          to={`/profile/${targetComment?.user?.id}`}
          className="image-wrapper"
        >
          <img src={targetComment?.user?.image} alt="user" />
        </Link>
        <div className="info-rate-wrapper">
          <div className="user-info">
            <Link to={`/profile/${targetComment?.user?.id}`} className="name">
              {targetComment?.user?.name}
            </Link>
            <span>{`${new Date(
              targetComment?.created_at
            ).toDateString()}, ${new Date(
              targetComment?.created_at
            ).toLocaleTimeString()}`}</span>
          </div>
        </div>
      </div>

      {type === "replay" ? null : (
        <div className="btns-wrapper">
          <Dropdown>
            <Dropdown.Toggle className="butn" id="dropdown-basic">
              <i className="fa-regular fa-ellipsis-vertical"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setShowModal(true)}>
                {t("report")}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}

      <p className="comment">{targetComment?.comment}</p>
      <ReportModal
        id={targetComment?.id}
        type={"replay"}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
}

export default ReplayCard;
