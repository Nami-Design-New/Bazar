import { useState } from "react";
import TextField from "./form-elements/TextField";
import SubmitButton from "./form-elements/SubmitButton";
import { useTranslation } from "react-i18next";
import RateScale from "./form-elements/RateScale";
import StarsList from "./StarsList";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatTimeDifference, getTimeDifference } from "../utils/helpers";
import axios from "../utils/axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function CreateComment({ comment, setTargetedComment, refetch }) {
  const { t } = useTranslation();
  const [commentLoading, setCommentLoading] = useState(false);
  const [formData, setFormData] = useState({
    rate: 0,
    comment: ""
  });
  const [replayData, setReplayDataData] = useState({
    comment: ""
  });
  const isLogged = useSelector((state) => state.authedUser.isLogged);
  const navigate = useNavigate();
  const { id } = useParams();

  const timeDifference = getTimeDifference(comment?.created_at);
  const creationTime = formatTimeDifference(
    timeDifference.years,
    timeDifference.months,
    timeDifference.days,
    timeDifference.hours,
    timeDifference.minutes,
    t
  );

  const handleChangeRate = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleChangeReplay = (e) => {
    setReplayDataData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRatingChange = (rate) => {
    setFormData({
      ...formData,
      rate
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCommentLoading(true);
    const requestBody = {};

    if (!isLogged) {
      navigate("/login");
    } else {
      if (comment) {
        requestBody.comment = replayData.comment;
        requestBody.comment_id = +comment.id;
      } else if (id) {
        requestBody.comment = formData.comment;
        requestBody.rate = formData.rate;
        requestBody.market_id = +id;
      }

      try {
        console.log("requestBody", requestBody);

        const res = await axios.post(
          `/user/${comment ? "create_replay" : "create_market_rate"}`,
          requestBody
        );

        console.log(res);

        if (res.data.code === 200) {
          toast.success(
            t(
              `${comment ? "successfullyCommentReplayed" : "successfullyRated"}`
            )
          );
          refetch();
          setFormData({
            rate: 0,
            comment: ""
          });
          setTargetedComment("");
        }
      } catch (error) {
        console.error("Failed to create comment:", error);
        throw new Error(error.message);
      } finally {
        setCommentLoading(false);
      }
    }
  };

  return (
    <div className="comment-wrapper">
      {comment && (
        <div className={`rate-card replay-to`}>
          <div className="info-wrapper">
            <Link to="/profile" className="image-wrapper">
              <img src={comment.user.image} alt="user" />
            </Link>
            <div className="info-rate-wrapper">
              <div className="user-info">
                <Link to="/profile" className="name">
                  {comment.user.name}
                </Link>
                <span>{creationTime}</span>
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
      <form
        className={`rate-form form ${comment ? "replay-to" : ""}`}
        onSubmit={handleSubmit}
      >
        <TextField
          name="comment"
          id="comment"
          value={comment ? replayData.comment : formData.comment}
          onChange={(e) => {
            if (comment) {
              handleChangeReplay(e);
            } else {
              handleChangeRate(e);
            }
          }}
          placeholder={comment ? t("shareYourReplay") : t("shareYourComment")}
          required={true}
        />
        <div className="btn-rate-wrapper">
          <div className="submit-wrapper">
            <SubmitButton
              loading={commentLoading}
              name={comment ? t("publishReplay") : t("publishRate")}
              onClick={handleSubmit}
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
