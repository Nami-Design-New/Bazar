import { Link, useNavigate } from "react-router-dom";
import { IconMessageCircle, IconPhone } from "@tabler/icons-react";
import {
  adUserMemberShip,
  formatTimeDifference,
  getTimeDifference
} from "../utils/helpers";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import AdDetailsSlider from "../components/ad-details/AdDetailsSlider";
import DataLoader from "../ui/DataLoader";
import useGetAdById from "./../hooks/ads/useGetAdById";
import "swiper/swiper-bundle.css";
import Post from "./../ui/cards/Post";
import useAddToFavorite from "../hooks/useAddToFavorite";
import useRemoveFromFavorite from "../hooks/useRemoveFromFavorite";

function AdDetails() {
  const { t } = useTranslation();
  const { isLoading, data: ad } = useGetAdById();
  const lang = useSelector((state) => state.language.lang);
  const navigate = useNavigate();
  const user = useSelector((state) => state.authedUser.user);
  const currentPageLink = window.location.href;
  const { addToFavorite, isLoading: addingLoading } = useAddToFavorite();
  const { removeFromFavorite, isLoading: removingLoading } =
    useRemoveFromFavorite();
  const isLogged = useSelector((state) => state.authedUser.isLogged);

  const timeDifference = getTimeDifference(ad?.data?.created_at);
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
      if (ad?.is_favorite) {
        removeFromFavorite({ id: ad?.id, type: "ad_id" });
      } else {
        addToFavorite({
          id: ad?.id,
          type: "ad_id"
        });
      }
    } else {
      navigate("/login");
    }
  }

  const openChat = () => {
    console.log(user);

    sessionStorage.setItem("buyer_id", user?.id);
    sessionStorage.setItem("seller_id", ad?.data?.user_id);
    sessionStorage.setItem("ad_id", ad?.data?.id);

    navigate("/chats");
  };

  const socialShareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentPageLink}`,
    instagram: `https://www.instagram.com/?url=${currentPageLink}`,
    twitter: `https://twitter.com/intent/tweet?url=${currentPageLink}`,
    whatsapp: `https://wa.me/?text=${currentPageLink}`
  };

  return isLoading ? (
    <DataLoader />
  ) : ad?.data ? (
    <>
      <section className="itemDetails">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 d-flex flex-column gap-4 p-0 pb-3 p-md-3">
              <AdDetailsSlider images={ad?.data?.images} />

              <div className="priceInfo">
                <div className="price">
                  <span> ${ad?.data?.price || 200} </span>
                </div>
                <button
                  className={`favorite ${
                    ad?.data?.is_favorite ? "active" : ""
                  }`}
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
                </div>
              </div>

              <div className="itemInfo">
                <h3 className="title">
                  {ad?.data?.title || "Apple MacBook Air (2023) Apple M2 Chip"}
                </h3>

                <div className="itemBottom">
                  <Link className="location">
                    <img src="/images/location.svg" alt="" />
                    <span> {ad?.data?.address} </span>
                  </Link>
                  <div className="time">
                    <img src="/images/clock.svg" alt="" />{" "}
                    {ad?.data?.created_at ? creationTime : "1h ago"}
                  </div>
                  <div className="views">
                    <img src="/images/eye.svg" alt="" /> {ad?.data?.view_count}
                  </div>
                </div>
                <p className="description">{ad?.data?.description}</p>
              </div>
            </div>

            <div className="col-lg-4 p-0 p-md-3">
              <div className="advertiserDetails">
                <Link
                  to={`/profile/${ad?.data?.user?.id}`}
                  className="advertiser"
                >
                  <img src={ad?.data?.user?.image} loading="lazy" alt="" />
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
                <div className="contact">
                  {Number(ad?.data?.chat) === 1 && (
                    <button className="chat" onClick={openChat}>
                      <IconMessageCircle stroke={1.5} />
                      <span> {t("chating")} </span>
                    </button>
                  )}

                  {Number(ad?.data?.phone) !== 0 && (
                    <Link
                      target="_blank"
                      to={`tel:${ad?.data?.phone}`}
                      className="call"
                    >
                      <IconPhone stroke={1.5} />
                      <span> {t("calling")} </span>
                    </Link>
                  )}

                  {Number(ad?.data?.whatsapp) !== 0 && (
                    <Link
                      target="_blank"
                      to={`https://wa.me/${ad?.data?.whatsapp}`}
                      className="chat"
                    >
                      <IconMessageCircle stroke={1.5} />
                      <span> {t("ads.whatsapp")} </span>
                    </Link>
                  )}
                </div>
              </div>

              <div className="itemDetailsBox">
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
                prevEl: `similar-prev`
              }}
              breakpoints={{
                992: {
                  slidesPerView: 4
                },
                768: {
                  slidesPerView: 2
                },
                350: {
                  slidesPerView: 1
                }
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
