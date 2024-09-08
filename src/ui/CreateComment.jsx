import { useState } from "react";
import TextField from "./form-elements/TextField";
import SubmitButton from "./form-elements/SubmitButton";
import { useTranslation } from "react-i18next";
import RateScale from "./form-elements/RateScale";
import StarsList from "./StarsList";
import { Link } from "react-router-dom";
import userImage from "../assets/images/user-1.png";

function CreateComment({ comment, setTargetedComment }) {
  const { t } = useTranslation();
  const [commentLoading, setCommentLoading] = useState(false);
  const [formData, setFormData] = useState({
    rate: 0,
    comment: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRatingChange = (rate) => {
    setFormData({
      ...formData,
      rate,
    });
  };

  return (
    <div className="comment-wrapper">
      {comment && (
        <div className={`rate-card replay-to`}>
          <div className="info-wrapper">
            <Link to="/profile" className="image-wrapper">
              <img src={userImage} alt="user" />
            </Link>
            <div className="info-rate-wrapper">
              <div className="user-info">
                <Link to="/profile" className="name">
                  {comment.name}
                </Link>
                <span>{comment.time}</span>
              </div>
              <div className="rate">
                <StarsList rate={comment.rate} />
                <span>{comment.rate}</span>
              </div>
            </div>
          </div>

          <span className="close-btn" onClick={() => setTargetedComment("")}>
            <i className="fa-solid fa-xmark"></i>
          </span>

          <p className="comment">{comment.comment}</p>
        </div>
      )}
      <form action="" className={`rate-form  ${comment ? "replay-to" : ""}`}>
        <TextField
          name="comment"
          id="comment"
          value={formData?.comment}
          onChange={(e) => handleChange(e)}
          placeholder={comment ? t("shareYourReplay") : t("shareYourComment")}
        />
        <div className="btn-rate-wrapper">
          <div className="submit-wrapper">
            <SubmitButton
              loading={commentLoading}
              name={comment ? t("publishReplay") : t("publishRate")}
            />
          </div>
          {!comment && (
            <RateScale
              rate={formData?.rate}
              handleRatingChange={handleRatingChange}
            />
          )}
        </div>
      </form>
    </div>
  );
}

export default CreateComment;
