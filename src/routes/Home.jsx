import useCategoriesList from "../components/categories/useCategoriesList";
import Categories from "../components/home/Categories";
import HeroSection from "../components/home/HeroSection";
import PopularItems from "../components/home/PopularItems";
import Sliders from "../components/home/Sliders";
import DownLoadApp from "../ui/layout/DownLoadApp";

export default function Home() {
  const { isLoading: categoriesLoading, data: categories } =
    useCategoriesList();

  return (
    <>
      <HeroSection />
      <Categories categories={categories} categoriesLoading={categoriesLoading}  />
      <PopularItems />
      <Sliders categories={categories} categoriesLoading={categoriesLoading} />
      <DownLoadApp />
    </>
  );
}
