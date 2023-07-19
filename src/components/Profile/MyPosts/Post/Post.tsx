import classes from "./Post.module.css";
type PropsType = {
  message: string;
  likesCount: number;
};
const Post: React.FC<PropsType> = props => {
  return (
    <div className={classes.item}>
      <img src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" />
      {props.message}
      <div>
        <span>like</span> {props.likesCount}
      </div>
    </div>
  );
};
export default Post;
