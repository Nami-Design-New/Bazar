import { MONTHS } from "./constants";

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
    if (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      value !== false
    ) {
      if (Array.isArray(value) && value.length > 0) {
        newParams.set(key, value.join("-"));
      } else if (!Array.isArray(value)) {
        newParams.set(key, value);
      }
    }
  }

  setSearchParams(newParams);
};

export const formatMessageTime = (timestamp) => {
  const date = new Date(timestamp);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;
  const timeStr = `${hours}:${minutesStr} ${ampm}`;
  return timeStr;
};

export const getTimeDifference = (createdAt) => {
  const now = new Date();
  const createdDate = new Date(createdAt);
  let years, months, days, hours, minutes;

  if (now && createdAt) {
    years = now.getFullYear() - createdDate.getFullYear();
    months = now.getMonth() - createdDate.getMonth();
    days = now.getDate() - createdDate.getDate();
    hours = now.getHours() + 3 - createdDate.getHours();
    minutes = now.getMinutes() - createdDate.getMinutes();

    if (minutes < 0) {
      minutes += 60;
      if (hours > 0) hours--;
    }
    if (hours < 0) {
      hours += 24;
      if (days > 0) days--;
    }
    if (days < 0) {
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += lastMonth.getDate();
      if (months > 0) months--;
    }
    if (months < 0) {
      months += 12;
      if (years > 0) years--;
    }
  }

  return { years, months, days, hours, minutes };
};

export const subscriptionRemainingDays = (end_date) => {
  const today = new Date();
  const futureDate = new Date(end_date);

  const timeDifference = futureDate - today;
  const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return remainingDays;
};

export const formatTimeDifference = (
  years,
  months,
  days,
  hours,
  minutes,
  t
) => {
  let formatted = "";
  if (years > 0) {
    formatted = `${years} ${t("year")}`;
    if (months > 0) {
      formatted += ` ${t("and")} ${months} ${t("month")}`;
    }
  } else if (months > 0) {
    formatted = `${months} ${t("month")}`;
    if (days > 0) {
      formatted += ` ${t("and")} ${days} ${t("day")}`;
    }
  } else if (days > 0) {
    formatted = `${days} ${t("day")}`;
    if (hours > 0) {
      formatted += ` ${t("and")} ${hours} ${t("hour")}`;
    }
  } else if (hours > 0) {
    formatted = `${hours} ${t("hour")}`;
    if (minutes > 0) {
      formatted += ` ${t("and")} ${minutes} ${t("minute")}`;
    }
  } else {
    formatted = `${minutes} ${t("minute")}`;
  }

  return t("since") + " " + formatted || t("now");
};

export function calcDeliveryPrice(lat1, lng1, lat2, lng2, deliveryPrice) {
  const toRadians = (degrees) => (degrees * Math.PI) / 180;

  const R = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return (distance * deliveryPrice).toFixed(2);
}

export const adUserMemberShip = (date, lang) => {
  const createdAt = new Date(date);
  const month = createdAt.getMonth();
  const year = createdAt.getFullYear();

  return `${lang === "en" ? MONTHS[month].en : MONTHS[month].ar} ${year}`;
};

export const renderHTML = (htmlContent) => {
  return { __html: htmlContent };
};
