import axios from "axios";

const lang = sessionStorage.getItem("lang") || "ar";

axios.defaults.baseURL = "https://api.bazar.com.sa/api";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["lang"] = lang;

export default axios;
