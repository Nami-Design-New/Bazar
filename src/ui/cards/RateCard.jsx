import { Link } from "react-router-dom";
import userImage from "../../assets/images/user-1.png";
import StarsList from "../StarsList";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const comment = {
  name: "محمد أحمد",
  comment: "هل يمكنك إضافة المزيد من الصور للسيارة ؟",
  rate: 4.4,
  time: "7 ساعة",
};

function RateCard({ setTargetedComment }) {
  const { t } = useTranslation();

  return (
    <div className="rate-card">
      <div className="info-wrapper">
        <Link to="/profile" className="image-wrapper">
          <img src={userImage} alt="user" />
        </Link>
        <div className="info-rate-wrapper">
          <div className="user-info">
            <Link to="/profile" className="name">
              {comment.name}
            </Link>
            <span>{comment.time}</span>
          </div>
          <div className="rate">
            <StarsList rate={comment.rate} />
            <span>{comment.rate}</span>
          </div>
        </div>
        <div className="btns-wrapper">
          <Dropdown>
            <Dropdown.Toggle className="butn" id="dropdown-basic">
              <i className="fa-regular fa-ellipsis-vertical"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/profile">
                {t("report")}
              </Dropdown.Item>
              <Dropdown.Item
                as={"span"}
                onClick={() => setTargetedComment(comment)}
              >
                {t("repaly")}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <p className="comment">{comment.comment}</p>
    </div>
  );
}

export default RateCard;
