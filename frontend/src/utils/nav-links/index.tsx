import { NavLink } from "../../interfaces/nav-links";
import { UserInfo } from "../../interfaces/user";

export const getNavLinks = (
  isLoggedIn: boolean,
  userInfo?: UserInfo,
): NavLink[] => {
  const defaultLinks: NavLink[] = [];

  const loggedInLinks: NavLink[] = [
    ...defaultLinks,
    { text: "Library", url: "/library" },
    { text: "My Borrowed Books", url: "/my-borrowed-books" },
    { text: "History", url: "/history" },
  ];

  const adminLinks: NavLink[] = [
    { text: "Inventory", url: "/inventory" },
    { text: "Add Book", url: "/add-book" },
  ];

  if (userInfo && userInfo.role == "admin") {
    loggedInLinks.push(...adminLinks);
  }

  return isLoggedIn ? loggedInLinks : defaultLinks;
};
