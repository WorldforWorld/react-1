import { Navigate } from "react-router-dom";
import AddMessageForm from "./AddMessageForm/AddMessageForm";
import DialogItem from "./DialogItem/DialogItem";
import s from "./Dialogs.module.css";
import Message from "./Message/Dialogs";

const Dialogs = props => {
  const state = props.dialogsPage;

  const dialogsElements = state.dialogs.map(d => (
    <DialogItem name={d.name} id={d.id} key={d.id} />
  ));

  const messagesElements = state.messages.map(m => (
    <Message message={m.message} key={m.id} />
  ));

  const addNewMessage = values => {
    props.sendMessage(values.newMessageBody);
  };
  if (!props.isAuth) return <Navigate to={"/login"} />;
  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
        <div>
          <AddMessageForm onSubmit={addNewMessage} />
        </div>
      </div>
    </div>
  );
};
export default Dialogs;
