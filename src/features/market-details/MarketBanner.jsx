import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import banner from "../../assets/images/banner.png"

function MarketBanner({ market }) {
  const { t } = useTranslation();
  const [isFollowing, setIsFollowing] = useState(false);
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
              <button
                className="action-btn follow"
                onClick={() => setIsFollowing(!isFollowing)}
              >
                <i
                  className={`fa-regular fa-user-${
                    isFollowing ? "check" : "plus"
                  }`}
                ></i>
                {isFollowing ? t("following") : t("follow")}
              </button>

              <span className="btn-box share">
                <i className="fa-solid fa-share"></i>
              </span>

              <Dropdown className="">
                <Dropdown.Toggle className="btn-box butn" id="dropdown-basic">
                  <i className="fa-regular fa-ellipsis-vertical"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile">
                    {t("report")}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketBanner;
