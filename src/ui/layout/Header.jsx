import HeaderTopBar from "./HeaderTopBar";
import NotificationItem from "./NotificationItem";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Dropdown } from "react-bootstrap";
import { useEffect, useState } from "react";
import {
  IconBell,
  IconCirclePlus,
  IconMessage,
  IconShoppingBag
} from "@tabler/icons-react";

export default function Header() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isFixedTop, setIsFixedTop] = useState(false);

  const handleClickOutSide = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 120 ? setIsFixedTop(true) : setIsFixedTop(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`header ${isFixedTop ? "sticky" : ""}`}>
      <HeaderTopBar />

      <div
        className={`underLay ${isOpen ? "active" : ""}`}
        onClick={handleClickOutSide}
      />

      <nav>
        <div className="container">
          <div className="logo">
            <Link to="/">
              <img src="/images/logo.png" alt="logo" />
            </Link>
          </div>

          <ul className={`navigation_links ${isOpen ? "show" : ""}`}>
            <li className="logoo">
              <NavLink className="nav-link" to="/" onClick={handleClickOutSide}>
                <img src={"/images/logo.png"} alt="" />
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/" onClick={handleClickOutSide}>
                {t("header.home")}
              </NavLink>
            </li>
            <li>
              <NavLink
                className="nav-link"
                to="/coupons"
                onClick={handleClickOutSide}
              >
                {t("header.coupons")}
              </NavLink>
            </li>
            <li>
              <NavLink
                className="nav-link"
                to="/ads"
                onClick={handleClickOutSide}
              >
                {t("header.Ads")}
              </NavLink>
            </li>
            <li>
              <NavLink
                className="nav-link"
                to="/about-us"
                onClick={handleClickOutSide}
              >
                {t("header.aboutUs")}
              </NavLink>
            </li>
            <li>
              <NavLink
                className="nav-link"
                to="/contact-us"
                onClick={handleClickOutSide}
              >
                {t("header.contactUs")}
              </NavLink>
            </li>
            <li>
              <Link
                to="/add-ad"
                className="add_ad"
                onClick={handleClickOutSide}
              >
                <IconCirclePlus stroke={1.5} />
                {t("header.addAd")}
              </Link>
            </li>
          </ul>

          <div className="left_utils">
            <Link to={"/cart"} className="cart_open" id="toggleSmallCart">
              <IconShoppingBag stroke={1.5} />
              <span>0</span>
            </Link>

            <Dropdown>
              <Dropdown.Toggle
                as="div"
                id="dropdownMenuLink"
                className="account"
              >
                <IconBell stroke={1.5} />
              </Dropdown.Toggle>

              <Dropdown.Menu className="drop_Message_Menu" align="start">
                <div className="scroll_menu">
                  <Dropdown.Item className="drop_Message">
                    <NotificationItem />
                  </Dropdown.Item>
                </div>
                <Link className="showall" to="/notifications">
                  {t("header.allNotifications")}
                </Link>
              </Dropdown.Menu>
            </Dropdown>

            <Link to="/chats">
              <IconMessage stroke={1.5} />
            </Link>

            <Dropdown>
              <Dropdown.Toggle
                as="div"
                id="dropdownMenuLink"
                className="account"
              >
                <div className="user">
                  <i className="fa-light fa-user"></i>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/profile">
                  <i className="fa-solid fa-user"></i> {t("header.profile")}
                </Dropdown.Item>

                <Dropdown.Item as={Link} to="/edit-profile">
                  <i className="fa-light fa-pen-to-square"></i>{" "}
                  {t("header.editProfile")}
                </Dropdown.Item>

                <Dropdown.Item as={Link} to="/my-activities">
                  <i className="fa-light fa-chart-line"></i>
                  {t("header.myActivities")}
                </Dropdown.Item>

                <Dropdown.Item as={Link} to="/favorites">
                  <i className="fa-sharp fa-regular fa-heart"></i>
                  {t("header.favourites")}
                </Dropdown.Item>

                <Dropdown.Item as={Link} to="/login">
                  <i className="fa-regular fa-arrow-right-from-bracket"></i>{" "}
                  {t("header.logout")}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <label className="toggleMenu">
              <input
                type="checkbox"
                checked={isOpen}
                onChange={() => setIsOpen(!isOpen)}
              />
              <div className="checkmark">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </label>
          </div>
        </div>
      </nav>
    </header>
  );
}
