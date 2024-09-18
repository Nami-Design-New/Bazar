import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import axios from "./../../utils/axios";
import InputField from "./../../ui/form-elements/InputField";
import SubmitButton from "./../../ui/form-elements/SubmitButton";
import MapWithMarker from './../../ui/MapWithMarker';

const AddAddress = ({ showModal, setShowModal }) => {
  const queryClient = useQueryClient();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    address_title: "",
    recipient_name: "",
    recipient_phone: "",
    address: "",
    lat: 24.7136,
    lng: 46.6753
  });

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
      const res = await axios.post("/user/create_address", formData);
      if (res?.data?.code === 200) {
        toast.success("تم اضافة العنوان بنجاح");
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
        <h6>أضف عنوان جديد</h6>
      </Modal.Header>
      <Modal.Body>
        <form className="form" onSubmit={handleSubmit}>
          <div className="row m-0 w-100">
            <div className=" col-12 p-2">
              <InputField
                label="اسم العنوان"
                placeholder="مثال: المنزل"
                value={formData.address_title}
                onChange={(e) =>
                  setFormData({ ...formData, address_title: e.target.value })
                }
              />
            </div>

            <div className="col-lg-6 col-12 p-2">
              <InputField
                label="اسم المستلم"
                placeholder="اسم المستلم"
                value={formData.recipient_name}
                onChange={(e) =>
                  setFormData({ ...formData, recipient_name: e.target.value })
                }
              />
            </div>

            <div className="col-lg-6 col-12 p-2">
              <InputField
                label="رقم الهاتف"
                placeholder="هاتف المستلم"
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
