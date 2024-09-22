import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import SubmitButton from "../form-elements/SubmitButton";

function DeleteCartAndAdd({ showModal, setShowModal, eventFun, loading }) {
  const { t } = useTranslation();
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header className="pb-0" closeButton />
      <Modal.Body className="confirm-delete">
        <p>{t("delete_cart_and_add")}</p>
        <div className="d-flex justify-content-end gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(false);
            }}
            className="cancel-btn"
          >
            {t("cancel")}
          </button>
          <SubmitButton
            className={"delete-btn"}
            name={t("delete_cart_and_add_product")}
            onClick={eventFun}
            loading={loading}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteCartAndAdd;
