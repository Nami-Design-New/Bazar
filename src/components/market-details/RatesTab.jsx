import { useState } from "react";
import DataLoader from "../../ui/DataLoader";
import RateCard from "./../../ui/cards/RateCard";
import CreateComment from "./../../ui/CreateComment";

function RatesTab({ market, rates, ratesLoading }) {
  const [targetedComment, setTargetedComment] = useState("");

  return (
    <div className="content-wrapper container">
      {market?.data?.rated ? null : (
        <CreateComment
          comment={targetedComment}
          setTargetedComment={setTargetedComment}
        />
      )}
      {ratesLoading ? (
        <DataLoader minHeight={"300px"} />
      ) : (
        rates?.data &&
        rates?.data?.length > 0 && (
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
        )
      )}
    </div>
  );
}

export default RatesTab;
