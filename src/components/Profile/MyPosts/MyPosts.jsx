import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
const MyPosts = () => {
  return (
    <div>
      My postst
      <div>
        <textarea></textarea>
        <button>Add Post</button>
        <button>Remove Post</button>
      </div>
      <div className={classes.posts}>
        <Post message="Hi, how are you?" likesCount="0" />
        <Post message="It's my first post" likesCount="165" />
      </div>
    </div>
  );
};
export default MyPosts;
