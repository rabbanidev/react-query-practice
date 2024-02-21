import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // server error
    if (error.response) {
      error.message = `Server Error: Status: ${error.response.status} - Message: ${error.response.statusText}`;
    }

    return Promise.reject(error);
  }
);

export default api;
