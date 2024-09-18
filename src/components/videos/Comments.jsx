import { IconXboxX } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Comments({ show, setShow }) {
  const user = useSelector((state) => state.authedUser.user);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
      document.querySelector(".videos_wrapper").style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.querySelector(".videos_wrapper").style.overflow = "scroll";
    }
  }, [show]);

  return (
    <div className={`comments ${show ? "show" : ""}`}>
      <div className="header">
        <h6>التعليقات ( 6000 )</h6>
        <button onClick={() => setShow(false)}>
          <IconXboxX stroke={1.5} />
        </button>
      </div>

      <div className="comments_wrapper">
        <div className="comment_wrap">
          <div className="user_img">
            <img src="/images/userr.webp" alt="avatar" />
          </div>
          <div className="user_details">
            <h6>محمد على</h6>
            <p>هذا هو نص التعليق</p>
            <span>8-25</span>
          </div>
        </div>
        <div className="comment_wrap">
          <div className="user_img">
            <img src="/images/userr.webp" alt="avatar" />
          </div>
          <div className="user_details">
            <h6>محمد على</h6>
            <p>هذا هو نص التعليق</p>
            <span>8-25</span>
          </div>
        </div>
        <div className="comment_wrap">
          <div className="user_img">
            <img src="/images/userr.webp" alt="avatar" />
          </div>
          <div className="user_details">
            <h6>محمد على</h6>
            <p>هذا هو نص التعليق</p>
            <span>8-25</span>
          </div>
        </div>
        <div className="comment_wrap">
          <div className="user_img">
            <img src="/images/userr.webp" alt="avatar" />
          </div>
          <div className="user_details">
            <h6>محمد على</h6>
            <p>هذا هو نص التعليق</p>
            <span>8-25</span>
          </div>
        </div>

        <div className="comment_wrap">
          <div className="user_img">
            <img src="/images/userr.webp" alt="avatar" />
          </div>
          <div className="user_details">
            <h6>محمد على</h6>
            <p>هذا هو نص التعليق</p>
            <span>8-25</span>
          </div>
        </div>
        <div className="comment_wrap">
          <div className="user_img">
            <img src="/images/userr.webp" alt="avatar" />
          </div>
          <div className="user_details">
            <h6>محمد على</h6>
            <p>هذا هو نص التعليق</p>
            <span>8-25</span>
          </div>
        </div>
        <div className="comment_wrap">
          <div className="user_img">
            <img src="/images/userr.webp" alt="avatar" />
          </div>
          <div className="user_details">
            <h6>محمد على</h6>
            <p>هذا هو نص التعليق</p>
            <span>8-25</span>
          </div>
        </div>
        <div className="comment_wrap">
          <div className="user_img">
            <img src="/images/userr.webp" alt="avatar" />
          </div>
          <div className="user_details">
            <h6>محمد على</h6>
            <p>هذا هو نص التعليق</p>
            <span>8-25</span>
          </div>
        </div>
      </div>

      <form className="comment_form">
        {user?.id ? (
          <>
            <div className="user_img">
              <img src={user?.image} alt="" />
            </div>
            <input type="text" placeholder="اضف تعليقك ..." />
            <button>
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </>
        ) : (
          <Link to="/login">تسجيل الدخول للتعليق</Link>
        )}
      </form>
    </div>
  );
}

export default Comments;
