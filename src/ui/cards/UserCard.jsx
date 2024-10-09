import { Link } from "react-router-dom";
import useFollow from "../../hooks/useFollow";
import useUnfollow from "../../hooks/useUnfollow";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function UserCard({ user, type }) {
  const { t } = useTranslation();
  const { authedUser } = useSelector((state) => state.authedUser);
  const isMyAccount = !user || Number(user?.id) === Number(authedUser?.id);
  const { follow, isLoading: followingLoading } = useFollow();
  const { unfollow, isLoading: unfollowingLoading } = useUnfollow();

  function handleToggleFollowing(e) {
    e.stopPropagation();
    e.preventDefault();

    console.log(user);

    if (user?.type === "market") {
      if (user?.market?.is_follow) {
        unfollow({
          id: user?.market?.id,
          type: "market",
        });
      } else {
        follow({
          id: user?.market?.id,
          type: "market",
        });
      }
    } else {
      if (user?.user?.is_follow) {
        unfollow({
          id: user?.user?.id,
          type: "user",
        });
      } else {
        follow({
          id: user?.user?.id,
          type: "user",
        });
      }
    }
  }

  return (
    <Link
      to={`${
        user?.type === "market"
          ? `/market-details/${user?.market?.id}`
          : `/profile/${user?.user?.id} `
      }`}
      className="user-card"
    >
      <div className="image-wrapper">
        <img
          src={user?.type === "market" ? user?.market?.logo : user?.user?.image}
          alt=""
        />
      </div>
      <div className="info d-flex align-items-center flex-column ">
        <h6>
          {user?.type === "market" ? user?.market?.name : user?.user?.name}
        </h6>
        {type !== "follower" ? (
          <span style={{ fontSize: "12px" }}>( {user?.type} )</span>
        ) : null}
      </div>
      {!isMyAccount && (
        <div className="actions-wrapper">
          <button
            className={`custom-btn filled follow ${
              user?.type === "market"
                ? user?.market?.is_follow
                  ? "followed-user"
                  : ""
                : user?.user?.is_follow
                ? "followed-user"
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
                  user?.type === "market"
                    ? user?.market?.is_follow
                      ? "check"
                      : "plus"
                    : user?.user?.is_follow
                    ? "check"
                    : "plus"
                }`}
              ></i>
              {user?.type === "market"
                ? user?.market?.is_follow
                  ? t("following")
                  : t("follow")
                : user?.user?.is_follow
                ? t("following")
                : t("follow")}
            </span>
          </button>
        </div>
      )}
    </Link>
  );
}

export default UserCard;
