import { useState } from "react";
import { useTranslation } from "react-i18next";
import DataLoader from "../../ui/DataLoader";
import RateCard from "./../../ui/cards/RateCard";
import EmptyData from "../../ui/EmptyData";
import CreateComment from "./../../ui/CreateComment";

function RatesTab({ rates, ratesLoading }) {
  const { t } = useTranslation();
  const [targetedComment, setTargetedComment] = useState("");

  return (
    <div className="content-wrapper container col-lg-10 col-12">
      {ratesLoading ? (
        <DataLoader minHeight={"300px"} />
      ) : rates?.data && rates?.data?.length > 0 ? (
        <>
          <div className="rates-wrapper">
            {rates?.data?.map((rate) => (
              <RateCard
                setTargetedComment={setTargetedComment}
                key={rate?._id}
                rate={rate}
              />
            ))}
          </div>
        </>
      ) : (
        <EmptyData minHeight={"300px"}>{t("markets.noRates")}</EmptyData>
      )}
      <CreateComment
        comment={targetedComment}
        setTargetedComment={setTargetedComment}
      />
    </div>
  );
}

export default RatesTab;
