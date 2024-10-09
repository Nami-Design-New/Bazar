import { useState, useRef, useEffect } from "react";
import { GoogleMap, Marker, StandaloneSearchBox } from "@react-google-maps/api";
import { useTranslation } from "react-i18next";

const MapWithMarker = ({ formData, setFormData }) => {
  const [markerPosition, setMarkerPosition] = useState({});
  const { t } = useTranslation();
  const [searchInput, setSearchInput] = useState("");
  const searchBox = useRef(null);

  useEffect(() => {
    setMarkerPosition({
      lat: Number(formData.lat),
      lng: Number(formData.lng),
    });

    reverseGeocodeMarkerPosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const handleMarkerDragEnd = (coord) => {
    setMarkerPosition(coord);

    setFormData({
      ...formData,
      lat: Number(coord.lat.toFixed(6)),
      lng: Number(coord.lng.toFixed(6)),
    });

    reverseGeocodeMarkerPosition(coord);
  };

  const reverseGeocodeMarkerPosition = (position) => {
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ location: position }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          setSearchInput(results[0].formatted_address);
          setFormData((prev) => ({
            ...prev,
            address: results[0].formatted_address,
          }));
        } else {
          console.error("No results found");
        }
      } else {
        console.error("Geocoder failed due to: " + status);
      }
    });
  };

  const handlePlaceSelect = () => {
    const places = searchBox.current.getPlaces();

    if (places.length > 0) {
      const selectedPlace = places[0];
      const position = {
        lat: selectedPlace.geometry.location.lat(),
        lng: selectedPlace.geometry.location.lng(),
      };
      setMarkerPosition(position);

      setFormData({
        ...formData,
        lat: position.lat.toFixed(6),
        lng: position.lng.toFixed(6),
      });

      setSearchInput(selectedPlace.name);
      setFormData((prev) => ({ ...prev, address: selectedPlace.name }));
    }
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchInputKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <GoogleMap
      mapContainerStyle={{
        width: "100%",
        height: "400px",
        borderRadius: "12px",
      }}
      zoom={10}
      center={markerPosition}
    >
      <Marker
        icon="/images/map-pin.svg"
        position={markerPosition}
        draggable={true}
        onDragEnd={(e) => {
          handleMarkerDragEnd({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          });
        }}
      />
      <StandaloneSearchBox
        onLoad={(ref) => (searchBox.current = ref)}
        onPlacesChanged={handlePlaceSelect}
      >
        <input
          type="search"
          placeholder={t("searchMap")}
          className="mapSearchInput"
          value={searchInput}
          onChange={handleInputChange}
          onKeyDown={handleSearchInputKeyPress}
        />
      </StandaloneSearchBox>
    </GoogleMap>
  );
};

export default MapWithMarker;
