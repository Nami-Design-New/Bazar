import Department from "./Department";

function Sliders({ categories }) {
  return (
    <section className="sliders">
      {categories &&
        categories?.data?.map(
          (category) =>
            category?.sub_categories &&
            category?.sub_categories?.length > 0 && (
              <Department
                key={category.id}
                index={category.id}
                sub_categories={category?.sub_categories}
              />
            )
        )}
    </section>
  );
}

export default Sliders;
