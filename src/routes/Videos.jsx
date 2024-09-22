import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Video from "../components/videos/Video";
import DataLoader from "./../ui/DataLoader";
import useGetAdsVideos from "./../hooks/ads/useGetAdsVideos";

function Videos() {
  const [videos, setVideos] = useState([]);
  const [searchParams] = useSearchParams();
  const { data: ads, isLoading } = useGetAdsVideos();
  const id = searchParams.get("id");

  useEffect(() => {
    if (ads?.data) {
      let updatedVideos = [...ads.data];

      if (id) {
        const targetVideo = updatedVideos.find((ad) => ad.id === +id);
        updatedVideos = updatedVideos.filter((ad) => ad.id !== +id);

        updatedVideos = [targetVideo, ...updatedVideos];

        setVideos(updatedVideos);

        return;
      }

      setVideos(updatedVideos);
    }
  }, [ads?.data, id]);

  return isLoading ? (
    <DataLoader />
  ) : (
    <section className="videos">
      <div className="videos_wrapper">
        {videos?.map((ad) => {
          return <Video key={ad.id} ad={ad} setVideos={setVideos} />;
        })}
      </div>
    </section>
  );
}

export default Videos;
