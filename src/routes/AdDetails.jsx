import { Link, useNavigate } from "react-router-dom";
import { IconMessageCircle, IconPhone } from "@tabler/icons-react";
import { formatTimeDifference, getTimeDifference } from "../utils/helpers";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import AdDetailsSlider from "../components/ad-details/AdDetailsSlider";
import DataLoader from "../ui/DataLoader";
import useGetAdById from "./../hooks/ads/useGetAdById";

function AdDetails() {
  const { t } = useTranslation();
  const { isLoading, data: ad } = useGetAdById();
  const navigate = useNavigate();
  const user = useSelector((state) => state.authedUser.user);

  const timeDifference = getTimeDifference(ad?.data?.created_at);
  const creationTime = formatTimeDifference(
    timeDifference.years,
    timeDifference.months,
    timeDifference.days,
    timeDifference.hours,
    timeDifference.minutes,
    t
  );

  const openChat = () => {
    console.log(user);

    sessionStorage.setItem("buyer_id", user?.id);
    sessionStorage.setItem("seller_id", ad?.data?.user_id);
    sessionStorage.setItem("ad_id", ad?.data?.id);

    navigate("/chats");
  };

  return isLoading ? (
    <DataLoader minHeight="200px" />
  ) : ad?.data ? (
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
                className={`favorite ${ad?.data?.is_favorite ? "active" : ""}`}
              >
                <img src="/images/heart.svg" alt="heart" />
              </button>

              <div className="actions">
                <a href="listing.html" className="category">
                  <img src="/images/icon (1).svg" alt="category" />
                  إلكترونيات
                </a>

                <div className="share">
                  <span className="ps-2 text-capitalize fw-bold">مشاركة :</span>
                  <Link className="twitter">
                    <img src="/images/twitter.svg" alt="" />
                  </Link>
                  <Link className="whatsapp">
                    <img src="/images/whatsapp.svg" alt="" />
                  </Link>
                  <Link className="instagram">
                    <img src="/images/instagram.svg" alt="" />
                  </Link>
                  <Link className="facebook">
                    <img src="/images/facebook.svg" alt="" />
                  </Link>
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
                  <span> {ad?.data?.address || "USA, California"} </span>
                </Link>
                <div className="time">
                  <img src="/images/clock.svg" alt="" />{" "}
                  {ad?.data?.created_at ? creationTime : "1h ago"}
                </div>
                <div className="views">
                  <img src="/images/eye.svg" alt="" />{" "}
                  {ad?.data?.view_count || "1.2k"}
                </div>
              </div>
              <p className="description">
                {ad?.data?.description ||
                  `يعمل الكمبيوتر المحمول Apple MacBook Air مقاس 13.6 بوصة بشريحة
              M2 الجديدة. وهو مزود بذاكرة وصول عشوائي (RAM) بسعة 8 جيجابايت
              ووحدة تخزين SSD بسعة 256 جيجابايت. يتميز MacBook Air بشاشة
              Retina رائعة وكاميرا FaceTime HD وميكروفونات بجودة الاستوديو.
              يأتي بنفس التصميم المدمج ولكنه الآن يدعم عمر بطارية يصل إلى 20
              ساعة ونظام تبريد نشط للحفاظ على الأداء المحسن. يعمل نظام التشغيل
              macOS وM2 معًا لتوفير المزيد من السرعة والاستجابة لجميع تطبيقاتك
              المفضلة. يأتي Apple MacBook Air مزودًا بتبريد نشط يحافظ على
              الأداء السريع.`}
              </p>
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
              <span className="date"> عضو منذ أغسطس 2023 </span>
              <div className="contact">
                <button className="chat" onClick={openChat}>
                  <IconMessageCircle stroke={1.5} />
                  <span> محادثة </span>
                </button>
                <Link to="tel:+966123456789" className="call">
                  <IconPhone stroke={1.5} />
                  <span> اتصل </span>
                </Link>
              </div>
            </div>

            <div className="itemDetailsBox">
              <h4 className="title"> سلامتك تهمنا </h4>
              <ul>
                <li>
                  <p>
                    قابل البايع في مكان عام زي المترو أو المولات أو محطات
                    البنزين
                  </p>
                </li>
                <li>
                  <p>خد حد معاك وانت رايح تقابل البايع أو المشتري</p>
                </li>
                <li>
                  <p>عاين المنتج كويس قبل ما تشتري وتأكد ان سعره مناسب</p>
                </li>
                <li>
                  <p>متدفعش او تحول فلوس الا لما تعاين المنتج كويس</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
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
