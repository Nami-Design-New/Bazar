import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

function SectionHeader({ title, backLinks }) {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <section className="section-head">
      <div className="container">
        <div className="row h-100">
          <div
            className="text-wrap col-lg-6 col-md-6 col-12"
            data-aos="fade-up"
          >
            <Link to="/">{t("routes.home")}</Link>
            <span className="gradient-text"> / </span>
            {backLinks?.map((link, index) => (
              <Fragment key={index}>
                <Link to={`/${link}`} key={index}>
                  {t(`routes.${link}`)}
                </Link>
                <span className="gradient-text"> / </span>
              </Fragment>
            ))}

            <h6 className="m-0">
              {title
                ? ` ${title}`
                : ` ${t(`routes.${location.pathname.split("/")[1]}`)}`}
            </h6>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionHeader;
