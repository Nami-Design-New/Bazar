import { useTranslation } from "react-i18next";
import SelectField from "../form-elements/SelectField";
import SelectGenerator from "./SelectGenerator";

function SubSelectGenerator({
  filter,
  dynamicFilterData,
  setDynamicFilterData,
}) {
  const { t } = useTranslation();

  return dynamicFilterData?.[filter?.parent_id] ? (
    <>
      <div className="departments w-100">
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

      {filter?.values && filter?.values?.length > 0
        ? filter?.values?.map((value) =>
            dynamicFilterData?.[value?.parent_id] ? (
              <SelectGenerator
                filter={value}
                key={value?.id}
                dynamicFilterData={dynamicFilterData}
                setDynamicFilterData={setDynamicFilterData}
              />
            ) : null
          )
        : null}
    </>
  ) : null;
}

export default SubSelectGenerator;
