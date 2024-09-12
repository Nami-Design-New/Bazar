import vid1 from "../assets/videos/file_example_MP4_480_1_5MG.mp4";
import avatar from "../assets/images/userr.webp";

function Videos() {
  return (
    <section className="videos">
      <div className="videos_wrapper">
        <div className="video">
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
            <div className="actions">
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
            <button>التفاصيل</button>
          </div>
        </div>
        <div className="video">
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
            <div className="actions">
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
            <button>التفاصيل</button>
          </div>
        </div>
        <div className="video">
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
            <div className="actions">
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
            <button>التفاصيل</button>
          </div>
        </div>
        <div className="video">
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
            <div className="actions">
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
            <button>التفاصيل</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Videos;
