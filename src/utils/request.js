import axios from "axios";

const request = axios.create({
  baseUrl: "http://localhost:5000",
});

export default request;
