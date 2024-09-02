import { IconLanguage } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setLanguage } from "../../redux/slices/language";
import i18next from "i18next";

export default function HeaderTopBar() {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.language.lang);

  const handleLang = (newLang) => {
    dispatch(setLanguage(newLang));
    i18next.changeLanguage(newLang);
    const bodyElement = document.querySelector("body");
    if (bodyElement) {
      bodyElement.classList.toggle("en", newLang === "en");
    }
  };

  return (
    <div className="header_bar">
      <div className="container">
        <div
          className="language"
          onClick={() => handleLang(lang === "en" ? "ar" : "en")}
        >
          <button>
            <span>{lang === "en" ? "AR" : "EN"}</span>
            <IconLanguage stroke={1} />
          </button>
        </div>

        <div className="social">
          <ul>
            <li>
              <Link>
                <i className="fa-brands fa-facebook-f"></i>
              </Link>
            </li>
            <li>
              <Link>
                <i className="fa-brands fa-instagram"></i>
              </Link>
            </li>
            <li>
              <Link>
                <i className="fa-brands fa-twitter"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
