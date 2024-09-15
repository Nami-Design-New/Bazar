import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Comments from "./Comments";
import vid1 from "../../assets/videos/file_example_MP4_480_1_5MG.mp4";
import avatar from "../../assets/images/userr.webp";

function Video() {
  const thisRef = useRef(null);
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="video" ref={thisRef}>
      <video src={vid1} autoPlay playsInline loop muted></video>

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
          <span>93.5k</span>
        </div>

        <div className="actions" onClick={() => setShowComments(true)}>
          <button>
            <i className="fa-solid fa-comment-dots"></i>
          </button>
          <span>23.5k</span>
        </div>

        <div className="actions">
          <button>
            <i className="fa-solid fa-share"></i>
          </button>
        </div>
      </div>

      <div className="adName">
        <h6>سيارة مستعملة للبيع</h6>
        <Link className="link" to="/ad-details/1">
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
