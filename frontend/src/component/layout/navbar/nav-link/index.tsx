import { memo } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "../../../interfaces/nav-links";

const NavLinkItem: React.FC<
  NavLink & {
    setActiveNav: (url: string) => void;
    isMobile: boolean;
    toggleMenu: () => void;
    activeNav: string;
  }
> = memo(({ text, url, setActiveNav, isMobile, toggleMenu, activeNav }) => (
  <li>
    <Link
      to={url}
      className={`block px-4 py-2 hover:text-secondary ${activeNav === url ? "text-secondary font-bold" : ""}`}
      onClick={() => {
        setActiveNav(url);
        if (isMobile) toggleMenu();
      }}
    >
      {text}
    </Link>
  </li>
));

export default NavLinkItem;
