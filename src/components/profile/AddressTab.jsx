import { useState } from "react";
import AddressCard from "../../ui/cards/AddressCard";
import DataLoader from "../../ui/DataLoader";
import EmptyData from "../../ui/EmptyData";
import AddAddress from "../addresses/AddAddress";
import useGetAddresses from "../../hooks/profile/useGetAddresses";
import { IconCirclePlus } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";


function AddressTab({ user, isMyAccount }) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [targetAddress, setTargetAddress] = useState(null);
  const { isLoading: addressesLoading, data: addresses } = useGetAddresses(
    user?.id
  );

  return (
    <>
      {isMyAccount && (
        <div className="w-100 btn-wrapper d-flex justify-content-end mb-3 p-2">
          <span
            className="custom-btn stroke"
            onClick={() => setShowModal(true)}
            style={{ cursor: "pointer" }}
          >
            <span>
              <IconCirclePlus stroke={2} /> {t("profile.addAddress")}
            </span>
          </span>
        </div>
      )}
      {addressesLoading ? (
        <DataLoader minHeight="400px" />
      ) : addresses?.data && addresses?.data?.length > 0 ? (
        addresses?.data?.map((address) => (
          <div className="col-lg-6 col-12 p-2" key={address?.id}>
            <AddressCard
              userId={user?.id}
              address={address}
              isMyAccount={isMyAccount}
              setTargetAddress={setTargetAddress}
              setShowModal={setShowModal}
            />
          </div>
        ))
      ) : (
        <EmptyData minHeight={"300px"}>{t("profile.noAds")}</EmptyData>
      )}
      <AddAddress
        showModal={showModal}
        setShowModal={setShowModal}
        targetAddress={targetAddress}
        setTargetAddress={setTargetAddress}
      />
    </>
  );
}

export default AddressTab;
