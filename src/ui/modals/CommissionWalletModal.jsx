import { useTranslation } from "react-i18next";
import useBanksList from "../../hooks/banks/useBanksList";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import { createTransfer } from "../../services/apiCommissions";
import BankTransferCard from "../cards/BankTransferCard";
import InputField from "../form-elements/InputField";
import { handleChange } from "../../utils/helpers";
import PhoneField from "../form-elements/PhoneField";
import SubmitButton from "../form-elements/SubmitButton";
import { useNavigate } from "react-router-dom";

function CommissionWalletModal({ setShowModal, showModal, ids, price }) {
  const { t } = useTranslation();
  const { isLoading, data: banks } = useBanksList();
  const [bankId, setBankId] = useState(banks?.[0]?.id);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    name: "",
    image: "",
  });

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const requestBody = {
      ids: ids,
      price: price,
      ...formData,
    };

    if (bankId) {
      requestBody.bank_id = bankId;
    } else {
      toast?.error(t("commissions.selectBank"));
      setLoading(false);
      return;
    }

    try {
      await createTransfer(requestBody, queryClient);
      toast.success(t("commissions.successfullySentData"));
      setShowModal(false);
      navigate("/profile")
    } catch (error) {
      setShowModal(false);
      throw new Error(error.message);
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header className="pb-0" closeButton>
        <h5>{t("commissions.transferCommissions")}</h5>
      </Modal.Header>
      <Modal.Body className="pay_modal">
        <form className="form" onSubmit={handleSubmit}>
          <InputField
            type="number"
            id="amount"
            name="amount"
            placeholder={"00"}
            value={price?.toFixed(2)}
            label={`${t("commissions.amount")} `}
            disabled={true}
          />

          {isLoading ? (
            <div className="skeleton-container">
              <div className="skeleton-item"></div>
            </div>
          ) : (
            banks &&
            banks?.length > 0 &&
            banks.map((bank) => (
              <BankTransferCard
                key={bank.id}
                bank={bank}
                bankTransfer={bankId}
                onChange={(id) => setBankId(id)}
                disabled={loading}
                required={true}
              />
            ))
          )}

          <InputField
            type="text"
            id="name"
            name="name"
            placeholder={"writeHere"}
            value={formData?.name}
            onChange={(e) => handleChange(e, setFormData)}
            label={`${t("commissions.name")} `}
          />

          <InputField
            type="date"
            id="date"
            name="date"
            value={formData?.date}
            onChange={(e) => handleChange(e, setFormData)}
            label={`${t("commissions.date")} `}
          />

          <PhoneField
            label={t("commissions.phone")}
            onChange={(e) => handleChange(e, setFormData)}
            value={formData.phone}
            id="phone"
            name="phone"
            type="tel"
            placeholder={t("5XXXXXXX")}
            maxLength={9}
            required={true}
          />

          <div className="input-field recipe-image-wrapper">
            <label htmlFor="recipe-image">{t("commissions.image")}</label>
            <label className="recipe-image">
              <input
                type="file"
                id="image"
                accept="image/*"
                name="image"
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    image: e.target.files[0],
                  }))
                }
                required={true}
              />
              {formData?.image ? (
                <>
                  <img
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "100%",
                    }}
                    src={
                      formData?.image?.type?.startsWith("image")
                        ? URL.createObjectURL(formData?.image)
                        : formData?.image
                    }
                    alt="upload"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setFormData({
                        ...formData,
                        image: "",
                      });
                    }}
                  >
                    <i className="fa-light fa-xmark"></i>
                  </button>
                </>
              ) : (
                <img src="/images/gallery.svg" alt="upload" />
              )}
            </label>
          </div>
          <div className="w-100 d-flex justify-content-end gap-3">
            <button
              onClick={() => setShowModal(false)}
              className="cancel-btn custom-btn stroke"
            >
              <span>{t("cancel")}</span>
            </button>
            <SubmitButton
              className={"custom-btn filled"}
              name={t("commissions.createTransfer")}
              loading={loading}
            />
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default CommissionWalletModal;
