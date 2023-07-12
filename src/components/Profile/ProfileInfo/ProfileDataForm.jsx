import { reduxForm } from "redux-form";
import {
  Input,
  Textarea,
  createField,
} from "../../common/FomsControls/FormsControls";
import s from "./ProfileInfo.module.css";
const ProfileDataForm = ({ handleSubmit, profile, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button>save</button>
      </div>
      {error && <div className={s.formSummaryError}>{error}</div>}
      <div>
        <b>Full name</b>: {createField("Full name", "fullName", [], Input)}
      </div>
      <div>
        <b>Looking fro a job</b>:{" "}
        {createField("", "lookingForAJob", [], Input, { type: "checkbox" })}
      </div>
      <div>
        <b>My professional skills</b> :
        {createField(
          "My professional skills",
          "lookingForAJobDescription",
          [],
          Textarea
        )}
      </div>
      <div>
        <b>About me</b>:{createField("About me", "aboutMe", [], Textarea)}
      </div>
      <div>
        <b>Contacts</b>:{" "}
        {Object.keys(profile.contacts).map(key => {
          return (
            <div className={s.contact} key={key}>
              <b>{key}</b>: {createField(key, "contacts." + key, [], Input)}
            </div>
          );
        })}
      </div>
    </form>
  );
};
const ProfileDataFormRedux = reduxForm({ form: "edit-profile" })(
  ProfileDataForm
);
export default ProfileDataFormRedux;
