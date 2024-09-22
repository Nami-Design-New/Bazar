import CheckBoxGenerator from "./CheckBoxGenerator";
import RangeGenerator from "./RangeGenerator";

function FiltersGenerator({
  filters,
  setDynamicFilterData,
  dynamicFilterData,
}) {
  console.log(filters?.data);

  return filters?.data && filters?.data?.length > 0
    ? filters?.data?.map((filter) => {
        if (filter?.type === "number") {
          return (
            <RangeGenerator
              key={filter?.id}
              filter={filter}
              setDynamicFilterData={setDynamicFilterData}
            />
          );
        } else if (filter?.type === "string") {
          return null;
        } else if (filter?.type === "select") {
          return (
            // <SelectGenerator
            //   key={filter?.id}
            //   filter={filter}
            //   setDynamicFilterData={setDynamicFilterData}
            //   dynamicFilterData={dynamicFilterData}
            // />
            null
          );
        } else if (filter?.type === "boolean") {
          return (
            <CheckBoxGenerator
              key={filter?.id}
              filter={filter}
              setDynamicFilterData={setDynamicFilterData}
              dynamicFilterData={dynamicFilterData}
            />
          );
        }
      })
    : null;
}

export default FiltersGenerator;
