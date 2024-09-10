import { Link } from "react-router-dom";
import { useState } from "react";
import { calculateDate } from "../../utils/helpers";

function NotificationItem({ notification }) {
  const [imgError, setImgError] = useState(false);

  let status = "";

  switch (notification?.status) {
    case "pending":
      status = <i className="fa-solid fa-hourglass-end"></i>;
      break;
    case "accepted":
      status = <i className="fa-regular fa-check"></i>;
      break;
    case "refused":
      status = <i className="fa-regular fa-xmark"></i>;
      break;
    case "comment":
      status = <i className="fa-regular fa-message"></i>;
      break;
    default:
      break;
  }

  return (
    <Link to="/notification">
      <div className="text-wrap w-100">
        <div className="header d-flex align-items-center gap-3 justify-content-between">
          <div className="image-wrapper">
            {imgError ? (
              <i className="fa-regular fa-bell"></i>
            ) : (
              <img
                src={notification?.image || "/images/user.png"}
                alt={notification?.title || "اهلا بك"}
                onError={() => setImgError(true)}
              />
            )}
          </div>
          <div
            className="d-flex justify-content-between flex-column "
            style={{ flex: "1 0" }}
          >
            <div className="d-flex align-items-start gap-2 justify-content-between">
              <h6 className="mb-0">{notification?.title || "اهلا بك"}</h6>
              {notification?.status && (
                <span className={`status ${notification?.status}`}>
                  {status}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="info d-flex gap-1 justify-content-between flex-column">
          <p>{notification?.description || "اهلا بك"}</p>
          <span className="time w-100 d-flex justify-content-end">
            {calculateDate(
              notification?.created_at || "2024-08-28T12:51:35.000000Z"
            )}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default NotificationItem;
