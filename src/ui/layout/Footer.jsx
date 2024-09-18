import { Link } from "react-router-dom";
import useGetSettings from "../../hooks/useGetSettings";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { data: settings } = useGetSettings();

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
                <Link>الرئيسية</Link>
                <Link to={settings?.data?.about_link}>من نحن</Link>
                <Link to={settings?.data?.terms_link}>شروط الاستخدام</Link>
                <Link to={settings?.data?.privacy_link}>سياسة الخصوصية</Link>
                <Link>اتصل بنا</Link>
              </div>
            </div>
          </div>
          <div className="col-12 p-2">
            <div className="copyrights">
              <p>
                حقوق الطبع والنشر &copy; {currentYear} . جميع الحقوق محفوظة لدى{" "}
                <Link to="/">بازار</Link>
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
