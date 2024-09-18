import { useEffect, useState } from "react";
import { handleChange } from "../../utils/helpers";
import SelectField from "./../../ui/form-elements/SelectField";
import DataLoader from "./../../ui/DataLoader";
import useGetCities from "../../hooks/settings/useGetCities";
import useGetAreas from "../../hooks/settings/useGetAreas";
import MapWithMarker from "../../ui/MapWithMarker";

function Location({ formData, setFormData, setForm }) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const { data: cities } = useGetCities();
  const { data: areas } = useGetAreas(
    formData?.city_id,
    formData?.city_id ? true : false
  );

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD_N1k4WKCdiZqCIjjgO0aaKz1Y19JqYqw&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => setMapLoaded(true);
        document.head.appendChild(script);
      } else {
        setMapLoaded(true);
      }
    };

    loadGoogleMapsScript();

    return () => {
      if (window.google) {
        document.head.removeChild(
          document.querySelector(`script[src*="googleapis"]`)
        );
      }
    };
  }, []);

  return (
    <div className="row w-100">
      <div className="col-lg-6 col-12 p-2">
        <SelectField
          required
          label="المدينة"
          name="city_id"
          id="city_id"
          value={formData?.city_id}
          onChange={(e) => handleChange(e, setFormData)}
          disabledOption={"اختر المدينة"}
          options={cities?.data?.map((city) => {
            return { name: city.name, value: city.id };
          })}
        />
      </div>
      <div className="col-lg-6 col-12 p-2">
        <SelectField
          required
          label="المنطقة"
          name="area_id"
          id="area_id"
          value={formData?.area_id}
          onChange={(e) => handleChange(e, setFormData)}
          disabledOption={"اختر المنطقة"}
          options={areas?.data?.map((area) => {
            return { name: area.name, value: area.id };
          })}
        />
      </div>
      <div className="col-12 p-2">
        {mapLoaded ? (
          <div className="input-field">
            <label htmlFor="address">
              العنوان على الخريطه{" "}
              <span>
                ( قم بتحريك المؤشر على الخريطة لتحديد موقعك بالتفصيل )
              </span>
            </label>
            <MapWithMarker formData={formData} setFormData={setFormData} />
          </div>
        ) : (
          <DataLoader />
        )}
      </div>
      <div className="col-12 p-2">
        <div className="btns">
          <button
            className="wizard_btn prev"
            onClick={(e) => {
              e.preventDefault();
              setForm("main-info");
            }}
          >
            <i className="fa-regular fa-angle-right"></i> السابق
          </button>
          <button
            className="wizard_btn next"
            onClick={(e) => {
              e.preventDefault();
              setForm("gallery");
            }}
          >
            التالى <i className="fa-regular fa-angle-left"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Location;
