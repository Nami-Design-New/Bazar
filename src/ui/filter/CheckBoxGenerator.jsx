function CheckBoxGenerator({
  filter,
  setDynamicFilterData,
  dynamicFilterData,
}) {
  return (
    <div className="w-100 mb-4 d-flex align-items-center gap-2">
      <input
        type="checkbox"
        name={filter?.id}
        id={filter?.id}
        className=" checkBox"
        checked={dynamicFilterData[filter?.id] || false}
        onChange={(e) =>
          setDynamicFilterData((prevState) => ({
            ...prevState,
            [filter?.id]: e.target.checked,
          }))
        }
      />
      <label htmlFor={filter?.id} style={{ fontSize: "16px" }}>
        {filter?.name}
      </label>
    </div>
  );
}

export default CheckBoxGenerator;
