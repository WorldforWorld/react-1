import { InjectedFormProps, reduxForm } from "redux-form";
import {
  GetStringKeys,
  Input,
  Textarea,
  createField,
} from "../../common/FomsControls/FormsControls";
import s from "./ProfileInfo.module.css";
import { ProfileType } from "../../../types/types";
type PropsType = {
  profile: ProfileType;
};
type ProfileTypeKeys = GetStringKeys<ProfileType>;
const ProfileDataForm: React.FC<
  InjectedFormProps<ProfileType, PropsType> & PropsType
> = ({ handleSubmit, profile, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button>save</button>
      </div>
      {error && <div className={s.formSummaryError}>{error}</div>}
      <div>
        <b>Full name</b>:{" "}
        {createField<ProfileTypeKeys>("Full name", "fullName", [], Input)}
      </div>
      <div>
        <b>Looking fro a job</b>:{" "}
        {createField<ProfileTypeKeys>("", "lookingForAJob", [], Input, {
          type: "checkbox",
        })}
      </div>
      <div>
        <b>My professional skills</b> :
        {createField<ProfileTypeKeys>(
          "My professional skills",
          "lookingForAJobDescription",
          [],
          Textarea
        )}
      </div>
      <div>
        <b>About me</b>:
        {createField<ProfileTypeKeys>("About me", "aboutMe", [], Textarea)}
      </div>
      <div>
        <b>Contacts</b>:{" "}
        {Object.keys(profile.contacts).map(key => {
          return (
            <div className={s.contact} key={key}>
              {/* todo: create some solutin for embedded objects */}
              <b>{key}</b>: {createField(key, "contacts." + key, [], Input)}
            </div>
          );
        })}
      </div>
    </form>
  );
};
const ProfileDataFormRedux = reduxForm<ProfileType, PropsType>({
  form: "edit-profile",
})(ProfileDataForm);
export default ProfileDataFormRedux;
