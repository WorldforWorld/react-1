import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { PostType } from "../../../types/types";
import { required } from "../../../utils/validators/validators";
import { LoginFormValuesType } from "../../Login/Login";
import {
  GetStringKeys,
  Textarea,
  createField,
} from "../../common/FomsControls/FormsControls";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
export type MapPropsTypeMyPosts = {
  posts: Array<PostType>;
};
export type DispatchPropsTypeMyPosts = {
  addPost: (newPostText: string) => void;
};
const MyPosts: React.FC<
  MapPropsTypeMyPosts & DispatchPropsTypeMyPosts
> = props => {
  const postsElements = [...props.posts]
    .reverse()
    .map(p => (
      <Post message={p.message} likesCount={p.likesCount} key={p.id} />
    ));
  const onAddPost = (values: AddPostFormValuesType) => {
    props.addPost(values.newPostText);
  };
  return (
    <div className={s.postsBlock}>
      <h3>My postst</h3>
      <AddNewPostForm onSubmit={onAddPost} />
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
};

const MyPostsMemorized = React.memo(MyPosts);
type PropsType = {};
type AddPostFormValuesType = {
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
AddNewPostForm = reduxForm<AddPostFormValuesType, PropsType>({
  form: "profile-add-post",
})(AddNewPostForm);
export default MyPostsMemorized;
