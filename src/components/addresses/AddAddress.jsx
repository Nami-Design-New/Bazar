import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import axios from "./../../utils/axios";
import InputField from "./../../ui/form-elements/InputField";
import SubmitButton from "./../../ui/form-elements/SubmitButton";
import MapWithMarker from "./../../ui/MapWithMarker";

const AddAddress = ({
  showModal,
  setShowModal,
  setTargetAddress,
  targetAddress
}) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    address_title: targetAddress?.address_title || "",
    recipient_name: targetAddress?.recipient_name || "",
    recipient_phone: targetAddress?.recipient_phone || "",
    address: targetAddress?.address || "",
    lat: targetAddress?.lat || 24.7136,
    lng: targetAddress?.lat || 46.6753
  });

  useEffect(() => {
    setFormData({
      ...formData,
      address_title: targetAddress?.address_title || "",
      recipient_name: targetAddress?.recipient_name || "",
      recipient_phone: targetAddress?.recipient_phone || "",
      address: targetAddress?.address || "",
      lat: targetAddress?.lat || 24.7136,
      lng: targetAddress?.lat || 46.6753
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetAddress]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD_N1k4WKCdiZqCIjjgO0aaKz1Y19JqYqw&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.onload = () => setMapLoaded(true);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `/user${targetAddress ? "/edit_address" : "/create_address"}`,
        formData
      );
      if (res?.data?.code === 200) {
        toast.success(
          t(`addresses.${targetAddress ? "addressUpdated" : "addressAdded"}`)
        );
        setShowModal(false);
        queryClient.invalidateQueries(["addresses"]);
        setFormData({
          address_title: "",
          recipient_name: "",
          recipient_phone: "",
          address: "",
          lat: 24.7136,
          lng: 46.6753
        });
        setTargetAddress(null);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={showModal}
      size="lg"
      centered
      onHide={() => setShowModal(false)}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <h6>{t("addresses.addAddress")}</h6>
      </Modal.Header>
      <Modal.Body>
        <form className="form" onSubmit={handleSubmit}>
          <div className="row m-0 w-100">
            <div className=" col-12 p-2">
              <InputField
                label={t("addresses.addressTitle")}
                placeholder={t("addresses.addressTitlePlaceholder")}
                value={formData.address_title}
                onChange={(e) =>
                  setFormData({ ...formData, address_title: e.target.value })
                }
              />
            </div>

            <div className="col-lg-6 col-12 p-2">
              <InputField
                label={t("addresses.recipientName")}
                placeholder={t("addresses.recipientNamePlaceholder")}
                value={formData.recipient_name}
                onChange={(e) =>
                  setFormData({ ...formData, recipient_name: e.target.value })
                }
              />
            </div>

            <div className="col-lg-6 col-12 p-2">
              <InputField
                label={t("addresses.recipientPhone")}
                placeholder={t("addresses.recipientPhonePlaceholder")}
                value={formData.recipient_phone}
                onChange={(e) =>
                  setFormData({ ...formData, recipient_phone: e.target.value })
                }
              />
            </div>

            <div className="col-12 p-2">
              {mapLoaded && (
                <MapWithMarker formData={formData} setFormData={setFormData} />
              )}
            </div>
            <div className="col-12 p-2">
              <SubmitButton name={"Save"} loading={loading} />
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddAddress;
