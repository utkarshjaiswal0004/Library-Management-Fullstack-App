import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import API_URL from "../../config/config";
import { showErrorToast, showSuccessToast } from "../../services/toast";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshToken = async (): Promise<string> => {
  try {
    const response = await axios.post(
      `${API_URL}auth/refresh-token`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
        },
      },
    );

    const { accessToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    showSuccessToast("Success", "Token refreshed successfully");
    return accessToken;
  } catch (error) {
    showErrorToast("Error", "Failed to refresh token. Please log in again.");
    throw error;
  }
};

axiosInstance.interceptors.request.use(
  (config: CustomAxiosRequestConfig): CustomAxiosRequestConfig => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    showErrorToast(
      "Request Error",
      "An error occurred while sending the request.",
    );
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const status = error.response?.status;

    if (status === 401 && !error.config?._retry) {
      (error.config as CustomAxiosRequestConfig)._retry = true;

      try {
        const newAccessToken = await refreshToken();
        (error.config as CustomAxiosRequestConfig).headers.Authorization =
          `Bearer ${newAccessToken}`;
        return axiosInstance.request(error?.config);
      } catch (refreshError) {
        showErrorToast("Unauthorized", "Please log in again.");
        return Promise.reject(refreshError);
      }
    } else if (status === 404) {
      showErrorToast("Not Found", "Requested resource not found.");
    } else {
      showErrorToast("Error", error.message || "An unexpected error occurred.");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
