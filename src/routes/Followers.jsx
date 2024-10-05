import { useTranslation } from "react-i18next";
import EmptyData from "../ui/EmptyData";
import SectionHeader from "../ui/layout/SectionHeader";
import { Tab, Tabs } from "react-bootstrap";
import DataLoader from "../ui/DataLoader";
import useGetFollowers from "../components/followers/useGetFollowers";
import useGetFollowings from "../components/followers/useGetFollowings";
import UserCard from "../ui/cards/UserCard";
import { useSearchParams } from "react-router-dom";

function Followers() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "followers";
  const { isLoading: followersLoading, data: followers } = useGetFollowers({
    type: "followed",
  });
  const { isLoading: followingsLoading, data: followings } = useGetFollowings({
    type: "user",
  });

  function handleTabChange(tab) {
    setSearchParams({ tab });
  }

  return (
    <>
      <SectionHeader />
      <section className="favorites-section tabs-section">
        <div className="container">
          <Tabs
            activeKey={activeTab}
            id="uncontrolled-tab-example"
            onSelect={(tab) => handleTabChange(tab)}
          >
            {/* Followers */}
            <Tab
              eventKey="followers"
              title={t("profile.followersTab")}
              className="tab_item"
            >
              <div className="content-wrapper">
                {followersLoading ? (
                  <DataLoader minHeight="400px" />
                ) : followers?.data && followers?.data?.length > 0 ? (
                  followers?.data?.map((user) => (
                    <div
                      className="col-md-6 col-lg-3 col-12 p-2"
                      key={user?.id}
                    >
                      <UserCard user={user} type="follower" />
                    </div>
                  ))
                ) : (
                  <EmptyData minHeight={"300px"}>
                    {t("profile.noFollowers")}
                  </EmptyData>
                )}
              </div>
            </Tab>

            {/* Followings */}
            <Tab
              eventKey="followings"
              title={t("profile.followingsTab")}
              className="tab_item"
            >
              <div className="content-wrapper">
                {followingsLoading ? (
                  <DataLoader minHeight="400px" />
                ) : followings?.data && followings?.data?.length > 0 ? (
                  followings?.data?.map((user) => (
                    <div
                      className="col-md-6 col-lg-3 col-12 p-2"
                      key={user?.id}
                    >
                      <UserCard user={user} type="following" />
                    </div>
                  ))
                ) : (
                  <EmptyData minHeight={"300px"}>
                    {t("profile.noFollowings")}
                  </EmptyData>
                )}
              </div>
            </Tab>
          </Tabs>
        </div>
      </section>
    </>
  );
}

export default Followers;
