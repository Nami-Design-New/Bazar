import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function DownLoadApp() {
  const { t } = useTranslation();

  return (
    <section className="download_app_section">
      <div className="container">
        <div className="row">
          <div className="col-12 p-2 pt-4 pb-0">
            <div className="download_app">
              <div className="content">
                <h3>{t("downLoadAppTitle")}</h3>
                <h4>{t("downLoadNow")}</h4>
                <div className="links">
                  <Link>
                    <img src="/images/app-store.svg" alt="app store" />
                  </Link>
                  <Link>
                    <img src="/images/google-play.svg" alt="google play" />
                  </Link>
                </div>
              </div>
              <div className="img">
                <img src="/images/downLoadApp.svg" alt="app" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DownLoadApp;
