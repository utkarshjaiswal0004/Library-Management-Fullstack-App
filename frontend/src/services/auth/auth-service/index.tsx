import axios from "axios";
import API_URL from "../../../config/config";
import { UserInfo } from "../../../interfaces/user";

interface LoginResponse {
  user: UserInfo;
  accessToken: string;
  refreshToken: string;
}

export const register = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const response = await axios.post(`${API_URL}auth/register`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Registration failed");
    } else {
      throw new Error("Registration failed due to an unknown error");
    }
  }
};

export const login = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${API_URL}auth/login`, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Login failed");
    } else {
      throw new Error("Login failed due to an unknown error");
    }
  }
};

export const fetchUserFromToken = async (
  accessToken: string,
): Promise<UserInfo> => {
  try {
    console.log("fetchUserFromToken called");
    const response = await axios.post(`${API_URL}auth/fetchUserFromToken`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || "Failed to fetch user information",
      );
    } else {
      throw new Error(
        "Failed to fetch user information due to an unknown error",
      );
    }
  }
};

export const refreshToken = async (refreshToken: string) => {
  try {
    const response = await axios.post(`${API_URL}auth/refresh-token`, {
      refreshToken,
    });
    return response.data; // { accessToken }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Token refresh failed");
    } else {
      throw new Error("Token refresh failed due to an unknown error");
    }
  }
};
