import { IconCirclePlus } from "@tabler/icons-react";
import RateCard from "../../ui/cards/RateCard";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import CreateRateModal from "../../ui/modals/CreateRateModal";
import DataLoader from "../../ui/DataLoader";
import CustomPagination from "../../ui/CustomPagination";
import EmptyData from "../../ui/EmptyData";

function ADRatesTab({ ad, rates, ratesLoading, isMyAd, refetch }) {
  const { t } = useTranslation();

  const [showRateModal, setShowRateModal] = useState(false);

  return ratesLoading ? (
    <DataLoader minHeight={"200px"} />
  ) : (
    <>
      {!rates?.data && isMyAd ? (
        <EmptyData minHeight={"300px"}>{t("ads.noRates")}</EmptyData>
      ) : (
        <div className="itemDetailsBox d-flex flex-column gap-2">
          {ad?.data?.is_rated ? null : (
            <div className="w-100 d-flex align-items-center justify-content-end gap-2">
              <span
                className="custom-btn filled"
                style={{
                  width: "unset !important",
                  aspectRatio: " 1 / 1",
                  cursor: "pointer",
                }}
                onClick={() => setShowRateModal(true)}
              >
                <span
                  className="d-flex align-items-center justify-content-center gap-2"
                  style={{ padding: "8px 16px", whiteSpace: "nowrap" }}
                >
                  <IconCirclePlus stroke={1.5} />
                  {t("ads.addRate")}
                </span>
              </span>
            </div>
          )}
          {rates?.data?.map((rate) => (
            <RateCard key={rate?.id} rate={rate} />
          ))}

          {rates?.data && rates?.total > 10 && (
            <CustomPagination
              count={rates?.total}
              pageSize={5}
              param="rates-page"
            />
          )}
        </div>
      )}
      <CreateRateModal
        id={ad?.data?.id}
        showModal={showRateModal}
        setShowModal={setShowRateModal}
        refetch={refetch}
      />
    </>
  );
}

export default ADRatesTab;
