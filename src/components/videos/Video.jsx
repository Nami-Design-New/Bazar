import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Comments from "./Comments";
import Share from "./Share";

function Video({ ad }) {
  const videoRef = useRef(null);
  const [showComments, setShowComments] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
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
          <img src="/images/userr.webp" alt="user" />
          <button className="follow">
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>

        <div className="actions">
          <button>
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
          التفاصيل
        </Link>
      </div>

      <Comments
        show={showComments}
        setShow={setShowComments}
        element={videoRef}
      />

      <Share show={showShare} setShow={setShowShare} element={videoRef} />
    </div>
  );
}

export default Video;
