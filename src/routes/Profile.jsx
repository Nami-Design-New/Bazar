import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import SectionHeader from "../ui/layout/SectionHeader";
import { subscriptionRemainingDays } from "../utils/helpers";
import ProfileTabs from "../components/profile/ProfileTabs";
import useGetUserById from "./../components/profile/useGetUserById";
import DataLoader from "../ui/DataLoader";
import useFollow from "../hooks/useFollow";
import useUnfollow from "../hooks/useUnfollow";
import { Dropdown } from "react-bootstrap";
import ConfirmationModal from "../ui/modals/ConfirmationModal";
import { toast } from "react-toastify";
import { logout, setIsLogged } from "../redux/slices/authedUser";
import axios from "../utils/axios";
import ReportModal from "../ui/modals/ReportModal";
import EmptyData from "../ui/EmptyData";
import Post from "../ui/cards/Post";
import { IconCirclePlus } from "@tabler/icons-react";
import useUserAds from "../hooks/ads/useUserAds";
import { useQueryClient } from "@tanstack/react-query";

function Profile() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [user, setUser] = useState({});
  const authedUser = useSelector((state) => state.authedUser.user);
  const { isLoading, data: profile } = useGetUserById(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.authedUser.isLogged);

  const queryClient = useQueryClient();

  const { isLoading: adsLoading, data: ads } = useUserAds(user?.id);

  const isMyAccount = !id || Number(id) === Number(authedUser?.id);

  const { follow, isLoading: followingLoading } = useFollow();
  const { unfollow, isLoading: unfollowingLoading } = useUnfollow();

  // const timeDifference = getTimeDifference(user?.start_date);
  // const packageCreationTime = formatTimeDifference(
  //   timeDifference.years,
  //   timeDifference.months,
  //   timeDifference.days,
  //   timeDifference.hours,
  //   timeDifference.minutes,
  //   t
  // );

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
        unfollow(
          {
            id: user?.id,
            type: "user",
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries(["userById", id]);
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
              queryClient.invalidateQueries(["userById", id]);
            },
          }
        );
      }
    } else {
      navigate("/login");
    }
  }

  const handleDeleteAccount = async () => {
    try {
      setDeleteLoading(true);
      const res = await handleDeleteAccount();
      if (res.data.code === 200) {
        delete axios.defaults.headers.common["Authorization"];
        toast.success(t("cart.orderSuccess"));
        dispatch(setUser({}));
        dispatch(setIsLogged(false));
        dispatch(logout());
        navigate("/");
      } else {
        toast.error(res.message);
        console.error(res.message);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setDeleteLoading(false);
      setShowDeleteModal(false);
    }
  };

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
                      <div className="user-dropdown d-flex algin-items-center justify-content-end">
                        <Dropdown>
                          <Dropdown.Toggle className="butn" id="dropdown-basic">
                            <i className="fa-regular fa-ellipsis-vertical"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            {isMyAccount ? (
                              <Dropdown.Item
                                onClick={() => setShowDeleteModal(true)}
                              >
                                {t("profile.deleteAccount")}
                              </Dropdown.Item>
                            ) : (
                              <Dropdown.Item
                                onClick={() => setShowReportModal(true)}
                              >
                                {t("profile.report")}
                              </Dropdown.Item>
                            )}
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
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
                          {isMyAccount && (
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
                            </div>
                          )}
                          <div className="verification-details">
                            {user?.fal_verified ? (
                              <span className="verification-item">
                                <i className="fa-regular fa-memo-circle-check "></i>
                                {t("profile.verifiedVal")}
                              </span>
                            ) : null}
                          </div>
                        </div>
                        <div className="action-boxes mt-4">
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
                                className={`custom-btn filled follow ${
                                  user?.is_follow ? "following" : ""
                                }`}
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
                                {/* <span className="verification-item">
                                  <i className="fa-regular fa-clock"></i>
                                  <span className="colored">
                                    {packageCreationTime}
                                  </span>
                                </span> */}
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
                          {isMyAccount && (
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
                                    style={{ minWidth: "160px" }}
                                  >
                                    <span>
                                      <i className="fa-solid fa-recycle"></i>
                                      {t(`profile.renewSubscribe`)}
                                    </span>
                                  </Link>
                                )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {isMyAccount ? (
                    <ProfileTabs user={user} isMyAccount={isMyAccount} />
                  ) : (
                    <>
                      {isMyAccount && (
                        <div className="w-100 btn-wrapper d-flex justify-content-end mb-3 p-2">
                          <Link to="/add-ad" className="custom-btn stroke">
                            <span>
                              <IconCirclePlus stroke={2} /> {t("ads.addAD")}
                            </span>
                          </Link>
                        </div>
                      )}
                      {adsLoading ? (
                        <DataLoader minHeight="400px" />
                      ) : ads?.data && ads?.data?.length > 0 ? (
                        ads?.data?.map((ad) => (
                          <div
                            className="col-lg-3 col-md-6 col-12 p-2"
                            key={ad?.id}
                          >
                            <Post
                              userId={user?.id}
                              post={ad}
                              isMyAccount={isMyAccount}
                              isMyPost={true}
                            />
                          </div>
                        ))
                      ) : (
                        <EmptyData minHeight={"300px"}>
                          {t("profile.noAds")}
                        </EmptyData>
                      )}
                    </>
                  )}
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
      <ConfirmationModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        type="delete"
        eventFun={handleDeleteAccount}
        loading={deleteLoading}
        buttonText={t("delete")}
        text={t("auth.areYouSureYouWantToDeleteAccount")}
      />
      <ReportModal
        id={user?.id}
        type="user"
        showModal={showReportModal}
        setShowModal={setShowReportModal}
      />
    </>
  );
}

export default Profile;
