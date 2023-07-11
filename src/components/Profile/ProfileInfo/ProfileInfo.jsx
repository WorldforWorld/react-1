import Preloader from "../../common/Preloader/Preloader";
import s from "./ProfileInfo.module.css";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
const ProfileInfo = props => {
  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <div>
      <div className={s.descriptionBlock}>
        <img src={props.profile.photos.large} alt="photos" />
        <ProfileStatusWithHooks
          status={props.status}
          updateStatus={props.updateStatus}
        />
        <h1>{props.profile.fullName}</h1>
        <h2>Описание: {props.profile.lookingForAJobDescription}</h2>
        <p>Обо мне: {props.profile.aboutMe}</p>
        <p>Мои контакрыт</p>
        <p>
          {props.profile.lookingForAJob === true
            ? "Ищу работу"
            : "Не ищу работу"}
        </p>
        <ul>
          {Object.values(props.profile.contacts).map(c =>
            c === null ? "" : <li>{c}</li>
          )}
        </ul>
      </div>
    </div>
  );
};
export default ProfileInfo;
