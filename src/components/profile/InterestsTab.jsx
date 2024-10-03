import { IconCirclePlus } from "@tabler/icons-react";
import InterestMiniCard from "../../ui/cards/InterestMiniCard";
import DataLoader from "../../ui/DataLoader";
import EmptyData from "../../ui/EmptyData";
import useUserInterests from "../../hooks/profile/useUserInterests";
import { useState } from "react";
import AddInterest from "../../ui/modals/AddInterest";
import { useTranslation } from "react-i18next";

function InterestsTab({ isMyAccount, user }) {
  const { t } = useTranslation();
  const { isLoading: interestsLoading, data: interests } = useUserInterests(
    user?.id
  );
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [targetInterest, setTargetInterest] = useState(null);

  return (
    <>
      {isMyAccount && (
        <div className="w-100 btn-wrapper d-flex justify-content-end mb-3 p-2">
          <span
            className="custom-btn stroke"
            onClick={() => setShowInterestModal(true)}
            style={{ cursor: "pointer" }}
          >
            <span>
              <IconCirclePlus stroke={2} /> {t("profile.addInterest")}
            </span>
          </span>
        </div>
      )}
      {interestsLoading ? (
        <DataLoader minHeight="400px" />
      ) : interests?.data && interests?.data?.length > 0 ? (
        interests?.data?.map((interest) => (
          <div className=" col-12 p-1" key={interest?.id}>
            <InterestMiniCard
              interest={interest}
              isMyAccount={isMyAccount}
              setTargetInterest={setTargetInterest}
              setShowInterestModal={setShowInterestModal}
            />
          </div>
        ))
      ) : (
        <EmptyData minHeight={"300px"}>{t("profile.noOrders")}</EmptyData>
      )}

      <AddInterest
        interest={targetInterest}
        showModal={showInterestModal}
        setShowModal={setShowInterestModal}
        setTargetInterest={setTargetInterest}
      />
    </>
  );
}

export default InterestsTab;
