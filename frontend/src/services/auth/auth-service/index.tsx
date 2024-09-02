import axios from "axios";
import API_URL from "../../../config/config";
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

export const login = async (email: string, password: string) => {
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
