import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import { UserInfo } from "../interfaces/user";
import {
  fetchUserFromToken,
  refreshToken,
  userLogout,
} from "../services/auth/auth-service";
import axios from "axios";
import API_URL from "../config/config";

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserInfo | null;
  login: (user: UserInfo, accessToken: string) => void;
  logout: () => void;
  accessToken: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [logoutInProgress, setLogoutInProgress] = useState<boolean>(false);

  const login = useCallback((user: UserInfo, accessToken: string) => {
    setUser(user);
    setAccessToken(accessToken);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(async () => {
    if (logoutInProgress) return;
    setLogoutInProgress(true);
    setUser(null);
    setAccessToken(null);
    setIsAuthenticated(false);
    try {
      await userLogout();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setLogoutInProgress(false);
    }
  }, [logoutInProgress]);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedAccessToken = accessToken;

      if (storedAccessToken) {
        console.log("trying to fetch data");
        try {
          const userInfo = await fetchUserFromToken(storedAccessToken);
          login(userInfo, storedAccessToken);
        } catch (error) {
          console.log("Failed to fetch user info", error);

          try {
            const { accessToken: newAccessToken } =
              await refreshToken(storedAccessToken);
            const userInfo = await fetchUserFromToken(newAccessToken);
            login(userInfo, newAccessToken);
          } catch (refreshError) {
            await logout();
            return Promise.reject(refreshError);
          }
        }
      }
    };

    initializeAuth();
  }, []);

  useLayoutEffect(() => {
    const axiosInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 && !error.config.__isRetryRequest) {
          if (logoutInProgress) return Promise.reject(error);

          try {
            const { data } = await axios.post(
              `${API_URL}auth/refresh-token`,
              {},
              { withCredentials: true },
            );
            setAccessToken(data.accessToken);
            error.config.headers["Authorization"] =
              `Bearer ${data.accessToken}`;
            return axios(error.config);
          } catch (refreshError) {
            await logout();
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axios.interceptors.response.eject(axiosInterceptor);
    };
  }, [logout, logoutInProgress]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
