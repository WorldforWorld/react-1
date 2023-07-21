import { InjectedFormProps, reduxForm } from "redux-form";
import { required } from "../../../../utils/validators/validators";
import {
  GetStringKeys,
  Textarea,
  createField,
} from "../../../common/FomsControls/FormsControls";

type PropsType = {};

export type AddPostFormValuesType = {
  newPostText: string;
};

type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>;

let AddNewPostForm: React.FC<
  InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType
> = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {createField<AddPostFormValuesTypeKeys>(
          "Post message",
          "newPostText",
          [required],
          Textarea
        )}
      </div>
      <div>
        <button>Add Post</button>
      </div>
    </form>
  );
};
export default reduxForm<AddPostFormValuesType, PropsType>({
  form: "profile-add-post",
})(AddNewPostForm);
