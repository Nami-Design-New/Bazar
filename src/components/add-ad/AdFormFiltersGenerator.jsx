import AdCheckBoxGenerator from "./AdCheckBoxGenerator";
import AdRangeGenerator from "./AdRangeGenerator";
import AdSelectGenerator from "./AdSelectGenerator";

function AdFormFiltersGenerator({
  filters,
  setDynamicFilterData,
  dynamicFilterData,
}) {
  return filters?.data && filters?.data?.length > 0
    ? filters?.data?.map((filter) => {
        if (filter?.type === "number") {
          return (
            <div className="col-6 p-2" key={filter?.id}>
              <AdRangeGenerator
                key={filter?.id}
                filter={filter}
                dynamicFilterData={dynamicFilterData}
                setDynamicFilterData={setDynamicFilterData}
              />
            </div>
          );
        } else if (filter?.type === "string") {
          return null;
        } else if (filter?.type === "select") {
          return (
            <div className="col-12 p-2 d-flex flex-wrap" key={filter?.id}>
              <AdSelectGenerator
                key={filter?.id}
                filter={filter}
                setDynamicFilterData={setDynamicFilterData}
                dynamicFilterData={dynamicFilterData}
              />
            </div>
          );
        } else if (filter?.type === "boolean") {
          return (
            <div className="col-6 p-2" key={filter?.id}>
              <AdCheckBoxGenerator
                key={filter?.id}
                filter={filter}
                setDynamicFilterData={setDynamicFilterData}
                dynamicFilterData={dynamicFilterData}
                showTitle={true}
              />
            </div>
          );
        }
      })
    : null;
}

export default AdFormFiltersGenerator;
