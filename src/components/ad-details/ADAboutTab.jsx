import { Link, useNavigate } from "react-router-dom";
import useAddToFavorite from "../../hooks/useAddToFavorite";
import useRemoveFromFavorite from "../../hooks/useRemoveFromFavorite";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import ReportModal from "../../ui/modals/ReportModal";

function ADAboutTab({ ad }) {
  const { t } = useTranslation();
  const [showAdReportModal, setShowAdReportModal] = useState(false);

  const { addToFavorite, isLoading: addingLoading } = useAddToFavorite();
  const { removeFromFavorite, isLoading: removingLoading } =
    useRemoveFromFavorite();

  const isLogged = useSelector((state) => state.authedUser.isLogged);

  const navigate = useNavigate();

  const currentPageLink = window.location.href;
  const socialShareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentPageLink}`,
    instagram: `https://www.instagram.com/?url=${currentPageLink}`,
    twitter: `https://twitter.com/intent/tweet?url=${currentPageLink}`,
    whatsapp: `https://wa.me/?text=${currentPageLink}`,
  };

  function handleToggleFavorite(e) {
    e.stopPropagation();
    e.preventDefault();
    if (isLogged) {
      if (ad?.data?.is_favorite) {
        removeFromFavorite({ id: ad?.data?.id, type: "ad_id" });
      } else {
        addToFavorite({
          id: ad?.data?.id,
          type: "ad_id",
        });
      }
    } else {
      navigate("/login");
    }
  }

  return (
    <>
      <div className="priceInfo">
        <div className="price">
          <span> ${ad?.data?.price || 200} </span>
        </div>
        <button
          className={`favorite ${ad?.data?.is_favorite ? "active" : ""}`}
          onClick={handleToggleFavorite}
          disabled={addingLoading || removingLoading}
        >
          <img src="/images/heart.svg" alt="heart" />
        </button>
        <div className="actions">
          <a href="listing.html" className="category">
            <img src={ad?.data?.category?.image} alt="category" />
            {ad?.data?.category?.name}
          </a>
          <div className="share">
            <span className="ps-2 text-capitalize fw-bold">
              {t("share.share")} :
            </span>
            <a
              href={socialShareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="twitter"
            >
              <img src="/images/twitter.svg" alt="" />
            </a>
            <a
              href={socialShareLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp"
            >
              <img src="/images/whatsapp.svg" alt="" />
            </a>
            <a
              href={socialShareLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="instagram"
            >
              <img src="/images/instagram.svg" alt="" />
            </a>
            <a
              href={socialShareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="facebook"
            >
              <img src="/images/facebook.svg" alt="" />
            </a>
          </div>
          <span
            className="action-btn report"
            onClick={() => {
              if (isLogged) {
                setShowAdReportModal(true);
              } else {
                navigate("/login");
              }
            }}
          >
            <i className="fa-regular fa-flag"></i> {t("report")}
          </span>
        </div>
      </div>
      {ad?.data?.audio && (
        <div className="audioPlayer">
          <audio controls className="w-100">
            <source src={ad?.data?.audio} type="audio/mpeg" />
          </audio>
        </div>
      )}
      <div className="itemInfo">
        <h3 className="title">{ad?.data?.title}</h3>
        <div className="itemBottom">
          <Link className="location">
            <img src="/images/location.svg" alt="" />
            <span> {ad?.data?.address} </span>
          </Link>
          <div className="time">
            <img src="/images/clock.svg" alt="" />{" "}
            {`${new Date(ad?.data?.created_at).toDateString()}, ${new Date(
              ad?.data?.created_at
            ).toLocaleTimeString()}`}
          </div>
          <div className="views">
            <img src="/images/eye.svg" alt="" /> {ad?.data?.view_count}
          </div>
        </div>
        <p className="description">{ad?.data?.description}</p>
      </div>
      <ReportModal
        id={ad?.data?.id}
        type="ad"
        showModal={showAdReportModal}
        setShowModal={setShowAdReportModal}
      />
    </>
  );
}

export default ADAboutTab;
