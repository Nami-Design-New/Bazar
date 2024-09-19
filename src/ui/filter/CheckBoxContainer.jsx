import CheckBoxFilterItem from "./CheckBoxFilterItem";

function CheckBoxContainer({
  item,
  categoriesValue,
  sub_categoriesValue,
  onChange,
  viewSubCategories = true,
}) {
  const hasSubcategories =
    item?.sub_categories && item?.sub_categories?.length > 0;

  const isParentChecked = hasSubcategories
    ? item?.sub_categories?.every((sub_category) =>
        sub_categoriesValue?.includes(+sub_category.id)
      )
    : categoriesValue?.includes(+item.id);

  const handleParentCheckboxChange = (e) => {
    const { checked } = e.target;
    if (hasSubcategories) {
      item?.sub_categories?.forEach((sub_category) => {
        onChange({
          target: {
            name: "sub_category_id",
            value: sub_category.id,
            checked,
          },
        });
      });

      onChange({
        target: {
          name: "category_id",
          value: item.id,
          checked,
        },
      });
    } else {
      onChange({
        target: {
          name: "category_id",
          value: item.id,
          checked,
        },
      });
    }
  };

  return (
    <li className="department-item">
      <div className="department-header">
        <label htmlFor={item.id}>
          {hasSubcategories &&
            item?.sub_categories &&
            sub_categoriesValue &&
            viewSubCategories && (
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#accordion-${item.id}`}
                aria-expanded="true"
                aria-controls={`#accordion-${item.id}`}
              >
                <span className="horizontal"></span>
                <span className="vertical"></span>
              </button>
            )}
          {item.name}
        </label>
        <input
          className="checkBox"
          type="checkbox"
          name="category_id"
          value={item.id}
          id={item.id}
          checked={isParentChecked}
          onChange={handleParentCheckboxChange}
        />
      </div>
      {item?.sub_categories && sub_categoriesValue && viewSubCategories && (
        <div
          id={`accordion-${item.id}`}
          className="accordion-collapse collapse"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            {item.sub_categories.map((sub_category) => (
              <CheckBoxFilterItem
                key={sub_category.id}
                name="sub_category_id"
                sub_category={sub_category}
                onChange={onChange}
                checked={
                  sub_categoriesValue?.includes(+sub_category.id) ||
                  isParentChecked
                }
              />
            ))}
          </div>
        </div>
      )}
    </li>
  );
}

export default CheckBoxContainer;
