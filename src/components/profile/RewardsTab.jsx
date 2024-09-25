import { useTranslation } from "react-i18next";
import Post from "../../ui/cards/Post";
import DataLoader from "../../ui/DataLoader";
import EmptyData from "../../ui/EmptyData";
import useUserRewards from "../../hooks/profile/useUserRewards";
import useGetSettings from "../../hooks/settings/useGetSettings";
import { useState } from "react";
import WithdrawModal from "../../ui/modals/WithdrawModal";

function RewardsTab({ isMyAccount, user }) {
  const { t } = useTranslation();
  const { isLoading: rewardsLoading, data: rewards } = useUserRewards(user?.id);
  const { isLoading: settingsLoading, data: settings } = useGetSettings();
  const [showWithdrawModel, setShowWithdrawModel] = useState(false);

  console.log(rewards);

  const hasReward =
    rewards?.data && rewards?.data?.length > 0
      ? rewards?.data?.some((reward) => reward?.rewarded)
      : false;

  return rewardsLoading || settingsLoading ? (
    <DataLoader minHeight="400px" />
  ) : rewards?.data && rewards?.data?.length > 0 ? (
    <>
      {isMyAccount &&
        (hasReward ? (
          <div className="w-100 btn-wrapper d-flex justify-content-end mb-3 p-2">
            <div className="btns-wrapper">
              <button
                className="btn custom-btn filled"
                style={{ width: "unset !important" }}
                onClick={() => setShowWithdrawModel(true)}
              >
                <span>{t("profile.withdrawRewards")}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="w-100 btn-wrapper d-flex gap-3 justify-content-end flex-column mb-3 p-2">
            <h4 style={{ textWrap: "balance" }}>{t("profile.noRewards")}</h4>
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
      <WithdrawModal
        showModal={showWithdrawModel}
        setShowModal={setShowWithdrawModel}
      />
    </>
  ) : (
    <EmptyData minHeight={"300px"}>{t("profile.noAds")}</EmptyData>
  );
}

export default RewardsTab;
