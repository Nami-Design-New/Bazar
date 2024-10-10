import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function RangeSlider({
  min,
  max,
  value,
  handleSlide,
  minType,
  maxType,
  steps,
}) {
  const marks = {
    [value[0]]: `${value[0]} ${minType}`,
    [value[1]]: `${value[1]} ${maxType}`,
  };

  return (
    <Slider
      range
      min={min}
      max={max}
      marks={marks}
      allowCross={false}
      value={value}
      reverse
      step={steps}
      onChange={(e) => {
        handleSlide(e);
      }}
      trackStyle={[{ backgroundColor: "#4381f8", opacity: 1 }]}
      railStyle={{ backgroundColor: "#d3d3d3" }}
      handleStyle={[
        {
          borderColor: "#4381f8",
          backgroundColor: "#4381f8",
          opacity: 1,
          boxShadow: "none",
        },
        {
          borderColor: "#4381f8",
          backgroundColor: "#4381f8",
          opacity: 1,
          boxShadow: "none",
        },
      ]}
    />
  );
}

export default RangeSlider;
