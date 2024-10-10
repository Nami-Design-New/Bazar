import { useTranslation } from "react-i18next";
import SelectField from "../form-elements/SelectField";
import SubSelectGenerator from "./SubSelectGenerator";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

function SelectGenerator({ filter, dynamicFilterData, setDynamicFilterData }) {
  const { t } = useTranslation();
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
        [filter?.id]: Number(searchParams.get(filter?.id)),
      }));
  }, []);

  return filter?.values && filter?.values?.length > 0 ? (
    <>
      <div className="departments w-100  gap-2">
        {<h6>{filter?.name}</h6>}
        <SelectField
          required={filter?.required}
          name={filter?.id}
          id={filter?.id}
          value={
            dynamicFilterData?.[filter?.id]
              ? dynamicFilterData?.[filter?.id]
              : ""
          }
          onChange={(e) =>
            setDynamicFilterData({
              ...dynamicFilterData,
              [filter?.id]: e.target.value,
            })
          }
          disabledOption={t("select")}
          options={filter?.values?.map((value) => {
            return { name: value.name, value: value.id };
          })}
        />
      </div>
      {filter?.values && filter?.values?.length > 0 ? (
        <>
          {filter?.values?.map((value) => {
            return (
              <SubSelectGenerator
                key={value?.id}
                filter={value}
                setDynamicFilterData={setDynamicFilterData}
                dynamicFilterData={dynamicFilterData}
              />
            );
          })}
        </>
      ) : null}
    </>
  ) : null;
}

export default SelectGenerator;
