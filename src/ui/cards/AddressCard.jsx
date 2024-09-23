import { useTranslation } from "react-i18next";
import ConfirmationModal from "../modals/ConfirmationModal";
import { useState } from "react";
import useGetAddresses from "../../hooks/profile/useGetAddresses";
import axios from "./../../utils/axios";
import { toast } from "react-toastify";
import { formatTimeDifference, getTimeDifference } from "../../utils/helpers";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "12px",
  overflow: "hidden",
};

function AddressCard({
  userId,
  address,
  isMyAccount,
  setTargetAddress,
  setShowModal,
}) {
  const { t } = useTranslation();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const { refetch } = useGetAddresses();

  const timeDifference = getTimeDifference(address?.created_at);
  const creationTime = formatTimeDifference(
    timeDifference.years,
    timeDifference.months,
    timeDifference.days,
    timeDifference.hours,
    timeDifference.minutes,
    t
  );

  function handleOpenConfirmation(e) {
    e.preventDefault();
    e.stopPropagation();
    setShowConfirmation(true);
  }

  function handleLinkClick(e) {
    e.stopPropagation();
    if (
      e.target.classList.contains("delete") ||
      e.target.classList.contains("favorite") ||
      showConfirmation
    ) {
      e.preventDefault();
    }
  }

  const deleteAd = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/user/delete_address", { id: address?.id });
      if (res.data?.code === 200) {
        toast.success("تم حذف العنوان بنجاح");
        setShowConfirmation(false);
        refetch(userId);
      } else {
        toast.error(res.data?.message);
      }
    } catch (error) {
      toast.error(error.response);
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="item" onClick={handleLinkClick}>
      <div className="actions-wrapper">
        {isMyAccount && (
          <>
            <button
              className={`action delete`}
              onClick={handleOpenConfirmation}
              style={{ cursor: "pointer" }}
            >
              <i className="fa-regular fa-trash "></i>
            </button>
            <span
              className={`action edit`}
              onClick={() => {
                setTargetAddress(address);
                setShowModal(true);
              }}
              style={{ cursor: "pointer" }}
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </span>
          </>
        )}
      </div>

      <div className="itemImg">
        <LoadScript googleMapsApiKey="AIzaSyD_N1k4WKCdiZqCIjjgO0aaKz1Y19JqYqw">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{
              lat: address?.lat,
              lng: address?.lng,
            }}
            zoom={10}
          >
            <Marker
              icon="/images/map-pin.svg"
              position={{
                lat: address?.lat,
                lng: address?.lng,
              }}
            ></Marker>
          </GoogleMap>
        </LoadScript>
      </div>

      <div className="itemInfo">
        {address?.created_at && creationTime ? (
          <div className="time">
            <img src="/images/clock.svg" alt="" /> {creationTime}
          </div>
        ) : null}

        {address?.address_title && (
          <h3 to={`/ad-details/${address?.id}`} className="title">
            {address?.address_title}
          </h3>
        )}

        {address?.address ? (
          <div className="location">
            <img src="/images/location.svg" alt="" />
            <span className=" one-line-wrap"> {address?.address} </span>
          </div>
        ) : null}

        {address?.recipient_phone ? (
          <div className="location">
            <img src="../../../images/phone.svg" alt="" />
            <span className=" one-line-wrap"> {address?.recipient_phone} </span>
          </div>
        ) : null}
      </div>
      <ConfirmationModal
        showModal={showConfirmation}
        setShowModal={setShowConfirmation}
        type="delete"
        eventFun={deleteAd}
        buttonText={t("delete")}
        loading={loading}
        text={t("profile.areYouSureYouWantToDeleteLocation")}
      />
    </div>
  );
}

export default AddressCard;
