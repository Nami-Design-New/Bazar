import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import SectionHeader from "../ui/layout/SectionHeader";
import {
  formatTimeDifference,
  getTimeDifference,
  subscriptionRemainingDays,
} from "../utils/helpers";
import ProfileTabs from "../components/profile/ProfileTabs";
import useGetUserById from "./../components/profile/useGetUserById";
import DataLoader from "../ui/DataLoader";
import useFollow from "../hooks/useFollow";
import useUnfollow from "../hooks/useUnfollow";

function Profile() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [user, setUser] = useState({});
  const authedUser = useSelector((state) => state.authedUser.user);
  const { isLoading, data: profile } = useGetUserById(id);
  const navigate = useNavigate();
  const isLogged = useSelector((state) => state.authedUser.isLogged);

  const isMyAccount = !id || Number(id) === Number(authedUser?.id);

  const { follow, isLoading: followingLoading } = useFollow();
  const { unfollow, isLoading: unfollowingLoading } = useUnfollow();

  const timeDifference = getTimeDifference(user?.package?.created_at);
  const packageCreationTime = formatTimeDifference(
    timeDifference.years,
    timeDifference.months,
    timeDifference.days,
    timeDifference.hours,
    timeDifference.minutes,
    t
  );

  useEffect(() => {
    if (id) {
      if (Number(id) === Number(authedUser?.id)) {
        setUser(authedUser);
      } else {
        setUser(profile);
      }
    } else {
      if (authedUser) {
        setUser(authedUser);
      } else {
        navigate("/login");
      }
    }
  }, [isMyAccount, authedUser, profile, id, setUser, navigate]);

  function handleToggleFollowing(e) {
    e.stopPropagation();
    e.preventDefault();

    if (isLogged) {
      if (user?.is_follow) {
        unfollow({
          id: user?.id,
          type: "user",
        });
      } else {
        follow({
          id: user?.id,
          type: "user",
        });
      }
    } else {
      navigate("/login");
    }
  }

  return (
    <>
      <SectionHeader />
      {isLoading ? (
        <DataLoader minHeight="200px" />
      ) : (
        <section className="profile-page profile">
          {user ? (
            <div className="content-wrapper">
              <div className="container">
                <div className="row m-0">
                  <div className="col-12 p-2 d-flex flex-column gap-3">
                    <div className="userInfo">
                      <div className="top-wrapper">
                        <div className="user-avatar-wrapper">
                          <img className="userImg" src={user?.image} alt="" />
                          {user?.verified ? (
                            <div className="verified-badge">
                              <i className="fa-regular fa-badge-check"></i>
                            </div>
                          ) : null}
                        </div>
                        <div className="userName">
                          <h4 className="name"> {user?.name} </h4>
                          <h6 className="email">{user?.email}</h6>
                          <div className="userDetails">
                            {user?.phone && (
                              <Link
                                to={`tel:+966${user?.phone}`}
                                className="details-box phone"
                              >
                                <i className="fa-regular fa-phone "></i>
                                +966{user?.phone}
                              </Link>
                            )}
                            {/* <span className="details-box location">
      <i className="fa-sharp fa-regular fa-location-\ "></i>
      السعودية, الرياض
    </span> */}
                          </div>
                          <div className="verification-details">
                            {user?.fal_verified ? (
                              <span className="verification-item">
                                <i className="fa-regular fa-memo-circle-check "></i>
                                {t("profile.verifiedVal")}
                              </span>
                            ) : null}
                          </div>
                        </div>
                        <div className="action-boxes">
                          <div className="following-details">
                            {(user?.follow_count ||
                              user?.follow_count === 0) && (
                              <div className="details-box">
                                <span className="value ">
                                  {user?.following_count}
                                </span>
                                <span className="title">
                                  {t("profile.followings")}
                                </span>
                              </div>
                            )}
                            {(user?.follow_count ||
                              user?.follow_count === 0) && (
                              <div className="details-box">
                                <span className="value ">
                                  {user?.follow_count}
                                </span>
                                <span className="title">
                                  {t("profile.followers")}
                                </span>
                              </div>
                            )}
                            {(user?.ad_count || user?.ad_count === 0) && (
                              <div className="details-box">
                                <span className="value ">{user?.ad_count}</span>
                                <span className="title">{t("profile.ad")}</span>
                              </div>
                            )}
                          </div>
                          {!isMyAccount && (
                            <div className="actions-wrapper">
                              <button
                                className="custom-btn filled follow"
                                onClick={handleToggleFollowing}
                                disabled={
                                  followingLoading || unfollowingLoading
                                }
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
                                  {user?.is_follow
                                    ? t("following")
                                    : t("follow")}
                                </span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {subscriptionRemainingDays(user?.end_date) > 0 && (
                      <div className="userInfo">
                        <div className="top-wrapper package-container">
                          <div className="userName d-flex flex-column ">
                            <div className="verification-details">
                              {subscriptionRemainingDays(user?.end_date) > 0 ? (
                                <span className="verification-item">
                                  <i className="fa-regular fa-box-circle-check "></i>
                                  {t("profile.verifiedCommercial")}
                                </span>
                              ) : null}
                              <div className="d-flex align-items-center gap-4 flex-wrap">
                                <span className="verification-item">
                                  <i className="fa-regular fa-clock"></i>
                                  <span className="colored">
                                    {packageCreationTime}
                                  </span>
                                </span>
                                <span className="verification-item">
                                  <i className="fa-regular fa-calendar-days"></i>
                                  <span className="colored">
                                    {user?.package?.days}{" "}
                                    {t(
                                      `${
                                        user?.package?.days > 1 &&
                                        user?.package?.days < 11
                                          ? "days"
                                          : "day"
                                      }`
                                    )}
                                  </span>
                                </span>
                                <span className="verification-item">
                                  <i className="fa-regular fa-money-check-dollar"></i>
                                  <span className="colored">
                                    {user?.package?.price}{" "}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="action-boxes">
                            <div className="remainingDays d-flex align-items-center gap-2">
                              {t("profile.remainingDays")}
                              <span>
                                {subscriptionRemainingDays(user?.end_date)}{" "}
                                {t(
                                  `${
                                    user?.package?.days > 1 &&
                                    user?.package?.days < 11
                                      ? "days"
                                      : "day"
                                  }`
                                )}
                              </span>
                            </div>
                            {subscriptionRemainingDays(user?.end_date) <= 1 &&
                              isMyAccount && (
                                <Link
                                  to="/commercial-verification"
                                  className="btn-box custom-btn filled"
                                >
                                  <span>{t(`profile.renewSubscribe`)}</span>
                                </Link>
                              )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <ProfileTabs user={user} isMyAccount={isMyAccount} />
                </div>
              </div>
            </div>
          ) : (
            <section className="error-section">
              <img src="/images/error.svg" alt="error image" />
              <h2>{t("error.noAccountWithThisId")}</h2>
              <Link to="/" className="backhome">
                <i className="fa-regular fa-home"></i>
                <span>{t("error.goHome")}</span>
              </Link>
            </section>
          )}
        </section>
      )}
    </>
  );
}

export default Profile;
