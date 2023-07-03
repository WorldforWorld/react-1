import { Field, reduxForm } from "redux-form";
import {
  maxLenthCreator,
  required,
} from "../../../utils/validators/validators";
import { Textarea } from "../../common/FomsControls/FormsControls";

const maxLength50 = maxLenthCreator(50);
const AddmessageForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
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
export default reduxForm({ form: "AddmessageForm" })(AddmessageForm);
