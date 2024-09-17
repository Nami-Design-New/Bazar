import { useTranslation } from "react-i18next";
import banner from "../../assets/images/banner.png";

function MarketBanner({ market }) {
  const { t } = useTranslation();

  return (
    <div className="page-header">
      <div className="cover-wrapper">
        <img src={banner} alt="market cover image" />
        <div className="market">
          <div className="top-wrapper">
            <div className="logo-follow-wrapper">
              <div className="logo-wrapper">
                <img src={market?.data?.logo} alt="market logo image" />
              </div>
              <h3>{market?.data?.name}</h3>
            </div>

            <div className="btns-wrapper">
              <button className="action-btn follow">
                <i
                  className={`fa-regular fa-user-${
                    market?.data?.is_follow ? "check" : "plus"
                  }`}
                ></i>
                {market?.data?.is_follow ? t("following") : t("follow")}
              </button>

              <span className="btn-box share">
                <i className="fa-solid fa-share"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketBanner;
