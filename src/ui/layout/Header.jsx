import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Dropdown } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { setIsLogged, setUser } from "../../redux/slices/authedUser";
import { useQueryClient } from "@tanstack/react-query";
import { setLanguage } from "../../redux/slices/language";
import {
  IconBell,
  IconCirclePlus,
  IconLanguage,
  IconMessage,
  IconShoppingBag,
} from "@tabler/icons-react";
import axios from "../../utils/axios";
import i18next from "i18next";
import Loader from "../Loader";
import NotificationItem from "../layout/NotificationItem";
import useGetNotifications from "../../hooks/useGetNotifications";
import DataLoader from "../DataLoader";
import EmptyData from "../EmptyData";

export default function Header() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const [isFixedTop, setIsFixedTop] = useState(false);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);

  const { isLoading: notificationsLoading, data: notifications } =
    useGetNotifications();

  const lang = useSelector((state) => state.language.lang);
  const user = useSelector((state) => state.authedUser.user);
  const cart = useSelector((state) => state.cart.cartList);
  const isLogged = useSelector((state) => state.authedUser.isLogged);

  const [, , deleteCookie] = useCookies();
  const [cookies] = useCookies(["token"]);
  const token = cookies?.token;

  const handleClickOutSide = () => {
    setIsOpen(false);
  };

  const handleLang = (newLang) => {
    dispatch(setLanguage(newLang));
    i18next.changeLanguage(newLang);
    const bodyElement = document.querySelector("body");
    if (bodyElement) {
      bodyElement.classList.toggle("en", newLang === "en");
    }
  };

  const performLogout = async () => {
    setIsLogoutLoading(true);
    try {
      const deleteToken = await axios.post("/user/logout", { token: token });
      if (deleteToken.data.code === 200) {
        deleteCookie("token");
        deleteCookie("id");
        delete axios.defaults.headers.common["Authorization"];
        dispatch(setUser({}));
        dispatch(setIsLogged(false));
        navigate("/");
        queryClient.clear();
        sessionStorage.clear();
      }
    } catch (error) {
      console.error("Error during logout:", error);
      throw new Error(error.message);
    }

    setIsLogoutLoading(false);
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

  return isLogoutLoading ? (
    <Loader />
  ) : (
    <header className={`header ${isFixedTop ? "sticky" : ""}`}>
      <div
        className={`underLay ${isOpen ? "active" : ""}`}
        onClick={handleClickOutSide}
      />

      <nav>
        <div className="container">
          <div className="logo">
            <Link to="/">
              <img src="/images/logo.svg" alt="logo" />
            </Link>
          </div>

          <ul className={`navigation_links ${isOpen ? "show" : ""}`}>
            <li className="logoo">
              <NavLink className="nav-link" to="/" onClick={handleClickOutSide}>
                <img src={`/images/logo.svg`} alt="" />
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
                to="/videos"
                onClick={handleClickOutSide}
              >
                {t("header.videos")}
              </NavLink>
            </li>
            <li>
              <NavLink
                className="nav-link"
                to="/markets"
                onClick={handleClickOutSide}
              >
                {t("header.markets")}
              </NavLink>
            </li>
            <li>
              <NavLink
                className="nav-link"
                to={`/ads?ad_type=sell`}
                onClick={handleClickOutSide}
              >
                {t("header.Ads")}
              </NavLink>
            </li>
            <li>
              <NavLink
                className="nav-link"
                to={`/wanted-ads?ad_type=buy`}
                onClick={handleClickOutSide}
              >
                {t("header.wantedAds")}
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
                to="/contact"
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
            <button
              className="d-flex align-items-center gap-1"
              onClick={() => handleLang(lang === "en" ? "ar" : "en")}
            >
              <span>{lang === "en" ? "AR" : "EN"}</span>
              <IconLanguage stroke={1} />
            </button>

            <Link to={"/cart"} className="cart_open" id="toggleSmallCart">
              <IconShoppingBag stroke={1.5} />
              <span>{cart?.length}</span>
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
                  {notificationsLoading ? (
                    <DataLoader />
                  ) : notifications?.data && notifications?.data?.length > 0 ? (
                    <>
                      {notifications?.data?.map((notification) => (
                        <Dropdown.Item
                          className="drop_Message"
                          key={notification?.id}
                        >
                          <NotificationItem notification={notification} />
                        </Dropdown.Item>
                      ))}
                    </>
                  ) : (
                    <EmptyData>{t("noNotifications")}</EmptyData>
                  )}
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
                  {user?.image ? (
                    <img src={user?.image} alt={user?.name} />
                  ) : (
                    <i className="fa-light fa-user"></i>
                  )}
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {isLogged && user ? (
                  <>
                    <Dropdown.Item as={Link} to="/profile">
                      <i className="fa-solid fa-user"></i> {t("header.profile")}
                    </Dropdown.Item>

                    <Dropdown.Item as={Link} to="/edit-profile">
                      <i className="fa-light fa-pen-to-square"></i>
                      {t("header.editProfile")}
                    </Dropdown.Item>

                    <Dropdown.Item as={Link} to="/favorites">
                      <i className="fa-sharp fa-regular fa-heart"></i>
                      {t("header.favourites")}
                    </Dropdown.Item>

                    <Dropdown.Item as={Link} to="/commission">
                      <i className="fa-sharp fa-regular fa-badge-percent"></i>
                      {t("header.appCommission")}
                    </Dropdown.Item>

                    <Dropdown.Item onClick={performLogout}>
                      <i className="fa-regular fa-arrow-right-from-bracket"></i>
                      {t("header.logout")}
                    </Dropdown.Item>
                  </>
                ) : (
                  <>
                    <Dropdown.Item as={Link} to="/register">
                      <i className="fa-regular fa-user-plus"></i>
                      {t("header.addNewAccount")}
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/login">
                      <i className="fa-regular fa-arrow-right-to-bracket"></i>
                      {t("header.login")}
                    </Dropdown.Item>
                  </>
                )}
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
