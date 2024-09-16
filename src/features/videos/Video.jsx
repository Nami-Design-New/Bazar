import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Comments from "./Comments";
import avatar from "../../assets/images/userr.webp";

function Video({ ad }) {
  const thisRef = useRef(null);
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="video" ref={thisRef}>
      <video src={ad?.video} autoPlay playsInline loop muted></video>

      <div className="video_utils">
        <div className="user">
          <img src={avatar} alt="user" />
          <button className="follow">
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>

        <div className="actions">
          <button>
            <i className="fa-regular fa-heart"></i>
          </button>
          <span>{ad?.favorites_count}</span>
        </div>

        <div className="actions" onClick={() => setShowComments(true)}>
          <button>
            <i className="fa-solid fa-comment-dots"></i>
          </button>
          <span>{ad?.comments_count}</span>
        </div>

        <div className="actions">
          <button>
            <i className="fa-solid fa-share"></i>
          </button>
          <span>{ad?.share_count}</span>
        </div>
      </div>

      <div className="adName">
        <h6>{ad?.title}</h6>
        <Link className="link" to={`/ad-details/${ad?.id}`}>
          التفاصيل
        </Link>
      </div>

      <Comments
        show={showComments}
        setShow={setShowComments}
        element={thisRef}
      />
    </div>
  );
}

export default Video;
