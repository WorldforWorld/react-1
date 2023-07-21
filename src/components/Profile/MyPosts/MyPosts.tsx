import React from "react";
import { PostType } from "../../../types/types";
import AddPostForm, { AddPostFormValuesType } from "./AddPostForm/AddPostForm";
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
      <AddPostForm onSubmit={onAddPost} />
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
};

const MyPostsMemorized = React.memo(MyPosts);

export default MyPostsMemorized;
