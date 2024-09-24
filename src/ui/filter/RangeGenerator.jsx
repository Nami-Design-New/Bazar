import RangeSlider from "../form-elements/RangeSlider";

function RangeGenerator({ filter, setDynamicFilterData }) {
  const handleSliderChange = (filterKey, value) => {
    setDynamicFilterData((prevState) => ({
      ...prevState,
      [filterKey]: {
        min: value[0],
        max: value[1]
      }
    }));
  };

  return Number(filter?.range?.min) && Number(filter?.range?.max) ? (
    <div className="w-100 mb-3 p-2">
      <h6 className="mb-2">{filter?.name}</h6>
      <RangeSlider
        min={Number(filter?.range?.min)}
        steps={1}
        max={Number(filter?.range?.max)}
        value={[Number(filter?.range?.min), Number(filter?.range?.max)]}
        handleSlide={(value) => handleSliderChange(filter?.id, value)}
        minType={""}
        maxType={""}
      />
    </div>
  ) : null;
}

export default RangeGenerator;
