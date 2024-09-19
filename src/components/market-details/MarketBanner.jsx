import { useEffect, useState } from "react";
import { Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function MarketBanner({ market }) {
  const { t } = useTranslation();
  const [showTooltip, setShowTooltip] = useState(false);
  const currentPageLink = window.location.href;

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(currentPageLink);
    setShowTooltip(true);
  };

  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {props.content}
    </Tooltip>
  );

  const socialShareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentPageLink}`,
    instagram: `https://www.instagram.com/?url=${currentPageLink}`,
    twitter: `https://twitter.com/intent/tweet?url=${currentPageLink}`,
    snapchat: `https://www.snapchat.com/share?url=${currentPageLink}`,
    whatsapp: `https://wa.me/?text=${currentPageLink}`
  };

  return (
    <div className="page-header">
      <div className="cover-wrapper">
        <img src="/images/banner.png" alt="market cover image" />
        <div className="market">
          <div className="top-wrapper">
            <div className="logo-follow-wrapper">
              <div className="logo-wrapper">
                <img src={market?.data?.logo} alt="market logo image" />
              </div>
              <h3>{market?.data?.name}</h3>
            </div>

            <div className="btns-wrapper">
              <button className="action-btn follow">
                <i
                  className={`fa-regular fa-user-${
                    market?.data?.is_follow ? "check" : "plus"
                  }`}
                ></i>
                {market?.data?.is_follow ? t("following") : t("follow")}
              </button>

              <button className="btn-box follow">
                <img src="/images/heart.svg" alt="" />
              </button>

              <Dropdown>
                <Dropdown.Toggle className="btn-box share" id="dropdown-basic">
                  <i className="fa-solid fa-share"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <h5>{t("share.share")}</h5>
                  <ul className="social">
                    <li>
                      <a
                        href={socialShareLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fa-brands fa-facebook-f"></i>
                      </a>
                      {t("share.facebook")}
                    </li>
                    <li>
                      <a
                        href={socialShareLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fa-brands fa-instagram"></i>
                      </a>
                      {t("share.instgram")}
                    </li>
                    <li>
                      <a
                        href={socialShareLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fa-brands fa-twitter"></i>
                      </a>
                      {t("share.twitter")}
                    </li>
                    <li>
                      <a
                        href={socialShareLinks.snapchat}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fa-brands fa-snapchat"></i>
                      </a>
                      {t("share.snapchat")}
                    </li>
                    <li>
                      <a
                        href={socialShareLinks.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fa-brands fa-whatsapp"></i>
                      </a>
                      {t("share.whatsapp")}
                    </li>
                  </ul>
                  <p className="text-center">{t("share.orCopyLink")}</p>
                  <div className="link">
                    <button onClick={handleCopy}>
                      <i className="fa-sharp fa-regular fa-copy"></i>
                    </button>
                    <span onClick={handleCopy} id="url">
                      <OverlayTrigger
                        placement="bottom"
                        show={showTooltip}
                        overlay={renderTooltip({
                          content: t("share.linkCopied")
                        })}
                      >
                        <span>{currentPageLink}</span>
                      </OverlayTrigger>
                    </span>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketBanner;