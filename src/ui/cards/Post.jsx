import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { formatTimeDifference, getTimeDifference } from "../../utils/helpers";

function Post({ post, category }) {
  const { t } = useTranslation();

  console.log(post);

  const timeDifference = getTimeDifference(post?.created_at);
  const creationTime = formatTimeDifference(
    timeDifference.years,
    timeDifference.months,
    timeDifference.days,
    timeDifference.hours,
    timeDifference.minutes,
    t
  );

  return (
    <Link to={`/ad-details/${post?.id}`} className="item">
      <button className={`favorite ${post?.is_favorite ? "active" : ""}`}>
        <img src="/images/heart.svg" alt="" />
      </button>

      <Link to={`/ad-details/${post?.id}`} className="itemImg">
        <img src={post?.image?.image} loading="lazy" alt="" />
      </Link>

      <div className="itemInfo">
        {/* <Link className="advertiser">
          <img
            src={post?.user?.image || "/images/user (13).png"}
            loading="lazy"
            alt=""
          />
        </Link> */}

        {post?.created_at && creationTime ? (
          <div className="time">
            <img src="/images/clock.svg" alt="" /> {creationTime}
          </div>
        ) : null}

        {post?.title && (
          <h3 to={`/ad-details/${post?.id}`} className="title">
            {post?.title}
          </h3>
        )}

        {post?.description && (
          <p className="description one-line-wrap">{post?.description}</p>
        )}

        {post?.address ? (
          <div className="location">
            <img src="/images/location.svg" alt="" />
            <span className=" one-line-wrap"> {post?.address} </span>
          </div>
        ) : null}

        <div className="itemBottom">
          <Link to={`/ads?category=${category?.name}`} className="category">
            {category && category?.image && (
              <>
                <span className="img">
                  <img src={category?.image} alt="" />
                </span>
                {category?.name}
              </>
            )}
          </Link>

          {post?.price ? (
            <div className="price">
              <span>
                {" "}
                {post?.price} {t("currency.sar")}{" "}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

export default Post;
