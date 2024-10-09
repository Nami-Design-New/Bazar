import { Link, useNavigate } from "react-router-dom";
import { IconMessageCircle, IconPhone } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useQueryClient } from "@tanstack/react-query";
import { adUserMemberShip } from "../utils/helpers";
import AdDetailsSlider from "../components/ad-details/AdDetailsSlider";
import DataLoader from "../ui/DataLoader";
import useGetAdById from "./../hooks/ads/useGetAdById";
import Post from "./../ui/cards/Post";
import "swiper/swiper-bundle.css";
import useFollow from "../hooks/useFollow";
import useUnfollow from "../hooks/useUnfollow";
import axios from "../utils/axios";
import { toast } from "react-toastify";
import AdTabs from "../components/ad-details/AdTabs";
const containerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "12px",
  overflow: "hidden",
};
function AdDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const lang = useSelector((state) => state.language.lang);
  const user = useSelector((state) => state.authedUser.user);
  const isLogged = useSelector((state) => state.authedUser.isLogged);
  const { isLoading, data: ad } = useGetAdById();

  const { follow, isLoading: followingLoading } = useFollow();
  const { unfollow, isLoading: unfollowingLoading } = useUnfollow();
  const isMyAd = Number(ad?.data?.user?.id) === Number(user?.id);

  const openChat = async () => {
    if (isLogged) {
      sessionStorage.setItem("buyer_id", user?.id);
      sessionStorage.setItem("seller_id", ad?.data?.user_id);
      sessionStorage.setItem("ad_id", ad?.data?.id);
      navigate("/chats");
    } else {
      navigate("/login");
    }
  };
  const handleIncreasePhoneCount = async () => {
    if (isLogged) {
      try {
        await axios.post(
          "/user/increase_phone_count",
          {
            ids: ad?.data?.id,
          },
          {
            onSuccess: (res) => {
              if (res?.data?.code !== 200 || res?.data?.code !== 201)
                throw new Error(res?.message);
              else {
                queryClient.invalidateQueries([
                  "userAds",
                  "adsByFilter",
                  "favoriteAds",
                ]);
                queryClient.invalidateQueries(["adById", ad?.id]);
              }
            },
          }
        );
      } catch (err) {
        toast.error(t("commissions.failed"));
        throw new Error(err.message);
      }
    } else {
      navigate("/login");
    }
  };
  const navigateToLogin = () => {
    if (!isLogged) {
      navigate("/login");
    }
  };

  function handleToggleFollowing(e) {
    e.stopPropagation();
    e.preventDefault();
    if (isLogged) {
      if (ad?.data?.user?.is_follow) {
        unfollow({ id: ad?.data?.user?.id, type: "user" });
      } else {
        follow({
          id: ad?.data?.user?.id,
          type: "user",
        });
      }
    } else {
      navigate("/login");
    }
  }

  return isLoading ? (
    <DataLoader />
  ) : ad?.data ? (
    <>
      <section className="itemDetails">
        <div className="container">
          <div className="row px-2">
            <div className="col-lg-8 d-flex flex-column gap-4 p-0 pb-3 p-md-3">
              <div className="col-12 p-2">
                <AdDetailsSlider images={ad?.data?.images} />
              </div>

              <div className="col-12 p-2">
                <AdTabs ad={ad} isMyAd={isMyAd} />
              </div>
            </div>
            <div className="col-lg-4 p-0 p-md-3">
              <div className="advertiserDetails mb-3">
                <Link
                  to={`/profile/${ad?.data?.user?.id}`}
                  className="advertiser"
                >
                  <div
                    className="image-wrapper"
                    style={{ position: "relative" }}
                  >
                    <img src={ad?.data?.user?.image} loading="lazy" alt="" />
                    {ad?.data?.user?.verified ? (
                      <div className="verified-badge">
                        <i className="fa-regular fa-badge-check"></i>
                      </div>
                    ) : null}
                  </div>
                  <h3 className="name">
                    {" "}
                    {ad?.data?.user?.name || "Ahmed Elsayed"}{" "}
                  </h3>
                </Link>
                <span className="date">
                  {" "}
                  {t("memberSince")}{" "}
                  {adUserMemberShip(ad?.data?.user?.created_at, lang)}
                </span>
                {isMyAd ? null : (
                  <div className="btns-wrapper">
                    <button
                      className={`action-btn follow ${
                        ad?.data?.user?.is_follow ? "following" : ""
                      }`}
                      onClick={handleToggleFollowing}
                      disabled={followingLoading || unfollowingLoading}
                    >
                      <i
                        className={`fa-regular fa-user-${
                          ad?.data?.user?.is_follow ? "check" : "plus"
                        }`}
                      ></i>
                      {/* {ad?.data?.user?.is_follow ? t("following") : t("follow")} */}
                    </button>
                  </div>
                )}
                <div className="contact">
                  {ad?.data?.chat && !isMyAd ? (
                    <button className="chat" onClick={openChat}>
                      <IconMessageCircle stroke={1.5} />
                      <span> {t("chating")} </span>
                    </button>
                  ) : null}
                  {ad?.data?.phone && !isMyAd ? (
                    <Link
                      target={isLogged ? "_blank" : "_self"}
                      to={!isLogged ? "/login" : `tel:${ad?.data?.phone}`}
                      className="call"
                      onClick={handleIncreasePhoneCount}
                    >
                      <IconPhone stroke={1.5} />
                      <span> {t("calling")} </span>
                    </Link>
                  ) : null}
                  {ad?.data?.whatsapp && !isMyAd ? (
                    <Link
                      target={isLogged ? "_blank" : "_self"}
                      to={
                        !isLogged
                          ? "/login"
                          : `https://wa.me/${ad?.data?.whatsapp}`
                      }
                      className="chat"
                      onClick={navigateToLogin}
                    >
                      <IconMessageCircle stroke={1.5} />
                      <span> {t("ads.whatsapp")} </span>
                    </Link>
                  ) : null}
                </div>
              </div>
              <div className="itemDetailsBox mb-3">
                <h4 className="title">{t("safetyTitle")}</h4>
                <ul>
                  <li>
                    <p>{t("safety1")}</p>
                  </li>
                  <li>
                    <p>{t("safety2")}</p>
                  </li>
                  <li>
                    <p>{t("safety3")}</p>
                  </li>
                  <li>
                    <p>{t("safety4")}</p>
                  </li>
                </ul>
              </div>
              <div className="itemDetailsBox mb-3">
                <LoadScript googleMapsApiKey="AIzaSyD_N1k4WKCdiZqCIjjgO0aaKz1Y19JqYqw">
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={{
                      lat: ad?.data?.lat,
                      lng: ad?.data?.lng,
                    }}
                    zoom={10}
                  >
                    <Marker
                      icon="/images/map-pin.svg"
                      position={{
                        lat: ad?.data?.lat,
                        lng: ad?.data?.lng,
                      }}
                    ></Marker>
                  </GoogleMap>
                </LoadScript>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* similar ads */}
      <section className="similar_ads">
        <div className="slider_wrap">
          <div className="container">
            <div className="topHead">
              <div className="sectionTitle">
                <h4 className="title">{t("similar_ads")}</h4>
              </div>
              <div className="swiperControl">
                <div className="swiperBtns">
                  <div className={`swiper-button-next similar-next`} />
                  <div className={`swiper-button-prev similar-prev`} />
                </div>
              </div>
            </div>
            <Swiper
              spaceBetween={12}
              slidesPerView={4}
              speed={1000}
              loop={true}
              modules={[Autoplay, Navigation]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              className="mainSliderContainer"
              navigation={{
                nextEl: `similar-next`,
                prevEl: `similar-prev`,
              }}
              breakpoints={{
                992: {
                  slidesPerView: 4,
                },
                768: {
                  slidesPerView: 2,
                },
                350: {
                  slidesPerView: 1,
                },
                0: {
                  slidesPerView: 1,
                },
              }}
            >
              {ad?.data?.similar_ads && ad?.data?.similar_ads?.length > 0 && (
                <>
                  {ad?.data?.similar_ads?.map((ad) => (
                    <SwiperSlide key={ad.id}>
                      <Post post={ad} />
                    </SwiperSlide>
                  ))}
                </>
              )}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  ) : (
    <section className="error-section">
      <img src="/images/error.svg" alt="error image" />
      <h2>{t("error.pageNotFound")}</h2>
      <Link to="/" className="backhome">
        <i className="fa-solid fa-home"></i>
        <span>{t("error.goHome")}</span>
      </Link>
    </section>
  );
}
export default AdDetails;
