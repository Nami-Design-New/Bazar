import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { calculateDate } from "../../utils/helpers";
import { toast } from "react-toastify";
import ConfirmationModal from "../modals/ConfirmationModal";
import axios from "./../../utils/axios";
import useUserAds from "../../hooks/ads/useUserAds";
import { useSelector } from "react-redux";
import useAddToFavorite from "../../hooks/useAddToFavorite";
import useRemoveFromFavorite from "../../hooks/useRemoveFromFavorite";
import { useQueryClient } from "@tanstack/react-query";

function RewardCard({ ad, isMyAccount, userId }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { refetch } = useUserAds();
  const { addToFavorite, isLoading: addingLoading } = useAddToFavorite();
  const { removeFromFavorite, isLoading: removingLoading } =
    useRemoveFromFavorite();
  const isLogged = useSelector((state) => state.authedUser.isLogged);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function handleToggleFavorite(e) {
    e.stopPropagation();
    e.preventDefault();
    if (isLogged) {
      if (ad?.is_favorite) {
        removeFromFavorite(
          { id: ad?.id, type: "ad_id" },
          {
            onSuccess: (res) => {
              if (res?.code !== 200) throw new Error(res?.message);
              else {
                queryClient.invalidateQueries([
                  "userAds",
                  "adsByFilter",
                  "favoriteAds",
                ]);
              }
            },
          }
        );
      } else {
        addToFavorite(
          {
            id: ad?.id,
            type: "ad_id",
          },
          {
            onSuccess: (res) => {
              if (res?.code !== 200) throw new Error(res?.message);
              else {
                queryClient.invalidateQueries([
                  "userAds",
                  "adsByFilter",
                  "favoriteAds",
                ]);
              }
            },
          }
        );
      }
    } else {
      navigate("/login");
    }
  }

  const [showConfirmation, setShowConfirmation] = useState(false);

  function handleOpenConfirmation(e) {
    e.preventDefault();
    e.stopPropagation();
    setShowConfirmation(true);
  }

  function handleLinkClick(e) {
    e.stopPropagation();
    if (
      e.target.classList.contains("delete") ||
      e.target.classList.contains("favorite") ||
      showConfirmation
    ) {
      e.preventDefault();
    }
  }

  const deleteAd = async () => {
    setLoading(true);
    try {
      const res = await axios.ad("/user/delete_ad", { id: ad?.id });
      if (res.data?.code === 200) {
        toast.success("تم حذف الاعلان بنجاح");
        setShowConfirmation(false);
        refetch(userId);
      } else {
        toast.error(res.data?.message);
      }
    } catch (error) {
      toast.error(error.response);
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link
      to={`/ad-details/${ad?.id}`}
      className={`fav-ad-card`}
      onClick={handleLinkClick}
    >
      <div className="card-header">
        <div className="image-wrapper">
          <img src={ad?.image?.image} alt={ad?.title || "AD image"} />
        </div>
        <div className="card-content">
          {ad?.price && (
            <span className="price">
              {ad?.price} {t("currency.sar")}
            </span>
          )}
          <h5 className="title one-line-wrap">{ad?.title}</h5>
          <p className="sub-title one-line-wrap">{ad?.description}</p>
          {!ad && (
            <div className="categories-wrapper">
              <Link to="" className="category ">
                <i className="fa-regular fa-apartment"></i>
                {t("categories.estates")}
              </Link>
            </div>
          )}
          <span className="date">
            {t("createdAt")}{" "}
            {ad?.created_at ? calculateDate(ad?.created_at) : "2024/8/2"}
          </span>
        </div>
        <div className="action-boxes">
          {isMyAccount ? (
            <>
              <span
                className="action-btn delete"
                onClick={handleOpenConfirmation}
              >
                <i className="fa-regular fa-trash "></i>
              </span>
              <Link to={`/add-ad/${ad?.id}`} className="action-btn edit">
                <i className="fa-regular fa-pen-to-square"></i>
              </Link>
            </>
          ) : (
            <span
              className={`action-btn favorite ${
                ad?.is_favorite ? "liked" : ""
              }`}
              onClick={handleToggleFavorite}
              disabled={removingLoading || addingLoading}
            >
              <i className="fa-solid fa-heart"></i>
            </span>
          )}
        </div>
      </div>
      <div className="card-statistics">
        {ad?.view_count || ad?.view_count === 0 ? (
          <div className="statistic">
            <i className="fa-regular fa-eye "></i>
            <span className="value">{ad?.view_count}</span>
          </div>
        ) : null}
        {ad?.phones_count || ad?.phones_count === 0 ? (
          <div className="statistic">
            <i className="fa-regular fa-phone "></i>
            <span className="value">{ad?.phones_count}</span>
          </div>
        ) : null}
        {ad?.chats_count || ad?.chats_count === 0 ? (
          <div className="statistic">
            <i className="fa-regular fa-comment-lines "></i>
            <span className="value">{ad?.chats_count}</span>
          </div>
        ) : null}
        {ad?.favorites_count || ad?.favorites_count === 0 ? (
          <div className="statistic">
            <i className="fa-regular fa-heart "></i>
            <span className="value">{ad?.favorites_count}</span>
          </div>
        ) : null}
      </div>
      <ConfirmationModal
        showModal={showConfirmation}
        setShowModal={setShowConfirmation}
        type="delete"
        eventFun={deleteAd}
        buttonText={t("delete")}
        loading={loading}
        text={t("ads.areYouSureYouWantToDeleteAD")}
      />
    </Link>
  );
}

export default RewardCard;
