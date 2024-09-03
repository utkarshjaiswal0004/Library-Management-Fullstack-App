import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { UserInfo } from "../interfaces/user";
import {
  fetchUserFromToken,
  refreshToken,
  userLogout,
} from "../services/auth/auth-service";
import axios from "axios";
import { Book } from "../interfaces/book";

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserInfo | null;
  login: (user: UserInfo, accessToken: string) => void;
  logout: () => void;
  accessToken: string | null;
  libraryBooks: Book[];
  setLibraryBooks: (books: Book[]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<{
    isAuthenticated: boolean;
    user: UserInfo | null;
    accessToken: string | null;
  }>({
    isAuthenticated: false,
    user: null,
    accessToken: null,
  });

  const [libraryBooks, setLibraryBooks] = useState<Book[]>([]);
  const [logoutInProgress, setLogoutInProgress] = useState<boolean>(false);

  const login = useCallback((userData: UserInfo, accessToken: string) => {
    setAuthState({
      user: userData,
      accessToken: accessToken,
      isAuthenticated: true,
    });
    localStorage.setItem("accessToken", accessToken);
  }, []);

  const logout = useCallback(async () => {
    if (logoutInProgress) return;
    setLogoutInProgress(true);
    setAuthState({
      user: null,
      accessToken: null,
      isAuthenticated: false,
    });
    localStorage.removeItem("accessToken");
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
      const storedAccessToken = localStorage.getItem("accessToken");
      if (storedAccessToken && !authState.isAuthenticated) {
        try {
          const userInfo = await fetchUserFromToken(storedAccessToken);
          login(userInfo, storedAccessToken);
        } catch (error) {
          console.error("Failed to fetch user info", error);
          try {
            const { accessToken: newAccessToken } = await refreshToken();
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
  }, [authState.isAuthenticated, login, logout]);

  useEffect(() => {
    const axiosInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 && !error.config.__isRetryRequest) {
          if (logoutInProgress) return Promise.reject(error);
          try {
            const { data } = await refreshToken();
            setAuthState((prevState) => ({
              ...prevState,
              accessToken: data.accessToken,
            }));
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

  const authContextValue = useMemo(
    () => ({
      isAuthenticated: authState.isAuthenticated,
      user: authState.user,
      login,
      logout,
      accessToken: authState.accessToken,
      libraryBooks,
      setLibraryBooks,
    }),
    [authState, login, logout, libraryBooks],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
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
