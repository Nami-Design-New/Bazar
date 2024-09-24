import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { handleFavourite, handleFollow } from "../../services/apiFollow";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Comments from "./Comments";
import Share from "./Share";

function Video({ ad, setVideos }) {
  const { t } = useTranslation();
  const videoRef = useRef(null);
  const [showComments, setShowComments] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [inView, setInView] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

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
  }, []);

  const handleUserInteraction = () => {
    if (videoRef.current) {
      setIsMuted(false);
      videoRef.current.muted = false;
    }
  };

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
            type: "fraction"
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
