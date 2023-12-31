import { NavLink } from "react-router-dom";
import s from "../Dialogs.module.css";
type PropsType = {
  id: number;
  name: string;
};
const DialogItem: React.FC<PropsType> = props => {
  return (
    <div className={s.dialog + " " + s.active}>
      <NavLink to={`/dialog/${props.id}`}>{props.name}</NavLink>
    </div>
  );
};

export default DialogItem;
