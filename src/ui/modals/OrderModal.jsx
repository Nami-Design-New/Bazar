import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Lottie from "react-lottie";
import SubmitButton from "../form-elements/SubmitButton";
import animation from "../../../public/images/wallet.json";

const OrderModal = ({
  showModal,
  setShowModal,
  ballance,
  cartTotalPrice,
  eventFunction,
  loading,
}) => {
  const { t } = useTranslation();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header className="pb-0" closeButton />
      <Modal.Body className="pay_modal">
        <div className="current_ballance">
          <Lottie
            options={defaultOptions}
            height={150}
            width={150}
            className="icon"
          />
        </div>
        <h3>
          {t("cart.currentBallance")}:{" "}
          <span>
            {ballance} {t("currency.sar")}
          </span>
        </h3>
        <h3>
          {t("cart.valueWillbediscountedfromyourballance")}{" "}
          <span>
            {cartTotalPrice} {t("currency.sar")}
          </span>{" "}
          {t("cart.fromYourWallet")}
        </h3>
        <div className="d-flex justify-content-end gap-3 mt-4">
          <button onClick={() => setShowModal(false)} className="cancel-btn">
            {t("cancel")}
          </button>
          <SubmitButton
            name={t("orderNow")}
            loading={loading}
            onClick={eventFunction}
            className="order-now"
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default OrderModal;
