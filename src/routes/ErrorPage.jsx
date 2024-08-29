import { Link } from "react-router-dom";
import errorImg from "../Assets/images/error-404.svg";
import { useTranslation } from "react-i18next";

function ErrorPage() {
  const { t } = useTranslation();
  return (
    <section className="error-section container">
      <img src={errorImg} alt="error image" />
      <h2>404</h2>
      <h2>{t("error.pageNotFound")}</h2>
      <Link to="/">
        <i className="fa-solid fa-home"></i>
        <span>{t("error.goHome")}</span>
      </Link>
    </section>
  );
}

export default ErrorPage;
