import Department from "./Department";

function Sliders({ categories, categoriesLoading }) {
  return (
    <section className="sliders">
      {categories &&
        categories?.data?.map((category) => (
          <Department
            key={category.id}
            index={category.id}
            category={category}
            categoriesLoading={categoriesLoading}
          />
        ))}
    </section>
  );
}

export default Sliders;
