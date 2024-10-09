import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Comments from "./Comments";
import Share from "./Share";
import useAddToFavorite from "../../hooks/useAddToFavorite";
import useFollow from "../../hooks/useFollow";
import useUnfollow from "../../hooks/useUnfollow";
import useRemoveFromFavorite from "../../hooks/useRemoveFromFavorite";
import { useSelector } from "react-redux";

function Video({ ad }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [showComments, setShowComments] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [inView, setInView] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const isLogged = useSelector((state) => state.authedUser.isLogged);

  const { addToFavorite } = useAddToFavorite();
  const { removeFromFavorite } = useRemoveFromFavorite();

  const { follow } = useFollow();
  const { unfollow } = useUnfollow();

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (videoElement) {
            videoElement.play().catch(() => {});
          }
        } else {
          setInView(false);
          if (videoElement) {
            videoElement.pause();
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });

    if (videoElement) {
      observer.observe(videoElement);
    }

    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
      }
    };
  }, []);

  const handleUserInteraction = () => {
    if (videoRef.current) {
      setIsMuted(false);
      videoRef.current.muted = false;
    }
  };

  function handleToggleFavorite(e) {
    e.stopPropagation();
    e.preventDefault();
    if (isLogged) {
      if (ad?.is_favorite) {
        removeFromFavorite({ id: ad?.id, type: "ad_id" });
      } else {
        addToFavorite({
          id: ad?.id,
          type: "ad_id",
        });
      }
    } else {
      navigate("/login");
    }
  }

  function handleToggleFollowing(e) {
    e.stopPropagation();
    e.preventDefault();
    if (isLogged) {
      if (ad?.data?.user?.is_follow) {
        unfollow({ id: ad?.data?.user?.id, type: "user" });
      } else {
        follow({
          id: ad?.data?.user?.id,
          type: "user",
        });
      }
    } else {
      navigate("/login");
    }
  }

  return (
    <div className="video" onClick={handleUserInteraction}>
      {ad?.video ? (
        <video
          ref={videoRef}
          src={ad?.video}
          playsInline
          loop
          muted={isMuted}
        ></video>
      ) : (
        <Swiper
          spaceBetween={12}
          slidesPerView={1}
          speed={1000}
          loop={true}
          modules={[Autoplay, Pagination]}
          ref={videoRef}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          pagination={{
            type: "fraction",
          }}
          className="videosSwiper"
        >
          {ad?.images?.map((img) => (
            <SwiperSlide key={img.id}>
              <img src={img.image} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className="video_utils">
        <div className="user">
          <img src={ad?.user?.image} alt="user" />
          {!ad?.user?.is_follow && (
            <button className={`follow `} onClick={handleToggleFollowing}>
              <i className="fa-solid fa-plus"></i>
            </button>
          )}
        </div>

        <div className="actions">
          <button
            className={ad?.is_favorite ? "active" : ""}
            onClick={handleToggleFavorite}
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
