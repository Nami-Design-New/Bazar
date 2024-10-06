import { Link, useNavigate } from "react-router-dom";
import useFollow from "../../hooks/useFollow";
import useUnfollow from "../../hooks/useUnfollow";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function UserCard({ user, type }) {
  const { t } = useTranslation();
  const { authedUser, isLogged } = useSelector((state) => state.authedUser);
  const isMyAccount = !user || Number(user?.id) === Number(authedUser?.id);
  const queryClient = useQueryClient();
  const { follow, isLoading: followingLoading } = useFollow();
  const { unfollow, isLoading: unfollowingLoading } = useUnfollow();

  const navigate = useNavigate();

  function handleToggleFollowing(e) {
    e.stopPropagation();
    e.preventDefault();

    if (isLogged) {
      if (user?.is_follow) {
        unfollow(
          {
            id: user?.id,
            type: "user",
          },
          {
            onSuccess: (res) => {
              if (res?.code !== 200) throw new Error(res?.message);
              else {
                queryClient.invalidateQueries(["userById", user?.id]);
              }
            },
          }
        );
      } else {
        follow(
          {
            id: user?.id,
            type: "user",
          },
          {
            onSuccess: (res) => {
              if (res?.code !== 200) throw new Error(res?.message);
              else {
                queryClient.invalidateQueries(["userById", user?.id]);
              }
            },
          }
        );
      }
    } else {
      navigate("/login");
    }
  }

  return type === "following" && user?.followed ? (
    <Link
      to={`/profile/${
        type === "following" ? user?.followed_id : user?.user_id
      }`}
      className="user-card"
    >
      <div className="image-wrapper">
        <img
          src={type === "following" ? user?.followed?.image : user?.user?.image}
          alt=""
        />
      </div>
      <div className="info">
        <h6>
          {type === "following" ? user?.followed?.name : user?.user?.name}
        </h6>
      </div>
      {!isMyAccount && (
        <div className="actions-wrapper">
          <button
            className={`custom-btn filled follow ${
              type === "following"
                ? user?.followed?.is_follow
                  ? "following"
                  : ""
                : user?.is_follow
                ? "following"
                : ""
            }`}
            onClick={handleToggleFollowing}
            disabled={followingLoading || unfollowingLoading}
            style={{
              border: "none !important",
              outline: "none !important",
            }}
          >
            <span>
              <i
                className={`fa-regular fa-user-${
                  user?.is_follow ? "check" : "plus"
                }`}
              ></i>
              {type === "following"
                ? user?.followed?.is_follow
                  ? t("following")
                  : t("follow")
                : user?.is_follow
                ? t("following")
                : t("follow")}
            </span>
          </button>
        </div>
      )}
    </Link>
  ) : null;
}

export default UserCard;
