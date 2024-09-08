export const calculateDate = (createdAt) => {
  const createdDate = new Date(createdAt);
  const dd = String(createdDate.getDate()).padStart(2, "0");
  const mm = String(createdDate.getMonth() + 1).padStart(2, "0");
  const yyyy = createdDate.getFullYear();
  return `${dd} / ${mm} / ${yyyy}`;
};

export const handleChange = (e, setFormData) => {
  setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};

export const handleApplyFilters = (setSearchParams, searchFilterData) => {
  if (!searchFilterData) return;

  const newParams = new URLSearchParams();

  for (const [key, value] of Object.entries(searchFilterData)) {
    if (value !== undefined && value !== null && value !== "") {
      if (Array.isArray(value) && value.length > 0) {
        newParams.set(key, value.join("-"));
      } else if (!Array.isArray(value)) {
        newParams.set(key, value);
      }
    }
  }

  setSearchParams(newParams);
};
