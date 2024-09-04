import { Link } from "react-router-dom";
import userImage from "../../assets/images/user-1.png";
import StarsList from "../StarsList";

function RateCard() {
  return (
    <div className="rate-card">
      <div className="info-wrapper">
        <Link to="/profile" className="image-wrapper">
          <img src={userImage} alt="user" />
        </Link>
        <div className="user-info">
          <Link to="/profile" className="name">
            محمد أحمد
          </Link>
          <span>7 ساعة</span>
        </div>
        <div className="rate">
          <StarsList rate={4.4} />
          <span>{"(4.4)"}</span>
        </div>
      </div>

      <p className="comment">هل يمكنك إضافة المزيد من الصور للسيارة ؟</p>
    </div>
  );
}

export default RateCard;
