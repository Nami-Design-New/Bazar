import { useTranslation } from "react-i18next";
import SelectField from "../../ui/form-elements/SelectField";
import AdSelectGenerator from "./AdSelectGenerator";

function AdSubSelectGenerator({
  filter,
  dynamicFilterData,
  setDynamicFilterData,
}) {
  const { t } = useTranslation();

  return dynamicFilterData?.[filter?.parent_id] ? (
    <>
      <div className="departments col-6 p-2 gap-2">
        {<h6>{filter?.filter_name}</h6>}
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
              <AdSelectGenerator
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

export default AdSubSelectGenerator;
