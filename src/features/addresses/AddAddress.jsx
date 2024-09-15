import InputField from "./../../ui/form-elements/InputField";
import MapWithMarker from "../../utils/MapWithMarker";
import SubmitButton from "./../../ui/form-elements/SubmitButton";
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";

const AddAddress = ({ showModal, setShowModal }) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    address_title: "",
    recipient_name: "",
    recipient_phone: "",
    address: "",
    lat: "",
    lng: ""
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

  const handleSubmit = () => {};
  return (
    <Modal
      show={showModal}
      size="lg"
      centered
      onHide={() => setShowModal(false)}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <h6>Add New Destination</h6>
      </Modal.Header>
      <Modal.Body>
        <form className="form" onSubmit={handleSubmit}>
          <div className="row m-0">
            <div className="col-lg-6 col-12 p-2">
              <InputField
                label="اسم العنوان"
                placeholder={"write here"}
                value={formData.address_title}
                onChange={(e) =>
                  setFormData({ ...formData, address_title: e.target.value })
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
