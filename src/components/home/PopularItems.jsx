import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import Post from "../../ui/cards/Post";
import { useTranslation } from "react-i18next";
import useAdsByFilter from "../../hooks/ads/useAdsByFilter";

function PopularItems() {
  const { t } = useTranslation();
  const { isLoading, data: ads } = useAdsByFilter({ orderBy: "view_count" });

  if (!isLoading) {
    console.log(ads);
  }

  return (
    <section className="popular my-4">
      <div className="container">
        <div className="topHead">
          <div className="sectionTitle">
            <span className="subtitle">{t("home.mostPopular")}</span>
            <h4 className="title">{t("home.browseWithPopularity")}</h4>
          </div>

          <div className="swiperControl">
            <div className="swiperBtns">
              <div className="swiper-button-next"></div>
              <div className="swiper-button-prev"></div>
            </div>
          </div>
        </div>

        <Swiper
          spaceBetween={12}
          slidesPerView={3}
          speed={1000}
          loop={true}
          modules={[Autoplay, Navigation]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="mainSliderContainer"
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            992: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 2,
            },
            350: {
              slidesPerView: 1,
            },
          }}
        >
          {isLoading ? (
            <div className="skeleton-container">
              <div className="skeleton-item" />
              <div className="skeleton-item" />
              <div className="skeleton-item" />
              <div className="skeleton-item" />
            </div>
          ) : (
            ads?.data?.map((ad) => (
              <SwiperSlide key={ad.id}>
                <Post post={ad} />
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </section>
  );
}

export default PopularItems;
