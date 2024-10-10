import { useTranslation } from "react-i18next";
import Post from "../../ui/cards/Post";
import DataLoader from "../../ui/DataLoader";
import EmptyData from "../../ui/EmptyData";
import useUserRewards from "../../hooks/profile/useUserRewards";
import useGetSettings from "../../hooks/settings/useGetSettings";
import SubmitButton from "../../ui/form-elements/SubmitButton";
import { useState } from "react";
import axios from "../../utils/axios";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import useGetRewardValue from "../../hooks/profile/useGetRewardValue";
import { useNavigate } from "react-router-dom";

function RewardsTab({ isMyAccount, user }) {
  const { t } = useTranslation();
  const { isLoading: rewardsLoading, data: rewards } = useUserRewards(user?.id);
  const { isLoading: settingsLoading, data: settings } = useGetSettings();
  const [finishLoading, setFinishLoading] = useState(false);
  const { data: rewardValue } = useGetRewardValue();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // const [hasReward, setHasReward] = useState(false);
  // useEffect(() => {
  //   setHasReward(() =>
  //     rewards?.data && rewards?.data?.length > 0
  //       ? rewards?.data?.some((reward) => reward?.rewarded)
  //       : false
  //   );
  // }, [rewards?.data]);

  const handleFinishReward = async (e) => {
    e.preventDefault();
    setFinishLoading(true);
    try {
      const res = await axios.get("/user/finish_reward");
      if (res?.data?.code === 200 || res?.data?.code === 201) {
        toast.success(t("profile.successfullyWithdrawRewards"));
        queryClient.invalidateQueries({ queryKey: ["userRewards"] });
        queryClient.invalidateQueries({ queryKey: ["rewardValue"] });
        navigate("/profile?tab=balance");
      } else {
        toast.error("profile.finishRewardError");
        setFinishLoading(false);
      }
    } catch (error) {
      toast.error("profile.finishRewardError");
      setFinishLoading(false);
      throw new Error(error.message);
    } finally {
      setFinishLoading(false);
    }
  };

  return rewardsLoading || settingsLoading ? (
    <DataLoader minHeight="400px" />
  ) : rewards?.data && rewards?.data?.length > 0 ? (
    <>
      {isMyAccount &&
        (rewardValue?.data ? (
          <div className="rewarded d-flex align-items-center flex-row flex-wrap justify-content-center">
            <h4 style={{ textWrap: "balance" }}>{t("profile.noRewards")}</h4>
            <div
              className="btns-wrapper d-flex align-items-center justify-content-end"
              style={{ flex: "1 0" }}
            >
              <SubmitButton
                className={"custom-btn filled"}
                style={{
                  width: "unset !important",
                  padding: "8px 16px",
                  minWidth: "160px",
                }}
                name={t("profile.withdrawRewards")}
                loading={finishLoading}
                onClick={handleFinishReward}
              />
            </div>
          </div>
        ) : (
          <div className={"no-rewards"}>
            <h5 style={{ textWrap: "balance" }}>{t("profile.noRewards")}</h5>
            {settings?.reward_rate_average ||
            settings?.reward_favorite_count ? (
              <>
                <h5>{t("profile.rewardsConditions")}:</h5>
                <ol className="px-4 d-flex flex-column gap-1">
                  {settings?.reward_favorite_count ? (
                    <li>
                      {t("profile.rewardsFavoritesConditions1")}{" "}
                      {settings?.reward_favorite_count}{" "}
                      {t("profile.rewardsFavoritesConditions2")}
                    </li>
                  ) : null}
                  {settings?.reward_rate_average ? (
                    <li>
                      {t("profile.rewardsRateConditions1")}{" "}
                      {settings?.reward_rate_average}{" "}
                      {t("profile.rewardsRateConditions2")}
                    </li>
                  ) : null}
                </ol>
              </>
            ) : null}
          </div>
        ))}
      {rewards?.data?.map((reward) => (
        <div className="col-lg-4 col-md-6 col-12 p-2" key={reward?.id}>
          <Post
            userId={user?.id}
            post={reward}
            isMyAccount={isMyAccount}
            type="reward"
            isMyPost={true}
          />
        </div>
      ))}
    </>
  ) : (
    <EmptyData minHeight={"300px"}>{t("profile.noAds")}</EmptyData>
  );
}

export default RewardsTab;
