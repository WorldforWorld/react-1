import React, { ChangeEvent, useState } from "react";
import userPhoto from "../../../assets/images/user.png";
import { ContactsType, ProfileType } from "../../../types/types";
import Preloader from "../../common/Preloader/Preloader";
import ProfileDataForm from "./ProfileDataForm";
import s from "./ProfileInfo.module.css";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
type PropsType = {
  profile: ProfileType | null;
  status: string;
  updateStatus: (status: string) => void;
  isOwner: boolean;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileType) => Promise<any>;
};
const ProfileInfo: React.FC<PropsType> = props => {
  const [editMode, setEditMode] = useState(false);
  if (!props.profile) {
    return <Preloader />;
  }
  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      props.savePhoto(e.target.files[0]);
    }
  };
  const onSubmit = (formData: ProfileType) => {
    // todo: remove then
    props.saveProfile(formData).then(() => {
      setEditMode(false);
    });
  };
  return (
    <div>
      <div className={s.descriptionBlock}>
        <img
          src={props.profile.photos.large || userPhoto}
          alt="photos"
          className={s.mainPhoto}
        />
        {props.isOwner && <input type="file" onChange={onMainPhotoSelected} />}
        {editMode ? (
          <ProfileDataForm
            initialValues={props.profile}
            profile={props.profile}
            onSubmit={onSubmit}
          />
        ) : (
          <ProfileData
            goToEditMode={() => {
              setEditMode(true);
            }}
            profile={props.profile}
            isOwner={props.isOwner}
          />
        )}
        <ProfileStatusWithHooks
          status={props.status}
          updateStatus={props.updateStatus}
        />
      </div>
    </div>
  );
};
type ProfileDataPropsType = {
  profile: ProfileType;
  isOwner: boolean;
  goToEditMode: () => void;
};
const ProfileData: React.FC<ProfileDataPropsType> = ({
  profile,
  isOwner,
  goToEditMode,
}) => {
  return (
    <div>
      {isOwner && (
        <div>
          <button onClick={goToEditMode}>edit</button>
        </div>
      )}
      <div>
        <b>Full name</b>:{profile.fullName}
      </div>
      <div>
        <b>Looking fro a job</b>:{profile.lookingForAJob ? "yes" : "no"}
      </div>
      {profile.lookingForAJob && (
        <div>
          <b>My professional skills</b> :{profile.lookingForAJobDescription}
        </div>
      )}
      <div>
        <b>About me</b>: {profile.aboutMe}
      </div>
      <div>
        <b>Contacts</b>:{" "}
        {Object.keys(profile.contacts).map(key => {
          return (
            <Contact
              key={key}
              contactTitle={key}
              contactValue={profile.contacts[key as keyof ContactsType]}
            />
          );
        })}
      </div>
    </div>
  );
};
type ContactPropsType = {
  contactValue: string;
  contactTitle: string;
};
const Contact: React.FC<ContactPropsType> = ({
  contactTitle,
  contactValue,
}) => {
  return (
    <div className={s.contact}>
      <b>{contactTitle}</b>: {contactValue}
    </div>
  );
};

export default ProfileInfo;
