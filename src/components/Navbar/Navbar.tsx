import { NavLink } from "react-router-dom";
import s from "./Navbar.module.css";
const Navbar: React.FC = () => {
  return (
    <nav className={s.nav}>
      <div className={s.item}>
        <NavLink activeClassName={s.activeLink} to="/profile">
          Profile
        </NavLink>
      </div>
      <div className={`${s.item} ${s.active}`}>
        <NavLink activeClassName={s.activeLink} to="/dialogs">
          Messages
        </NavLink>
      </div>
      <div className={`${s.item} ${s.active}`}>
        <NavLink activeClassName={s.activeLink} to="/users">
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
