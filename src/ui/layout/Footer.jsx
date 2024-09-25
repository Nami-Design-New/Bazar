import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useCategoriesList from "../../components/categories/useCategoriesList";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();
  const { data: categories } = useCategoriesList();

  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-3 p-3 px-lg-4">
            <img
              loading="lazy"
              src="/images/logo.svg"
              className="logo"
              alt="logo"
            />
            <p className="info">{t("footerAbout")}</p>
          </div>
          <div className="col-6 col-lg-3 p-3 px-lg-4">
            <div className="group">
              <h5 className="title"> {t("categoriess")} </h5>
              <ul>
                {categories?.data?.map((category) => (
                  <li key={category?.id}>
                    <Link to={`/ads?category_id=${category?.id}`}>
                      {" "}
                      {category?.name}{" "}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col col-lg-3 p-3 px-lg-4">
            <div className="group">
              <h5 className="title">{t("importantLinks")} </h5>
              <ul>
                <li>
                  <Link to="/">{t("routes.home")}</Link>
                </li>
                <li>
                  <Link to="/about-us">{t("routes.about")}</Link>
                </li>
                <li>
                  <Link to="/faq">{t("routes.faq")}</Link>
                </li>
                <li>
                  <Link to="/terms-of-use">{t("routes.terms")}</Link>
                </li>
                <li>
                  <Link to="/privacy-policy">{t("routes.privacy")}</Link>
                </li>
                <li>
                  <Link to="/contact">{t("routes.contact")}</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-6 col-lg-3 p-3 px-lg-4">
            <div className="group">
              <h5 className="title">{t("socialMedia")}</h5>
              <div className="social">
                <a href="#!" target="_blank">
                  <span className="icon">
                    <img
                      loading="lazy"
                      src="/images/facebook-footer.svg"
                      alt="facebook"
                    />
                  </span>
                  Facebook
                </a>
                <a href="#!" target="_blank">
                  <span className="icon">
                    <img
                      loading="lazy"
                      src="/images/instagram-footer.svg"
                      alt="instagram"
                    />
                  </span>
                  Instagram
                </a>
                <a href="#!" target="_blank">
                  <span className="icon">
                    <img loading="lazy" src="/images/X.svg" alt="X" />
                  </span>
                  X
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="copywriting">
          <p>
            {t("copyright")} &copy; {currentYear} . {t("allRightsReserved")}{" "}
            <Link to="/">{t("bazar")}</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
