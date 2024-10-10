import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function CheckBoxGenerator({
  filter,
  setDynamicFilterData,
  dynamicFilterData,
  showTitle = false,
}) {
  const [searchParams] = useSearchParams();
  const isChecked =
    searchParams.get(filter?.id) &&
    Number(searchParams.get("sub_category_id")) ===
      Number(filter?.sub_category_id)
      ? true
      : false;

  useEffect(() => {
    if (isChecked)
      setDynamicFilterData((prevState) => ({
        ...prevState,
        [filter?.id]: true,
      }));
  }, []);

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
          checked={dynamicFilterData[filter?.id] || false}
          onChange={(e) => {
            if (e.target.checked) {
              setDynamicFilterData((prevState) => ({
                ...prevState,
                [filter?.id]: e.target.checked,
              }));
            } else {
              setDynamicFilterData((prevState) => ({
                ...prevState,
                [filter?.id]: false,
              }));
            }
          }}
        />
        <label htmlFor={filter?.id} style={{ fontSize: "16px" }}>
          {filter?.name}
        </label>
      </div>
    </div>
  );
}

export default CheckBoxGenerator;
