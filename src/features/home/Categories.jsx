import { Link } from "react-router-dom";
import arrow from "../../assets/images/arrow.svg";
import c1 from "../../assets/images/icon (1).svg";
import c2 from "../../assets/images/icon (2).svg";
import c3 from "../../assets/images/icon (3).svg";
import c4 from "../../assets/images/icon (4).svg";
import c5 from "../../assets/images/icon (5).svg";
import c6 from "../../assets/images/icon (6).svg";
import c7 from "../../assets/images/icon (7).svg";
import c8 from "../../assets/images/icon (8).svg";

function Categories() {
  return (
    <section className="categories_section">
      <div className="container">
        <div className="topHead">
          <div className="sectionTitle">
            <span className="subtitle">فئة مختارة بعناية</span>
            <h4 className="title">تصفح العناصر حسب الفئة</h4>
          </div>
          <Link href="categories.html" className="viewAll">
            <span>عرض الكل</span>
            <img src={arrow} alt="" />
          </Link>
        </div>

        <div className="row pt-3">
          <div className="col-6 col-md-4 col-xl-3 p-2">
            <Link
              to="/categories/mobile-tablets"
              href="listing.html"
              className="category"
            >
              <div className="text">
                <h5> الجوال والتابلت </h5>
              </div>
              <div className="icon">
                <img src={c1} alt="" />
              </div>
            </Link>
          </div>

          <div className="col-6 col-md-4 col-xl-3 p-2">
            <Link
              to="/categories/vehicles"
              href="listing.html"
              className="category"
            >
              <div className="text">
                <h5> المركبات </h5>
              </div>
              <div className="icon">
                <img src={c2} alt="" />
              </div>
            </Link>
          </div>

          <div className="col-6 col-md-4 col-xl-3 p-2">
            <Link href="listing.html" className="category">
              <div className="text">
                <h5> العقارات </h5>
              </div>
              <div className="icon">
                <img src={c3} alt="" />
              </div>
            </Link>
          </div>
          <div className="col-6 col-md-4 col-xl-3 p-2">
            <Link
              to="/categories/jobs"
              href="listing.html"
              className="category"
            >
              <div className="text">
                <h5> الوظائف </h5>
              </div>
              <div className="icon">
                <img src={c4} alt="" />
              </div>
            </Link>
          </div>
          <div className="col-6 col-md-4 col-xl-3 p-2">
            <Link href="listing.html" className="category">
              <div className="text">
                <h5> الأطفال والرضع </h5>
              </div>
              <div className="icon">
                <img src={c5} alt="" />
              </div>
            </Link>
          </div>
          <div className="col-6 col-md-4 col-xl-3 p-2">
            <Link href="listing.html" className="category">
              <div className="text">
                <h5> الملابس </h5>
              </div>
              <div className="icon">
                <img src={c6} alt="" />
              </div>
            </Link>
          </div>
          <div className="col-6 col-md-4 col-xl-3 p-2">
            <Link href="listing.html" className="category">
              <div className="text">
                <h5> الحيوانات الأليفة </h5>
              </div>
              <div className="icon">
                <img src={c7} alt="" />
              </div>
            </Link>
          </div>
          <div className="col-6 col-md-4 col-xl-3 p-2">
            <Link href="listing.html" className="category">
              <div className="text">
                <h5> الأثاث والديكور </h5>
              </div>
              <div className="icon">
                <img src={c8} alt="" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Categories;
