import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import Post from "../../ui/cards/Post";
import useAdsByFilter from "../../hooks/ads/useAdsByFilter";
import { useTranslation } from "react-i18next";

function Department({ index, category, categoriesLoading }) {
  const { t } = useTranslation();
  const baseDelay = 1000;
  const delay = baseDelay + index * 1000;

  const { isLoading, data: ads } = useAdsByFilter({
    category_id: category?.id,
  });

  return (categoriesLoading || isLoading) ? (
    <div className="slider_wrap">
      <div className="container">
        <div className="skeleton-container">
          <div className="skeleton-item" />
          <div className="skeleton-item" />
          <div className="skeleton-item" />
          <div className="skeleton-item" />
        </div>
      </div>
    </div>
  ) : (
    ads?.data && ads?.data?.length > 0 && (
      <div className="slider_wrap">
        <div className="container">
          <div className="topHead">
            <div className="sectionTitle">
              <span className="subtitle">{t("home.categoryTitle")}</span>
              <h4 className="title">
                {t("home.exploreOffers")}{" "}
                <span className="categoryName"> {category?.name} </span>
              </h4>
            </div>
            <div className="swiperControl">
              <div className="swiperBtns">
                <div className={`swiper-button-next btn_${index}`} />
                <div className={`swiper-button-prev btn_${index}`} />
              </div>
            </div>
          </div>

          <Swiper
            spaceBetween={12}
            slidesPerView={4}
            speed={1000}
            loop={true}
            modules={[Autoplay, Navigation]}
            autoplay={{ delay: delay, disableOnInteraction: false }}
            className="mainSliderContainer"
            navigation={{
              nextEl: `.btn_${index}`,
              prevEl: `.btn_${index}`,
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
            }}
          >
            {ads?.data?.map((ad) => (
              <SwiperSlide key={ad.id}>
                <Post post={ad} category={category} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    )
  );
}

export default Department;
