import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { UserInfo } from "../interfaces/user";
import {
  fetchUserFromToken,
  refreshToken,
} from "../services/auth/auth-service";

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserInfo | null;
  login: (user: UserInfo, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
  accessToken: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedAccessToken = localStorage.getItem("accessToken");
      const storedRefreshToken = localStorage.getItem("refreshToken");

      if (storedAccessToken && storedRefreshToken) {
        try {
          const userInfo = await fetchUserFromToken(storedAccessToken);
          setUser(userInfo);
          setAccessToken(storedAccessToken);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Failed to fetch user info", error);

          try {
            const { accessToken: newAccessToken } =
              await refreshToken(storedRefreshToken);
            const userInfo = await fetchUserFromToken(newAccessToken);
            setUser(userInfo);
            setAccessToken(newAccessToken);
            localStorage.setItem("accessToken", newAccessToken);
            setIsAuthenticated(true);
          } catch (refreshError) {
            console.error("Failed to refresh token", refreshError);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            setIsAuthenticated(false);
            setUser(null);
            setAccessToken(null);
          }
        }
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(
    (user: UserInfo, accessToken: string, refreshToken: string) => {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setUser(user);
      setAccessToken(accessToken);
      setIsAuthenticated(true);
    },
    [],
  );

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setAccessToken(null);
    setIsAuthenticated(false);
  }, []);

  const refreshAccessToken = useCallback(async () => {
    const refreshTokenFromStorage = localStorage.getItem("refreshToken");
    if (refreshTokenFromStorage) {
      try {
        const { accessToken: newAccessToken } = await refreshToken(
          refreshTokenFromStorage,
        );
        setAccessToken(newAccessToken);
        localStorage.setItem("accessToken", newAccessToken);
        return newAccessToken;
      } catch (error) {
        console.error("Failed to refresh access token", error);
        logout();
      }
    }
  }, [logout]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        refreshAccessToken,
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
