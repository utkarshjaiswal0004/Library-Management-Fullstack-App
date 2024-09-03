import React, {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { UserInfo } from "../../interfaces/user";
import {
  fetchUserFromToken,
  userLogout,
} from "../../services/auth/auth-service";

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserInfo | null;
  login: (user: UserInfo, accessToken: string) => void;
  logout: () => void;
  updateUserBorrowedBooks: (bookId: string, isBookReturn: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<{
    isAuthenticated: boolean;
    user: UserInfo | null;
  }>({
    isAuthenticated: false,
    user: null,
  });

  const [logoutInProgress, setLogoutInProgress] = useState<boolean>(false);

  const login = useCallback((userData: UserInfo, accessToken: string) => {
    setAuthState({
      user: userData,
      isAuthenticated: true,
    });
    localStorage.setItem("accessToken", accessToken);
  }, []);

  const logout = useCallback(async () => {
    if (logoutInProgress) return;
    setLogoutInProgress(true);
    setAuthState({
      user: null,
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

  //  function to reduce the api call and directly adding or removing the bookId from the borrowed book
  const updateUserBorrowedBooks = useCallback(
    (bookId: string, isBookReturn: boolean) => {
      setAuthState((prevState) => {
        if (!prevState.user) {
          return prevState;
        }

        const updatedUser = { ...prevState.user } as UserInfo;

        if (!updatedUser.borrowedBooks) {
          updatedUser.borrowedBooks = [];
        }

        if (isBookReturn) {
          // Return book logic
          updatedUser.borrowedBooks = updatedUser.borrowedBooks.filter(
            (id) => id !== bookId,
          );
        } else {
          // Borrow book logic
          if (updatedUser.borrowedBooks.length < 2) {
            updatedUser.borrowedBooks.push(bookId);
          }
        }

        return {
          ...prevState,
          user: updatedUser,
        };
      });
    },
    [],
  );

  useEffect(() => {
    const initializeAuth = async () => {
      const storedAccessToken = localStorage.getItem("accessToken");
      if (storedAccessToken && !authState.isAuthenticated) {
        try {
          const userInfo = await fetchUserFromToken();
          login(userInfo, storedAccessToken);
        } catch (error) {
          await logout();
          return Promise.reject(error);
        }
      }
    };
    initializeAuth();
  }, [authState.isAuthenticated, login, logout]);

  const authContextValue = useMemo(
    () => ({
      isAuthenticated: authState.isAuthenticated,
      user: authState.user,
      login,
      logout,
      updateUserBorrowedBooks,
    }),
    [authState, login, logout, updateUserBorrowedBooks],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
