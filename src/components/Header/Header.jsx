import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";
const Header = props => {
  return (
    <header className={classes.header}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/3/33/Vanamo_Logo.png"
        alt="logo"
      />
      <div className={classes.loginBlock}>
        {props.isAuth ? props.login : <NavLink to="/login">Login</NavLink>}
      </div>
    </header>
  );
};
export default Header;
