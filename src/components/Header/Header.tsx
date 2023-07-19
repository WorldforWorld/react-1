import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
export type MapPropsType = {
  isAuth: boolean;
  login: string | null;
};
export type DispatchPropsType = {
  logout: () => void;
};
const Header: React.FC<MapPropsType & DispatchPropsType> = props => {
  return (
    <header className={s.header}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/3/33/Vanamo_Logo.png"
        alt="logo"
      />
      <div className={s.loginBlock}>
        {props.isAuth ? (
          <div>
            {props.login} - <button onClick={props.logout}>Log out</button>
          </div>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </header>
  );
};
export default Header;
