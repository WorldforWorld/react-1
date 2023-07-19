import { Navigate } from "react-router-dom";
import { initialStateType } from "../../redux/dialogs-reducer";
import AddMessageForm from "./AddMessageForm/AddMessageForm";
import DialogItem from "./DialogItem/DialogItem";
import s from "./Dialogs.module.css";
import Message from "./Message/Dialogs";
type OwnPropsType = {
  dialogsPage: initialStateType;
  sendMessage: (messageTExt: string) => void;
};

export type NewMessageFormType = {
  newMessageBody: string;
};

const Dialogs: React.FC<OwnPropsType> = props => {
  const state = props.dialogsPage;

  const dialogsElements = state.dialogs.map(d => (
    <DialogItem name={d.name} id={d.id} key={d.id} />
  ));

  const messagesElements = state.messages.map(m => (
    <Message message={m.message} key={m.id} />
  ));

  const addNewMessage = (values: NewMessageFormType) => {
    props.sendMessage(values.newMessageBody);
  };
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
