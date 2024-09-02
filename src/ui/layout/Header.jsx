import HeaderTopBar from "./HeaderTopBar";
import { Link, NavLink } from "react-router-dom";
import userAvatar from "../../assets/images/avatar-placeholder.svg";

export default function Header() {
  return (
    <header>
      <HeaderTopBar />

      <nav className="">
        <div className="container">
          <div className="logo">
            <Link to="/">
              <img src="/images/logo.png" alt="logo" />
            </Link>
          </div>

          <ul className="navigation_links">
            <li>
              <NavLink className="nav-link" to="/">
                الرئيسية
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/stores">
                المتاجر
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/about-us">
                نبذه عنا
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/blogs">
                المدونات
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/contact-us">
                تواصل معنا
              </NavLink>
            </li>
          </ul>

          <div className="left_utils">
            <div className="cart_open" id="toggleSmallCart">
              <h6>0,00 ريال</h6>
              <i className="fa-light fa-bag-shopping"></i>
              <span>0</span>
            </div>

            <div className="dropdown">
              <Link
                className="account"
                to="#"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="user">
                  <img src={userAvatar} alt="avatar" />
                </div>
              </Link>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link className="dropdown-item" to="/profile">
                    الملف الشخصى
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/edit-profile">
                    تعديل الملف الشخصى
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/my-activities">
                    نشاطاتي
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/favorites">
                    المفضلة
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/login">
                    تسجيل الخروج
                  </Link>
                </li>
              </ul>
            </div>
            <button data-bs-toggle="modal" data-bs-target="#searchModal">
              <i className="fa-regular fa-magnifying-glass"></i>
            </button>
            <button className="toggler">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
