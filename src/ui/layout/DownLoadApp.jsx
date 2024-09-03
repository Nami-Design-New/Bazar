import { Link } from "react-router-dom";
import downLoadApp from "../../assets/images/downLoadApp.svg";
import appStore from "../../assets/images/app-store.svg";
import googlePlay from "../../assets/images/google-play.svg";

function DownLoadApp() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 p-2 pt-4 pb-0">
          <div className="download_app">
            <div className="content">
              <h3>اعثر على صفقات مذهلة لدينا.</h3>
              <h4>حمل التطبيق الآن!</h4>
              <div className="links">
                <Link>
                  <img src={appStore} alt="app store" />
                </Link>
                <Link>
                  <img src={googlePlay} alt="google play" />
                </Link>
              </div>
            </div>
            <div className="img">
              <img src={downLoadApp} alt="app" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DownLoadApp;
