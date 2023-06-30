import Preloader from "../../common/Preloader/Preloader";
import s from "./ProfileInfo.module.css";
import ProfileStatus from "./ProfileStatus";
const ProfileInfo = props => {
  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <div>
      {/* <div>
        <img src="https://media.istockphoto.com/id/1323860984/vector/green-background-in-vector-illustration-with-glow-and-lights.jpg?s=612x612&w=0&k=20&c=8IJexeaZOCxSRrNiCCgUvB-dexsy8w9PEF1IF8v4skU=" />
      </div> */}
      <div className={s.descriptionBlock}>
        <img src={props.profile.photos.large} alt="photos" />
        <ProfileStatus
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
