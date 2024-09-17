import { Link } from "react-router-dom";
import arrow from "../../assets/images/arrow.svg";
import { useTranslation } from "react-i18next";

function Categories({ categories }) {
  const { t } = useTranslation();

  return (
    <section className="categories_section">
      <div className="container">
        <div className="topHead">
          <div className="sectionTitle">
            <span className="subtitle">{t("home.goodPickCategory")}</span>
            <h4 className="title">{t("home.browseWithCategories")}</h4>
          </div>
          <Link to="/ads" className="viewAll">
            <span>{t("viewAll")}</span>
            <img src={arrow} alt="" />
          </Link>
        </div>

        {categories && categories?.data?.length > 0 ? (
          <div className="row pt-3">
            {categories?.data?.map((category) => (
              <div className="col-lg-3 col-md-4 col-6 p-2" key={category.id}>
                <Link
                  to={`/ads?category_id=${category.id}`}
                  href="listing.html"
                  className="category"
                >
                  <div className="text">
                    <h5>{category?.name}</h5>
                  </div>
                  <div className="icon">
                    <img src={category?.image} alt={category?.name} />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="skeleton-container">
            <div className="skeleton-item"></div>
            <div className="skeleton-item"></div>
            <div className="skeleton-item"></div>
            <div className="skeleton-item"></div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Categories;
