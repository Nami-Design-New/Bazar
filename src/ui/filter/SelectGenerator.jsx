function SelectGenerator({
  filter,
  dynamicFilterData,
  setDynamicFilterData,
  nested,
}) {
  const handleChange = (e) => {
    const { name, checked, value } = e.target;

    const filterValue = Number(value);
    setDynamicFilterData((prevState) => {
      const updatedState = { ...prevState };

      const updateList = (list = [], value, add) => {
        return add ? [...list, value] : list.filter((id) => id !== value);
      };

      updatedState[name] = updateList(prevState[name], filterValue, checked);

      return updatedState;
    });
  };

  const hasSubcategories =
    filter?.sub_categories && filter?.sub_categories?.length > 0;

  const isParentChecked = hasSubcategories
    ? filter?.sub_categories?.every((sub_category) =>
        dynamicFilterData[filter?.id]?.includes(+sub_category.id)
      )
    : dynamicFilterData[filter?.id]?.includes(+filter.id);

  const handleParentCheckboxChange = (e) => {
    const { checked } = e.target;
    if (hasSubcategories) {
      filter?.values?.forEach((value) => {
        handleChange({
          target: {
            name: "sub_category_id",
            value: value?.id,
            checked,
          },
        });
      });

      handleChange({
        target: {
          name: "category_id",
          value: filter.id,
          checked,
        },
      });
    } else {
      handleChange({
        target: {
          name: "category_id",
          value: filter.id,
          checked,
        },
      });
    }
  };

  return (
    <div className="departments w-100">
      {!nested && <h6>{filter?.name}</h6>}
      {filter?.values && filter?.values?.length > 0 ? (
        <ul className="deps">
          {filter?.values?.map((value) => (
            <li className="mb-4 department-filter" key={value?.id}>
              <div className="department-header">
                <label htmlFor={value?.id}>
                  {value?.values && value?.values?.length > 0 ? (
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#accordion-${value?.id}`}
                      aria-expanded="true"
                      aria-controls={`#accordion-${value?.id}`}
                    >
                      <span className="horizontal"></span>
                      <span className="vertical"></span>
                    </button>
                  ) : null}
                  {value?.name}
                </label>
                <input
                  className="checkBox"
                  type="checkbox"
                  name={filter?.id}
                  value={value.id}
                  id={value.id}
                  checked={isParentChecked}
                  onChange={handleParentCheckboxChange}
                />
              </div>
              {value?.values && value?.values?.length > 0 ? (
                <SelectGenerator
                  filter={value}
                  dynamicFilterData={dynamicFilterData}
                  setDynamicFilterData={setDynamicFilterData}
                  nested={true}
                />
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default SelectGenerator;
