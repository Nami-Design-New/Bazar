import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import InputField from "../form-elements/InputField";
import SubmitButton from "./../form-elements/SubmitButton";
import { addBank, editBank } from "../../services/apiBanks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

function AddAccountModal({
  showModal,
  setShowModal,
  targetBank,
  setTargetBank,
}) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    user_name: "",
    iban: "",
    swift: "",
    address1: "",
    address2: "",
    zip: "",
    city: "",
    area: "",
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (targetBank) {
      setFormData({
        user_name: targetBank?.user_name || "",
        iban: targetBank?.iban || "",
        swift: targetBank?.swift || "",
        address1: targetBank?.address1 || "",
        address2: targetBank?.address2 || "",
        zip: targetBank?.zip || "",
        city: targetBank?.city || "",
        area: targetBank?.area || "",
      });
    }
  }, [targetBank]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const requestBody = {
        ...formData,
        id: targetBank?.id,
      };
      if (targetBank) {
        await editBank(requestBody, queryClient);
        toast.success(t("manageAccounts.bankUpdatedSuccessfully"));
      } else {
        await addBank(requestBody, queryClient);
        toast.success(t("manageAccounts.bankAddedSuccessfully"));
      }
      setShowModal(false);
      setFormData({
        user_name: targetBank?.user_name || "",
        iban: targetBank?.iban || "",
        swift: targetBank?.swift || "",
        address1: targetBank?.address1 || "",
        address2: targetBank?.address2 || "",
        zip: targetBank?.zip || "",
        city: targetBank?.city || "",
        area: targetBank?.area || "",
      });
      setTargetBank("");
    } catch (err) {
      throw new Error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
        setFormData({
          user_name: "",
          iban: "",
          swift: "",
          address1: "",
          address2: "",
          zip: "",
          city: "",
          area: "",
        });
        setTargetBank(null);
      }}
      centered
      size="lg"
    >
      <Modal.Header className="pb-0" closeButton>
        <Modal.Title>{t("manageAccounts.addAccount")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="add-work">
        <div className="login-section">
          <form className="form container m-0 w-100" onSubmit={handleSubmit}>
            <div className="row">
              {/* name */}
              <div className="col-12 p-2">
                <InputField
                  label={t("manageAccounts.userName")}
                  type="text"
                  name="user_name"
                  onChange={handleChange}
                  value={formData.user_name}
                  placeholder={t("writeHere")}
                />
              </div>
              {/* iban */}
              <div className="col-lg-6 col-12 p-2">
                <InputField
                  label={t("manageAccounts.iban")}
                  type="text"
                  name="iban"
                  onChange={handleChange}
                  value={formData.iban}
                  placeholder="Eg2132132213"
                  required={true}
                />
              </div>
              {/* swift */}
              <div className="col-lg-6 col-12 p-2">
                <InputField
                  label={t("manageAccounts.swift")}
                  type="number"
                  name="swift"
                  onChange={handleChange}
                  value={formData.swift}
                  placeholder="12345"
                  required={true}
                />
              </div>
              {/* address */}
              <div className="col-lg-6 col-12 p-2">
                <InputField
                  label={`${t("manageAccounts.address")} 1`}
                  type="address"
                  name="address1"
                  onChange={handleChange}
                  value={formData.address1}
                  placeholder={t("writeHere")}
                  required={true}
                />
              </div>
              {/* address */}
              <div className="col-lg-6 col-12 p-2">
                <InputField
                  label={`${t("manageAccounts.address")} 2`}
                  type="address"
                  name="address2"
                  onChange={handleChange}
                  value={formData.address2}
                  placeholder={t("writeHere")}
                />
              </div>
              {/* zip */}
              <div className="col-lg-6 col-12 p-2">
                <InputField
                  label={t("manageAccounts.zip")}
                  type="text"
                  name="zip"
                  onChange={handleChange}
                  value={formData.zip}
                  placeholder="996"
                  required={true}
                />
              </div>
              {/* city */}
              <div className="col-lg-6 col-12 p-2">
                <InputField
                  label={t("manageAccounts.city")}
                  type="text"
                  name="city"
                  onChange={handleChange}
                  value={formData.city}
                  placeholder={t("writeHere")}
                  required={true}
                />
              </div>
              {/* area */}
              <div className="col-lg-6 col-12 p-2">
                <InputField
                  label={t("manageAccounts.area")}
                  type="text"
                  name="area"
                  onChange={handleChange}
                  value={formData.area}
                  placeholder={t("writeHere")}
                  required={true}
                />
              </div>
              <div className="conditions-wrapper mt-2 mb-2 no-lines">
                <div className="checkbox-group">
                  <input type="checkbox" name="" id="fees" />
                  <label htmlFor="fees">
                    {t("manageAccounts.nameMatchingCondition")}
                  </label>
                </div>
                <div className="checkbox-group">
                  <input type="checkbox" name="" id="duration" />
                  <label htmlFor="duration">
                    {t("balance.durationCondition")}
                  </label>
                </div>
                <div className="checkbox-group">
                  <input type="checkbox" name="" id="responsibility" />
                  <label htmlFor="responsibility">
                    {t("manageAccounts.responsibilityCondition")}
                  </label>
                </div>
              </div>
              <div className="col-12 p-2">
                <SubmitButton
                  name={
                    targetBank
                      ? t("manageAccounts.edit")
                      : t("manageAccounts.add")
                  }
                  loading={loading}
                />
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AddAccountModal;
