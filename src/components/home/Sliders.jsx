import Department from "./Department";

function Sliders({ categories }) {
  return (
    <section className="sliders">
      {categories &&
        categories?.data?.map((category) => (
          <Department
            key={category.id}
            index={category.id}
            category={category}
          />
        ))}
    </section>
  );
}

export default Sliders;
