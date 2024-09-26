import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ConfirmationModal from "../../ui/modals/ConfirmationModal";
import { deleteBank } from "../../services/apiBanks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

function BankAcountCard({ targetBank, setShowModal, setTargetBank, bank }) {
  const { t } = useTranslation();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    try {
      await deleteBank(targetBank?.id, queryClient);
      toast.success(t("manageAccounts.bankDeletedSuccessfully"));
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setShowConfirmation(false);
      setTargetBank("");
    }
  };

  const handleEdit = async () => {
    setShowModal(true);
    setTargetBank(bank);
  };

  return (
    <>
      <div className="bank-acc-card">
        <div className="image-wrapper">
          {bank?.image ? (
            <img src={bank?.image} alt={bank?.name} />
          ) : (
            <i className="fa-sharp fa-regular fa-building-columns"></i>
          )}
        </div>
        <div className="info-wrapper">
          <h5>{bank?.name}</h5>
          <div className="info-boxes-wrapper">
            {(bank?.city || bank?.area) && (
              <div className="info-box">
                <span className="box-title">
                  <i className="fa-solid fa-location-dot"></i>
                </span>
                <span className="box-value">{`${
                  bank.city ? bank.city + "" : ""
                } ${bank.city && bank.area ? ", " : ""} ${
                  bank.area ? bank.area : ""
                }`}</span>
              </div>
            )}
            {(bank?.address1 || bank?.address2) && (
              <div className="info-box">
                <span className="box-title">
                  <i className="fa-regular fa-house"></i>
                </span>
                <span className="box-value">{`${
                  bank.address1 ? bank.address1 + "" : ""
                } ${bank.address2 && bank.address2 ? ", " : ""} ${
                  bank.address2 ? bank.address2 : ""
                }`}</span>
              </div>
            )}
            {bank?.iban && (
              <div className="info-box">
                <span className="box-title">
                  <i className="fa-regular fa-money-check"></i>
                </span>
                <span className="box-value">{bank.iban}</span>
              </div>
            )}
            {bank?.swift && (
              <div className="info-box">
                <span className="box-title">
                  <i className="fa-solid fa-globe"></i>
                </span>
                <span className="box-value">{bank.swift}</span>
              </div>
            )}
            {bank?.zip && (
              <div className="info-box">
                <span className="box-title">
                  <i className="fa-sharp fa-regular fa-envelopes-bulk"></i>
                </span>
                <span className="box-value">{bank.zip}</span>
              </div>
            )}
            {bank?.bank_number && (
              <div className="info-box">
                <span className="box-title">
                  <i className="fa-sharp fa-regular fa-file-spreadsheet"></i>
                </span>
                <span className="box-value">{bank.bank_number}</span>
              </div>
            )}
          </div>
        </div>
        <div className="icons">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setTargetBank(bank?.id);
              handleEdit();
            }}
          >
            <IconEdit stroke={2} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setTargetBank(bank);
              setShowConfirmation(true);
            }}
          >
            <IconTrash stroke={2} />
          </button>
        </div>
      </div>

      <ConfirmationModal
        showModal={showConfirmation}
        setShowModal={setShowConfirmation}
        type="delete"
        eventFun={handleDelete}
        buttonText={t("profile.delete")}
        text={t("manageAccounts.areYouSureYouWantToDelete")}
      />
    </>
  );
}

export default BankAcountCard;
