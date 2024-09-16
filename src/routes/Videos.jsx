import useGetAdsVideos from "../features/ads/useGetAdsVideos";
import Video from "../features/videos/Video";
import DataLoader from "./../ui/DataLoader";

function Videos() {
  const { data: ads, isLoading } = useGetAdsVideos();
  return isLoading ? (
    <DataLoader />
  ) : (
    <section className="videos">
      <div className="videos_wrapper">
        {ads?.data?.map((ad) => {
          return <Video key={ad.id} ad={ad} />;
        })}
      </div>
    </section>
  );
}

export default Videos;
