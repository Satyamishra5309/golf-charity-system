import axios from "axios";

const API = axios.create({
baseURL: "http://localhost:5123/api",
});

export default API;
