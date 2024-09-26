import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { formatTimeDifference, getTimeDifference } from "../../utils/helpers";
import ConfirmationModal from "../modals/ConfirmationModal";
import { useState } from "react";
import axios from "./../../utils/axios";
import { toast } from "react-toastify";
import useUserAds from "../../hooks/ads/useUserAds";
import useAddToFavorite from "../../hooks/useAddToFavorite";
import { useSelector } from "react-redux";
import useRemoveFromFavorite from "../../hooks/useRemoveFromFavorite";
import {
  IconEye,
  IconHeart,
  IconMessageCircle,
  IconPhone,
  IconStar,
} from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";

function Post({ post, category, isMyAccount, userId, type, isMyPost = false }) {
  const { t } = useTranslation();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const { refetch } = useUserAds();
  const { addToFavorite, isLoading: addingLoading } = useAddToFavorite();
  const { removeFromFavorite, isLoading: removingLoading } =
    useRemoveFromFavorite();
  const isLogged = useSelector((state) => state.authedUser.isLogged);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const timeDifference = getTimeDifference(post?.created_at);
  const creationTime = formatTimeDifference(
    timeDifference.years,
    timeDifference.months,
    timeDifference.days,
    timeDifference.hours,
    timeDifference.minutes,
    t
  );

  function handleToggleFavorite(e) {
    e.stopPropagation();
    e.preventDefault();
    if (isLogged) {
      if (post?.is_favorite) {
        removeFromFavorite(
          { id: post?.id, type: "ad_id" },
          {
            onSuccess: () => {
              queryClient.invalidateQueries([
                "userAds",
                "adsByFilter",
                "favoriteAds",
              ]);
            },
          }
        );
      } else {
        addToFavorite(
          {
            id: post?.id,
            type: "ad_id",
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries([
                "userAds",
                "adsByFilter",
                "favoriteAds",
              ]);
            },
          }
        );
      }
    } else {
      navigate("/login");
    }
  }

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
      const res = await axios.post("/user/delete_ad", { id: post?.id });
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
      to={`/ad-details/${post?.id}`}
      className="item"
      onClick={(e) => {
        e.stopPropagation();
        handleLinkClick();
      }}
    >
      <div className="actions-wrapper">
        {!isMyPost && (
          <button
            className={`action favorite ${post?.is_favorite ? "active" : ""}`}
            onClick={handleToggleFavorite}
            disabled={removingLoading || addingLoading}
          >
            <img src="/images/heart.svg" alt="" />
          </button>
        )}
        {isMyAccount && (
          <>
            <button
              className={`action delete`}
              onClick={handleOpenConfirmation}
            >
              <i className="fa-regular fa-trash "></i>
            </button>
            <Link to={`/add-ad/${post?.id}`} className={`action edit`}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </>
        )}
      </div>

      <Link to={`/ad-details/${post?.id}`} className="itemImg">
        <img src={post?.image?.image} loading="lazy" alt="" />
      </Link>

      <div className="itemInfo">
        {/* <Link className="advertiser">
          <img
            src={post?.user?.image || "/images/user (13).png"}
            loading="lazy"
            alt=""
          />
        </Link> */}

        {post?.created_at && creationTime ? (
          <div className="time">
            <img src="/images/clock.svg" alt="" /> {creationTime}
          </div>
        ) : null}

        {post?.title && (
          <h3 to={`/ad-details/${post?.id}`} className="title">
            {post?.title}
          </h3>
        )}

        {post?.description && (
          <p className="description one-line-wrap">{post?.description}</p>
        )}

        {post?.address ? (
          <div className="location">
            <img src="/images/location.svg" alt="" />
            <span className=" one-line-wrap"> {post?.address} </span>
          </div>
        ) : null}

        {type !== "reward" && (
          <div className="itemBottom">
            <Link
              to={`/ads?category_id=${category?.id}`}
              className="category"
              onClick={(e) => e.stopPropagation()}
            >
              {category && category?.image && (
                <>
                  <span className="img">
                    <img src={category?.image} alt="" />
                  </span>
                  {category?.name}
                </>
              )}
            </Link>

            {post?.price ? (
              <div className="price">
                <span>
                  {" "}
                  {post?.price} {t("currency.sar")}{" "}
                </span>
              </div>
            ) : null}
          </div>
        )}
        {isMyPost &&
          (type !== "reward" ? (
            post?.view_count ||
            post?.view_count === 0 ||
            post?.chats_count ||
            post?.chats_count === 0 ||
            post?.phones_count ||
            post?.phones_count === 0 ? (
              <div className="itemBottom statics-wrapper justify-content-around">
                {post?.view_count || post?.view_count === 0 ? (
                  <div className="static-box">
                    <IconEye stroke={1.5} />
                    <span>{post?.view_count}</span>
                  </div>
                ) : null}
                {post?.chats_count || post?.chats_count === 0 ? (
                  <div className="static-box">
                    <IconMessageCircle stroke={1.5} />
                    <span>{post?.chats_count}</span>
                  </div>
                ) : null}
                {post?.phones_count || post?.phones_count === 0 ? (
                  <div className="static-box">
                    <IconPhone stroke={1.5} />
                    <span>{post?.phones_count}</span>
                  </div>
                ) : null}
              </div>
            ) : null
          ) : post?.favorites_count || post?.favorites_count === 0 ? (
            <div className="itemBottom statics-wrapper justify-content-around">
              {post?.favorites_count || post?.favorites_count === 0 ? (
                <div className="static-box">
                  <IconHeart stroke={1.5} />
                  <span>{post?.favorites_count}</span>
                </div>
              ) : null}
              {post?.rate || post?.rate === 0 ? (
                <div className="static-box">
                  <IconStar stroke={1.5} />
                  <span>{post?.rate}</span>
                </div>
              ) : null}
            </div>
          ) : null)}
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

export default Post;
