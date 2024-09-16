import c1 from "../../assets/images/icon (1).svg";
import loc from "../../assets/images/location.svg";
import clock from "../../assets/images/clock.svg";
import pro from "../../assets/images/item (6).jpg";
import user from "../../assets/images/user (13).png";
import heart from "../../assets/images/heart.svg";
import { Link } from "react-router-dom";

function Post({ post }) {
  return (
    <div className="item">
      <button className="favorite active">
        <img src={heart} alt="" />
      </button>

      <Link to={`/ad-details/${post?.id}`} className="itemImg">
        <img src={pro} loading="lazy" alt="" />
      </Link>

      <div className="itemInfo">
        <Link to={`/profile/${post?.user?.id}`} className="advertiser">
          <img src={user} loading="lazy" alt="" />
        </Link>

        <div className="time">
          <img src={clock} alt="" /> 1h ago
        </div>

        <Link to={`/ad-details/${post?.id}`} className="title">
          Apple MacBook Air (2023) Apple M2 Chip
        </Link>

        <p className="description one-line-wrap">
          The Apple MacBook Air 13.6-Inch laptop is powered by the new M2 chip.
          It is loaded with 8GB RAM and 256GB SSD.
        </p>

        <div className="location">
          <img src={loc} alt="" />
          <span> USA, California </span>
        </div>

        <div className="itemBottom">
          <Link to={`/ads?category=electronics`} className="category">
            <span className="img">
              <img src={c1} alt="" />
            </span>
            Electronics
          </Link>

          <div className="price">
            <span> $ 1,200 </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
