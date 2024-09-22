import { IconXboxX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function Share({ show, setShow, id }) {
  const { t } = useTranslation();
  const currentPageLink = window.location.href + `?id=${id}`;
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
      document.querySelector(".videos_wrapper").style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.querySelector(".videos_wrapper").style.overflow = "scroll";
    }
  }, [show]);

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
    <div className={`share ${show ? "show" : ""}`}>
      <div className="header">
        <h6>{t("share.share")}</h6>
        <button onClick={() => setShow(false)}>
          <IconXboxX stroke={1.5} />
        </button>
      </div>
      <div className="body">
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
      </div>
    </div>
  );
}

export default Share;
