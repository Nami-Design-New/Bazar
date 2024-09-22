import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { handleFavourite, handleFollow } from "../../services/apiFollow";
import Comments from "./Comments";
import Share from "./Share";

function Video({ ad, setVideos }) {
  const { t } = useTranslation();
  const videoRef = useRef(null);
  const [showComments, setShowComments] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
        if (entry.isIntersecting && canPlay) {
          videoElement.play().catch(() => {});
          videoElement.muted = false;
        } else {
          videoElement.pause();
          videoElement.muted = true;
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5
    });

    if (videoElement) {
      observer.observe(videoElement);
    }

    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
      }
    };
  }, [canPlay]);

  const handleUserInteraction = () => {
    if (!canPlay) {
      setCanPlay(true);
    }
  };

  return (
    <div className="video" onClick={handleUserInteraction}>
      <video ref={videoRef} src={ad?.video} playsInline loop></video>

      <div className="video_utils">
        <div className="user">
          <img src={ad?.user?.image} alt="user" />
          {!ad?.user?.is_follow && (
            <button
              className="follow"
              onClick={() =>
                handleFollow("user", ad?.user?.id, setVideos, "/user/follow")
              }
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          )}
        </div>

        <div className="actions">
          <button
            className={ad?.is_favorite ? "active" : ""}
            onClick={() =>
              handleFavourite(
                "ad_id",
                ad?.id,
                setVideos,
                ad?.is_favorite
                  ? "/user/remove_from_favorite"
                  : "/user/add_to_favorite"
              )
            }
          >
            <i className="fa-regular fa-heart"></i>
          </button>
          <span>{ad?.favorites_count}</span>
        </div>

        <div className="actions" onClick={() => setShowComments(true)}>
          <button>
            <i className="fa-solid fa-comment-dots"></i>
          </button>
          <span>{ad?.comments_count}</span>
        </div>

        <div className="actions" onClick={() => setShowShare(true)}>
          <button>
            <i className="fa-solid fa-share"></i>
          </button>
          <span>{ad?.share_count}</span>
        </div>
      </div>

      <div className="adName">
        <h6>{ad?.title}</h6>
        <Link className="link" to={`/ad-details/${ad?.id}`}>
          {t("see_more")}
        </Link>
      </div>

      <Comments
        show={showComments}
        setShow={setShowComments}
        videoId={inView ? ad?.id : null}
      />

      <Share id={ad?.id} show={showShare} setShow={setShowShare} />
    </div>
  );
}

export default Video;
