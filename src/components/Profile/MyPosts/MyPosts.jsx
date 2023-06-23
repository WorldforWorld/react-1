import React from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = props => {
  const postsElements = props.posts.map(p => (
    <Post message={p.message} likesCount={p.likesCount} key={p.id} />
  ));
  const newPostElement = React.createRef();
  const onAddPost = () => {
    props.addPost();
  };
  const onPostChange = () => {
    const text = newPostElement.current.value;
    props.updateNewPostText(text);
  };
  return (
    <div className={classes.postsBlock}>
      <h3>My postst</h3>
      <div>
        <div>
          <textarea
            onChange={onPostChange}
            ref={newPostElement}
            value={props.newPostText}
          />
        </div>
        <div>
          <button onClick={onAddPost}>Add Post</button>
        </div>
      </div>
      <div className={classes.posts}>{postsElements}</div>
    </div>
  );
};
export default MyPosts;
