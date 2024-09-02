import { NavLink } from "../../interfaces/nav-links";
import { UserInfo } from "../../interfaces/user";

export const getNavLinks = (
  isLoggedIn: boolean,
  userInfo?: UserInfo,
): NavLink[] => {
  const defaultLinks: NavLink[] = [
    { text: "Library", url: "/" },
    { text: "Browse Books", url: "/books" },
  ];

  const loggedInLinks: NavLink[] = [
    ...defaultLinks,
    { text: "My Borrowed Books", url: "/my-borrowed-books" },
    { text: "Return Books", url: "/return-books" },
    { text: "Admin Dashboard", url: "/admin/dashboard" },
  ];

  if (userInfo) {
    loggedInLinks.push({ text: `Welcome, ${userInfo.name}`, url: "/profile" });
  }

  return isLoggedIn ? loggedInLinks : defaultLinks;
};
