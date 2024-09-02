import Categories from "../features/home/Categories";
import HeroSection from "../features/home/HeroSection";
import PopularItems from "../features/home/PopularItems";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Categories />
      <PopularItems />
    </>
  );
}
