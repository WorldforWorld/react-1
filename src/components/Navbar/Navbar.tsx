import { NavLink } from "react-router-dom";
import s from "./Navbar.module.css";
const Navbar: React.FC = () => {
  return (
    <nav className={s.nav}>
      <div className={s.item}>
        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? s.active : s.item)}
        >
          Profile
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink
          to="/dialogs"
          className={({ isActive }) => (isActive ? s.active : s.item)}
        >
          Messages
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink
          to="/users"
          className={({ isActive }) => (isActive ? s.active : s.item)}
        >
          Users
        </NavLink>
      </div>
      <div className={s.item}>
        <a href="#a">News</a>
      </div>
      <div className={s.item}>
        <a href="#s">Music</a>
      </div>
      <div className={s.item}>
        <a href="#d">Settings</a>
      </div>
    </nav>
  );
};
export default Navbar;
