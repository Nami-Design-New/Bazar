import { IconXboxX } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { calculateDate } from "../../utils/helpers";
import useGetCommnets from "../../hooks/ads/useGetCommnets";
import DataLoader from "../../ui/DataLoader";
import axios from "./../../utils/axios";

function Comments({ show, setShow, videoId }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const user = useSelector((state) => state.authedUser.user);
  const queryClient = useQueryClient();
  const { data: comments, isLoading } = useGetCommnets(videoId);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
      document.querySelector(".videos_wrapper").style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.querySelector(".videos_wrapper").style.overflow = "scroll";
    }
  }, [show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/user/create_comment", {
        ad_id: videoId,
        comment: comment
      });
      if (res.data.code === 200) {
        setLoading(false);
        queryClient.invalidateQueries(["ad-comments", videoId]);
        if (!isLoading) {
          setComment("");
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <div className={`comments ${show ? "show" : ""}`}>
      {isLoading ? (
        <DataLoader minHeight="400px" />
      ) : (
        <>
          <div className="header">
            <h6>
              {t("comments")} ( {comments?.data?.length} )
            </h6>
            <button onClick={() => setShow(false)}>
              <IconXboxX stroke={1.5} />
            </button>
          </div>

          <div className="comments_wrapper">
            {comments?.data?.length > 0 ? (
              comments?.data?.map((comment) => (
                <div className="comment_wrap" key={comment.id}>
                  <div className="user_img">
                    <img src={comment?.user?.image} alt="avatar" />
                  </div>
                  <div className="user_details">
                    <h6>{comment?.user?.name}</h6>
                    <p>{comment?.comment}</p>
                    <span>{calculateDate(comment?.created_at)}</span>
                  </div>
                </div>
              ))
            ) : (
              <h5 className="no_comments">{t("noComments")}</h5>
            )}
          </div>

          <form className="comment_form" onSubmit={handleSubmit}>
            {user?.id ? (
              <>
                <div className="user_img">
                  <img src={user?.image} alt="" />
                </div>
                <input
                  type="text"
                  placeholder={t("addComment")}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button type="submit">
                  <i
                    className={
                      loading || isLoading
                        ? "fa-solid fa-spinner fa-pulse fa-spin"
                        : "fa-solid fa-paper-plane"
                    }
                  ></i>
                </button>
              </>
            ) : (
              <Link to="/login">{t("loginToComment")}</Link>
            )}
          </form>
        </>
      )}
    </div>
  );
}

export default Comments;
