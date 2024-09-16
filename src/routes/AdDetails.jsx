import { Link, useNavigate } from "react-router-dom";
import { IconMessageCircle, IconPhone } from "@tabler/icons-react";
import { formatTimeDifference, getTimeDifference } from "../utils/helpers";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import AdDetailsSlider from "../features/ad-details/AdDetailsSlider";
import avatar from "../assets/images/userr.webp";
import heart from "../assets/images/heart.svg";
import category from "../assets/images/icon (1).svg";
import instgram from "../assets/images/instagram.svg";
import twitter from "../assets/images/twitter.svg";
import whatsapp from "../assets/images/whatsapp.svg";
import facebook from "../assets/images/facebook.svg";
import location from "../assets/images/location.svg";
import clock from "../assets/images/clock.svg";
import eye from "../assets/images/eye.svg";
import useGetAdById from "../features/ads/useGetAdById";
import DataLoader from "../ui/DataLoader";

/*
Missed parts in UI: 
  area / city id ???
  ad_type: sell / buy
  audio
  video
  statics: chats, comments, favorites, phones, share
  rating
  rate
  simialr ads
  verification badges
  follow button

Missed in data:
  category and sub_category names
  tags
  benefits (main - additionally)
*/

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

  return (
    <section className="itemDetails">
      <div className="container">
        {isLoading ? (
          <DataLoader />
        ) : (
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
                >
                  <img src={heart} alt="heart" />
                </button>

                <div className="actions">
                  <a href="listing.html" className="category">
                    <img src={category} alt="category" />
                    إلكترونيات
                  </a>

                  <div className="share">
                    <span className="ps-2 text-capitalize fw-bold">
                      مشاركة :
                    </span>
                    <Link className="twitter">
                      <img src={twitter} alt="" />
                    </Link>
                    <Link className="whatsapp">
                      <img src={whatsapp} alt="" />
                    </Link>
                    <Link className="instagram">
                      <img src={instgram} alt="" />
                    </Link>
                    <Link className="facebook">
                      <img src={facebook} alt="" />
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
                    <img src={location} alt="" />
                    <span> {ad?.data?.address || "USA, California"} </span>
                  </Link>
                  <div className="time">
                    <img src={clock} alt="" />{" "}
                    {ad?.data?.created_at ? creationTime : "1h ago"}
                  </div>
                  <div className="views">
                    <img src={eye} alt="" /> {ad?.data?.view_count || "1.2k"}
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
                <div className="instructions">
                  <span> Used </span>
                  <span> Shipping </span>
                  <span> Firm price </span>
                </div>
              </div>

              <div className="itemDetailsBox">
                <h4 className="title">الميزات الرئيسية</h4>
                <ul>
                  <li>
                    <span>MPN</span>
                    <p> MLY33LL/A / MLY33ZP/A</p>
                  </li>
                  <li>
                    <span>Model</span>
                    <p> MacBook Air (2022) M2 Chip Model</p>
                  </li>
                  <li>
                    <span>Processor</span>
                    <p>
                      Apple M2 chip, 8-core CPU with 4 performance cores and 4
                      efficiency cores
                    </p>
                  </li>
                  <li>
                    <span>RAM</span>
                    <p> 8GB, Storage: 256GB SSD</p>
                  </li>
                  <li>
                    <span>Display</span>
                    <p> 13.6 Liquid Retina display (2560 x 1664)</p>
                  </li>
                  <li>
                    <span>Features</span>
                    <p> Backlit Magic Keyboard and the Touch ID</p>
                  </li>
                  <li>
                    <span>Processor Brand</span>
                    <p> Apple</p>
                  </li>
                  <li>
                    <span>Processor Model</span>
                    <p> M2 Chip</p>
                  </li>
                </ul>
              </div>

              <div className="itemDetailsBox">
                <h4 className="title">مميزات اضافية</h4>
                <div className="features">
                  <span> Airbag </span>
                  <span> ABS </span>
                  <span> Air Condioning </span>
                  <span> AM/FM Radio </span>
                  <span> EBD </span>
                </div>
              </div>
            </div>

            <div className="col-lg-4 p-0 p-md-3">
              <div className="advertiserDetails">
                <Link
                  to={`/profile/${ad?.data?.user?.id}`}
                  className="advertiser"
                >
                  <img
                    src={ad?.data?.user?.image || avatar}
                    loading="lazy"
                    alt=""
                  />
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
        )}
      </div>
    </section>
  );
}

export default AdDetails;
