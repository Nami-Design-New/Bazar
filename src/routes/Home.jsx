import useCategoriesList from "../features/categories/useCategoriesList";
import Categories from "../features/home/Categories";
import HeroSection from "../features/home/HeroSection";
import PopularItems from "../features/home/PopularItems";
import Sliders from "../features/home/Sliders";
import DownLoadApp from "../ui/layout/DownLoadApp";

export default function Home() {
  const { data: categories } = useCategoriesList();

  return (
    <>
      <HeroSection />
      <Categories categories={categories} />
      <PopularItems />
      <Sliders categories={categories} />
      <DownLoadApp />
    </>
  );
}
