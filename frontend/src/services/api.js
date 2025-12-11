import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});
const request = async (method, url, data = null) => {
  console.log({ method, url, data });
  try {
    const res = await api({ method, url, data });
    return { data: res.data, error: null };
  } catch (error) {
    console.log("Server Error");
    console.log(error);

    let errorMessage = "Something went wrong";

    if (error.code === "ERR_NETWORK") {
      errorMessage = "Network Error: Please check your internet connection and try again.";
    } else if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      errorMessage = error.response.data?.message || "Server Error";
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = "No response received from server.";
    } else {
      // Something happened in setting up the request that triggered an Error
      errorMessage = error.message;
    }

    return { data: null, error: { ...error, message: errorMessage } };
  }
};

export const addCfhApi = (
  userId,
  totalEmission,
  categoryEmission,
  categoryBreakdown,
  categoryTips
) =>
  request("POST", "/cfh/add", {
    userId,
    totalEmission,
    categoryEmission,
    categoryBreakdown,
    categoryTips,
  });

export const cfhListApi = (userId) => request("GET", "/cfh/all/" + userId,);
export const recentCfhApi = (userId) => request("GET", "/cfh/recent/" + userId,);

export const signUpApi = (email, name, password) =>
  request("POST", "/auth/signup", { email, name, password });

export const loginApi = (email, password) =>
  request("POST", "/auth/login", { email, password });

export const aiTipApi = (
  totalEmission,
  categoryEmission,
  categoryBreakdown,
  categoryTips,
  cfhId
) =>
  request("POST", "/ai/tip/" + cfhId, {
    totalEmission,
    categoryEmission,
    categoryBreakdown,
    categoryTips,
  });
