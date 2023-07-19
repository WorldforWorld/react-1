import { Field, InjectedFormProps, reduxForm } from "redux-form";
import {
  maxLenthCreator,
  required,
} from "../../../utils/validators/validators";
import { Textarea, createField } from "../../common/FomsControls/FormsControls";
import { NewMessageFormType } from "../Dialogs";
const maxLength50 = maxLenthCreator(50);

type NewMessageFormValuesTypeKeys = Extract<keyof NewMessageFormType, string>;
type PropsType = {};
const AddMessageForm: React.FC<
  InjectedFormProps<NewMessageFormType, PropsType> & PropsType
> = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {createField<NewMessageFormValuesTypeKeys>(
          "Enter your message",
          "newMessageBody",
          [required, maxLength50],
          Textarea
        )}
        <Field
          component={Textarea}
          validate={[required, maxLength50]}
          name="newMessageBody"
          placeholder="Enter your message"
        />
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  );
};
export default reduxForm<NewMessageFormType>({
  form: "dialog-add-message-form",
})(AddMessageForm);
