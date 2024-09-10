import { Link } from "react-router-dom";
import { useState } from "react";

function FavoriteMarketCard({ market }) {
  const [isLiked, setIsLiked] = useState(false);

  function handleToggleFavorite(e) {
    e.stopPropagation();
    e.preventDefault();
    setIsLiked(!isLiked);
  }

  function handleLinkClick(e) {
    e.stopPropagation();
    if (
      e.target.classList.contains("delete") ||
      e.target.classList.contains("favorite")
    ) {
      e.preventDefault();
    }
  }

  return (
    <Link
      to={`/${market?.type === "coupon" ? "coupon" : "market"}-details/${
        market?.id
      }`}
      className="fav-market-card"
      onClick={handleLinkClick}
    >
      <div className="card-header">
        <div className="cover-wrapper">
          <img src={market?.banner} alt="market cover image" />
        </div>
        <div className="logo-wrapper">
          <img src={market?.logo} alt="market logo image" />
        </div>
        <div className="categories-actions">
          <div className="categories-wrapper">
            <Link
              to={`/ads?category_id=${market?.category?.id}`}
              className="category"
            >
              <img src={market?.category?.image} alt="" />
              {market?.category?.name}
            </Link>
          </div>
          <div className="action-boxes">
            <span
              className={`action-btn favorite ${
                market?.is_favorite ? "liked" : ""
              }`}
              onClick={handleToggleFavorite}
            >
              <i className="fa-solid fa-heart"></i>
            </span>
          </div>
        </div>
        <h3>{market?.bio}</h3>
      </div>
      <div className="card-details">
        <div className="card-statistics">
          {market?.views_count || market?.views_count === 0 ? (
            <div className="statistic">
              <i className="fa-regular fa-eye gradient-icon"></i>
              <span className="value">{market?.views_count}</span>
            </div>
          ) : null}
          {market?.follow_count || market?.follow_count === 0 ? (
            <div className="statistic">
              <i className={`fa-regular fa-user-plus`}></i>
              <span className="value">{market?.follow_count}</span>
            </div>
          ) : null}
          {market?.rate || market?.rate === 0 ? (
            <div className="statistic">
              <i className="fa-solid fa-star gradient-icon"></i>
              <span className="value">{market?.rate}</span>
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

export default FavoriteMarketCard;
