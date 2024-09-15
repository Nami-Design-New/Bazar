import { useState } from "react";
import DataLoader from "../../ui/DataLoader";
import RateCard from "./../../ui/cards/RateCard";
import CreateComment from "./../../ui/CreateComment";

function RatesTab({ rates, ratesLoading }) {
  const [targetedComment, setTargetedComment] = useState("");

  return (
    <div className="content-wrapper container">
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
      <CreateComment
        comment={targetedComment}
        setTargetedComment={setTargetedComment}
      />
    </div>
  );
}

export default RatesTab;
