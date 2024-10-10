function AdCheckBoxGenerator({
  filter,
  setDynamicFilterData,
  dynamicFilterData,
  showTitle = false,
}) {
  return (
    <div className="d-flex flex-column my-2 gap-2">
      {showTitle && !filter?.filter_name && (
        <h6>{filter?.filter_name || filter?.name}</h6>
      )}
      <div className="w-100 d-flex align-items-center gap-2">
        <input
          required={filter?.required}
          type="checkbox"
          name={filter?.id}
          id={filter?.id}
          className=" checkBox"
          checked={dynamicFilterData[filter?.id] ? true : false}
          onChange={(e) => {
            setDynamicFilterData((prevState) => ({
              ...prevState,
              [filter?.id]: e.target.checked ? 1 : 0,
            }));
          }}
        />
        <label htmlFor={filter?.id} style={{ fontSize: "16px" }}>
          {filter?.name}
        </label>
      </div>
    </div>
  );
}

export default AdCheckBoxGenerator;
