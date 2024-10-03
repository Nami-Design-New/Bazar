import { Link, useNavigate } from "react-router-dom";
import useFollow from "../../hooks/useFollow";
import useUnfollow from "../../hooks/useUnfollow";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function UserCard({ user, type }) {
  console.log(type, user);
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
            onSuccess: () => {
              queryClient.invalidateQueries(["userById", user?.id]);
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
            onSuccess: () => {
              queryClient.invalidateQueries(["userById", user?.id]);
            },
          }
        );
      }
    } else {
      navigate("/login");
    }
  }

  return (
    <Link to={`/profile/${user?.user?.id}`} className="user-card">
      <div className="image-wrapper">
        <img src={user?.user?.image} alt="" />
      </div>
      <div className="info">
        <h6>{user?.user?.name}</h6>
      </div>
      {!isMyAccount && (
        <div className="actions-wrapper">
          <button
            className={`custom-btn filled follow ${
              user?.is_follow ? "following" : ""
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
              {user?.is_follow ? t("following") : t("follow")}
            </span>
          </button>
        </div>
      )}
    </Link>
  );
}

export default UserCard;
