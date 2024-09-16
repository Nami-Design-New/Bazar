import { useTranslation } from "react-i18next";
import SectionHeader from "../ui/layout/SectionHeader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { subscriptionRemainingDays } from "../utils/helpers";
import ProfileTabs from "../features/profile/ProfileTabs";
import useGetUserById from "../features/profile/useGetUserById";

import errorImg from "../assets/images/error.svg";

function Profile() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [user, setUser] = useState({});
  const authedUser = useSelector((state) => state.authedUser.user);
  const { data: profile } = useGetUserById(user?.id);
  const navigate = useNavigate();

  const isMyAccount = !id || Number(id) === Number(authedUser?.id);

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

  return (
    <section className="profile-page profile">
      <SectionHeader />
      {user ? (
        <div className="content-wrapper container col-lg-10 col-12">
          <div className="row">
            <div className="userInfo">
              <div className="top-wrapper">
                <div className="user-avatar-wrapper">
                  <img className="userImg" src={user?.image} alt="" />
                  {user?.verified ? (
                    <div className="verified-badge">
                      <i className="fa-solid fa-badge-check"></i>
                    </div>
                  ) : null}
                </div>
                <div className="userName">
                  <h4 className="name"> {user?.name} </h4>
                  <h6 className="email">{user?.email}</h6>
                  <div className="userDetails">
                    {user?.phone && (
                      <span className="details-box phone">
                        <i className="fa-regular fa-phone "></i>
                        +966{user?.phone}
                      </span>
                    )}
                    {/* <span className="details-box location">
                    <i className="fa-sharp fa-solid fa-location-dot "></i>
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
                    {subscriptionRemainingDays(user?.end_date) > 0 ? (
                      <span className="verification-item">
                        <i className="fa-regular fa-box-circle-check "></i>
                        {t("profile.verifiedCommercial")}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="action-boxes">
                  <div className="following-details">
                    {(user?.follow_count || user?.follow_count === 0) && (
                      <div className="details-box">
                        <span className="value ">
                          {user?.following_count}
                        </span>
                        <span className="title">{t("profile.followings")}</span>
                      </div>
                    )}
                    {(user?.follow_count || user?.follow_count === 0) && (
                      <div className="details-box">
                        <span className="value ">
                          {user?.follow_count}
                        </span>
                        <span className="title">{t("profile.followers")}</span>
                      </div>
                    )}
                    {(user?.ad_count || user?.ad_count === 0) && (
                      <div className="details-box">
                        <span className="value ">
                          {user?.ad_count}
                        </span>
                        <span className="title">{t("profile.ad")}</span>
                      </div>
                    )}
                  </div>
                  {!isMyAccount && (
                    <div className="actions-wrapper">
                      <span className="action-btn follow">
                        <i
                          className={`fa-regular fa-user-${
                            user?.is_follow ? "check" : "plus"
                          }`}
                        ></i>
                        {user?.is_follow ? t("following") : t("follow")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <ProfileTabs user={user} isMyAccount={isMyAccount} />
          </div>
        </div>
      ) : (
        <section className="error-section">
          <img src={errorImg} alt="error image" />
          <h2>{t("error.noAccountWithThisId")}</h2>
          <Link to="/" className="backhome">
            <i className="fa-solid fa-home"></i>
            <span>{t("error.goHome")}</span>
          </Link>
        </section>
      )}
    </section>
  );
}

export default Profile;
