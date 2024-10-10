import { useEffect } from "react";
import RangeSlider from "../form-elements/RangeSlider";
import { useSearchParams } from "react-router-dom";

function RangeGenerator({ filter, dynamicFilterData, setDynamicFilterData }) {
  const [searchParams] = useSearchParams();

  const handleSliderChange = (value) => {
    setDynamicFilterData((prevState) => ({
      ...prevState,
      min: value?.[0],
      max: value?.[1],
    }));
  };

  useEffect(() => {
    setDynamicFilterData((prevState) => ({
      ...prevState,
      min: Number(searchParams?.get("min")) || Number(filter?.range?.min),
      max: Number(searchParams?.get("max")) || Number(filter?.range?.max),
    }));
  }, []);

  return (Number(filter?.range?.min) || Number(filter?.range?.min) == 0) &&
    (Number(filter?.range?.max) || Number(filter?.range?.max) == 0) ? (
    <div className="w-100 mb-3 p-2">
      <h6 className="mb-2">{filter?.name}</h6>
      <RangeSlider
        min={Number(filter?.range?.min)}
        steps={1}
        max={Number(filter?.range?.max)}
        value={[
          dynamicFilterData?.min || Number(filter?.range?.min),
          dynamicFilterData?.max || Number(filter?.range?.max),
        ]}
        handleSlide={(value) => {
          handleSliderChange(value);
        }}
        minType={""}
        maxType={""}
      />
    </div>
  ) : null;
}

export default RangeGenerator;
