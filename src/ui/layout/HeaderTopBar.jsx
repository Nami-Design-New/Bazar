import { IconLanguage } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function HeaderTopBar() {
  return (
    <div className="header_bar">
      <div className="container">
        <div className="language">
          <button>
            English
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
