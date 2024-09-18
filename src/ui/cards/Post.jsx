import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Post({ post }) {
  const { t } = useTranslation();

  return (
    <div className="item">
      <button className={`favorite ${post?.is_favorite ? "active" : ""}`}>
        <img src="/images/heart.svg" alt="" />
      </button>

      <Link to={`/ad-details/${post?.id}`} className="itemImg">
        <img
          src={post?.image?.image || "/public/images/item (1).jpg"}
          loading="lazy"
          alt=""
        />
      </Link>

      <div className="itemInfo">
        <Link className="advertiser">
          <img
            src={post?.user?.image || "/images/user (13).png"}
            loading="lazy"
            alt=""
          />
        </Link>

        <div className="time">
          <img src="/images/clock.svg" alt="" /> 1h ago
        </div>

        <Link to={`/ad-details/${post?.id}`} className="title">
          {post?.title}
        </Link>

        <p className="description one-line-wrap">{post?.description}</p>

        <div className="location">
          <img src="/images/location.svg" alt="" />
          <span> {post?.address || "USA, California"} </span>
        </div>

        <div className="itemBottom">
          <Link to={`/ads?category=electronics`} className="category">
            <span className="img">
              <img src="/images/icon (1).svg" alt="" />
            </span>
            Electronics
          </Link>

          <div className="price">
            <span>
              {" "}
              {post?.price || 0} {t("currency.sar")}{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
