import { Form } from "react-bootstrap";

function CheckBoxContainer({
  item,
  categoriesValue,
  sub_categoriesValue,
  onChange,
  viewSubCategories = true,
}) {
  const hasSubcategories =
    item?.sub_categories && item?.sub_categories?.length > 0;

  const isChildChecked = item?.sub_categories?.some(
    (sub_category) => Number(sub_category?.id) === Number(sub_categoriesValue)
  );

  return (
    <li className="department-item">
      <div className="department-header">
        <label htmlFor={item.id} className="w-100">
          {hasSubcategories && viewSubCategories && (
            <button
              className={`accordion-button ${
                isChildChecked ? "" : "collapsed"
              }`}
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
          <Form.Check
            key={item.id}
            type="radio"
            name="category_id"
            value={item.id}
            checked={+categoriesValue === +item.id}
            // style={{border}}
            onChange={(e) => onChange(e)}
            label={item.name}
            style={{ flex: "1 0" }}
          />
        </label>
      </div>
      {item?.sub_categories && viewSubCategories && (
        <div
          id={`accordion-${item.id}`}
          className={`accordion-collapse collapse ${
            isChildChecked ? "show" : ""
          }`}
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            {item.sub_categories.map((sub_category) => (
              <Form.Check
                key={sub_category.id}
                type="radio"
                name="sub_category_id"
                value={sub_category.id}
                checked={+sub_categoriesValue === +sub_category.id}
                // style={{border}}
                onChange={(e) => onChange(e)}
                label={sub_category.name}
                style={{ flex: "1 0" }}
              />
            ))}
          </div>
        </div>
      )}
    </li>
  );
}

export default CheckBoxContainer;
