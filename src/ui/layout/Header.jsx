import HeaderTopBar from "./HeaderTopBar";
import NotificationItem from "./NotificationItem";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Dropdown } from "react-bootstrap";
import { useEffect, useState } from "react";
import {
  IconBell,
  IconCirclePlus,
  IconMessage,
  IconShoppingBag
} from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import axios from "../../utils/axios";
import { setIsLogged, setUser } from "../../redux/slices/authedUser";
import { useQueryClient } from "@tanstack/react-query";

export default function Header() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isFixedTop, setIsFixedTop] = useState(false);
  const user = useSelector((state) => state.authedUser.user);
  const isLogged = useSelector((state) => state.authedUser.isLogged);
  const [, , deleteCookie] = useCookies();
  const dispatch = useDispatch();
  const [cookies] = useCookies(["token"]);
  const token = cookies?.token;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleClickOutSide = () => {
    setIsOpen(false);
  };

  const performLogout = async () => {
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
                <img src={`/images/logo.png`} alt="" />
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
                  {user?.image ? (
                    <img src={user?.image} alt={user?.name} />
                  ) : (
                    <i className="fa-light fa-user"></i>
                  )}
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {isLogged && user && (
                  <>
                    <Dropdown.Item as={Link} to="/profile">
                      <i className="fa-solid fa-user"></i> {t("header.profile")}
                    </Dropdown.Item>

                    <Dropdown.Item as={Link} to="/edit-profile">
                      <i className="fa-light fa-pen-to-square"></i>
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
                  </>
                )}

                {isLogged && user ? (
                  <Dropdown.Item onClick={performLogout}>
                    <i className="fa-regular fa-arrow-right-from-bracket"></i>
                    {t("header.logout")}
                  </Dropdown.Item>
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
