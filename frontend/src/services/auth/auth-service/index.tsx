import axios from "axios";
import { UserInfo } from "../../../interfaces/user";
import axiosInstance from "../../../utils/axios-interceptor";
import { showSuccessToast, showErrorToast } from "../../toast";

interface LoginResponse {
  user: UserInfo;
  accessToken: string;
  refreshToken: string;
}

export const register = async (
  name: string,
  email: string,
  password: string,
): Promise<void> => {
  try {
    await axiosInstance.post("/auth/register", {
      name,
      email,
      password,
    });
    showSuccessToast(
      "Registration Successful",
      "User registered successfully.",
    );
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      showErrorToast(
        "Registration Failed",
        error.response.data.error || "Registration failed",
      );
      throw new Error(error.response.data.error || "Registration failed");
    } else {
      showErrorToast(
        "Registration Failed",
        "Registration failed due to an unknown error",
      );
      throw new Error("Registration failed due to an unknown error");
    }
  }
};

export const login = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post(
      "/auth/login",
      {
        email,
        password,
      },
      { withCredentials: true },
    );
    showSuccessToast("Login Successful", "You have logged in successfully.");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      showErrorToast(
        "Login Failed",
        error.response.data.error || "Login failed",
      );
      throw new Error(error.response.data.error || "Login failed");
    } else {
      showErrorToast("Login Failed", "Login failed due to an unknown error");
      throw new Error("Login failed due to an unknown error");
    }
  }
};

export const fetchUserFromToken = async (): Promise<UserInfo> => {
  try {
    const response = await axiosInstance.post("/auth/fetchUserFromToken", {});

    return response.data.user;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      showErrorToast(
        "Fetch User Failed",
        error.response.data.error || "Failed to fetch user information",
      );
      throw new Error(
        error.response.data.error || "Failed to fetch user information",
      );
    } else {
      showErrorToast(
        "Fetch User Failed",
        "Failed to fetch user information due to an unknown error",
      );
      throw new Error(
        "Failed to fetch user information due to an unknown error",
      );
    }
  }
};

export const userLogout = async (): Promise<void> => {
  try {
    await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
    showSuccessToast("Logout Successful", "You have been logged out.");
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      showErrorToast(
        "Logout Failed",
        error.response.data.error || "Logout failed",
      );
      throw new Error(error.response.data.error || "Logout failed");
    } else {
      showErrorToast("Logout Failed", "Logout failed due to an unknown error");
      throw new Error("Logout failed due to an unknown error");
    }
  }
};
