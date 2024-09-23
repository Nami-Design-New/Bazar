import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 p-2">
            <div className="footer_about">
              <Link to="/" className="logo">
                <img src="/images/logo.png" alt="logo" />
              </Link>
              <div className="links">
                <Link to="/">{t("routes.home")}</Link>
                <Link to="/about-us">{t("routes.about")}</Link>
                <Link to="/faq">{t("routes.faq")}</Link>
                <Link to="/terms-of-use">{t("routes.terms")}</Link>
                <Link to="/privacy-policy">{t("routes.privacy")}</Link>
                <Link to="/contact">{t("routes.contact")}</Link>
              </div>
            </div>
          </div>
          <div className="col-12 p-2">
            <div className="copyrights">
              <p>
                {t("copyright")} &copy; {currentYear} . {t("allRightsReserved")}{" "}
                <Link to="/">{t("bazar")}</Link>
              </p>
              <div className="social_media">
                <Link to="/">
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link to="/">
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link to="/">
                  <i className="fab fa-instagram"></i>
                </Link>
                <Link to="/">
                  <i className="fab fa-tiktok"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
