import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { formatTimeDifference, getTimeDifference } from "../../utils/helpers";
import StarsList from "../StarsList";

function RateCard({ setTargetedComment, rate }) {
  const { t } = useTranslation();

  const timeDifference = getTimeDifference(rate?.created_at);
  const creationTime = formatTimeDifference(
    timeDifference.years,
    timeDifference.months,
    timeDifference.days,
    timeDifference.hours,
    timeDifference.minutes,
    t
  );

  return (
    <div className="rate-card">
      <div className="info-wrapper">
        <Link to={`/profile/${rate?.user?.id}`} className="image-wrapper">
          <img src={rate?.user?.image} alt="user" />
        </Link>
        <div className="info-rate-wrapper">
          <div className="user-info">
            <Link to={`/profile/${rate?.user?.id}`} className="name">
              {rate?.user?.name}
            </Link>
            <span>{creationTime}</span>
          </div>
          <div className="rate">
            <StarsList rate={rate?.rate} />
            <span>{rate?.rate}</span>
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
                onClick={() => setTargetedComment(rate)}
              >
                {t("repaly")}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <p className="comment">{rate?.comment}</p>
    </div>
  );
}

export default RateCard;
