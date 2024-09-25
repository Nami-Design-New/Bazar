
import EmptyData from "../../ui/EmptyData";
import Post from "../../ui/cards/Post";
import DataLoader from "../../ui/DataLoader";
import { IconCirclePlus } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useUserAds from "../../hooks/ads/useUserAds";

function AdsTab({isMyAccount, user}) {
  const { t } = useTranslation();
  
  const { isLoading: adsLoading, data: ads } = useUserAds(user?.id);

  return (
    <>
      {isMyAccount && (
        <div className="w-100 btn-wrapper d-flex justify-content-end mb-3 p-2">
          <Link to="/add-ad" className="custom-btn stroke">
            <span>
              <IconCirclePlus stroke={2} /> {t("ads.addAD")}
            </span>
          </Link>
        </div>
      )}
      {adsLoading ? (
        <DataLoader minHeight="400px" />
      ) : ads?.data && ads?.data?.length > 0 ? (
        ads?.data?.map((ad) => (
          <div className="col-lg-4 col-md-6 col-12 p-2" key={ad?.id}>
            <Post
              userId={user?.id}
              post={ad}
              isMyAccount={isMyAccount}
              isMyPost={true}
            />
          </div>
        ))
      ) : (
        <EmptyData minHeight={"300px"}>{t("profile.noAds")}</EmptyData>
      )}
    </>
  );
}

export default AdsTab;
