import { useTranslation } from "react-i18next";
import marketCoverImage from "../assets/images/market-cover-1.png";
import marketLogoImage from "../assets/images/market-logo-1.jpg";
import { useState } from "react";
import { Form } from "react-bootstrap";
import CouponCard from "../ui/cards/CouponCard";
import { useNavigate } from "react-router-dom";

function CouponDetails() {
  const { t } = useTranslation();
  const [isAdded, setIsAdded] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [wantNotifications, setWantNotifications] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="market-details-page coupon-details-page">
      <div className="page-header">
        <div className="cover-wrapper">
          <img src={marketCoverImage} alt="market cover image" />
        </div>
        <div className="top-wrapper">
          <div className="btns-wrapper">
            <span className="btn-box back" onClick={() => navigate(-1)}>
              <i className="fa-regular fa-arrow-right"></i>
            </span>
          </div>
          <div className="logo-follow-wrapper">
            <div className="logo-wrapper">
              <img src={marketLogoImage} alt="market logo image" />
            </div>

            <div className="action-boxes">
              <span
                className="action-btn follow"
                onClick={() => setIsFollowing(!isFollowing)}
              >
                {isFollowing ? t("following") : t("follow")}
              </span>
              <span
                className="action-btn add"
                onClick={() => setIsAdded(!isAdded)}
              >
                <i
                  className={`fa-regular fa-user-${isAdded ? "check" : "plus"}`}
                ></i>
              </span>
            </div>
          </div>
          <div className="btns-wrapper">
            <span className="btn-box share">
              <i className="fa-sharp fa-solid fa-share-nodes"></i>
            </span>
          </div>
        </div>
        <div className="info-wrapper">
          <h3>متجر كرفور</h3>
          <p>
            الجروب مخصص فقط لكل ما يخص اعمال النجاره مثل الموبيليات و الديكور و
            الباب و الشباك
          </p>
        </div>
      </div>
      <div className="content-wrapper container col-lg-10 col-12">
        <div className="notification-box">
          <div className="icon-box">
            <i className="fa-solid fa-bell "></i>
          </div>
          <p>ارسل لي اشعار عندما يتم اضافة عروض جديده على هذا الكود</p>
          <Form.Switch
            id="wantChangePassword"
            name="wantChangePassword"
            checked={wantNotifications}
            onChange={() => setWantNotifications(!wantNotifications)}
          />
        </div>
        <CouponCard />
      </div>
    </div>
  );
}

export default CouponDetails;
