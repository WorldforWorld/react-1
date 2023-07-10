import React from "react";
import { Field, reduxForm } from "redux-form";
import {
  maxLenthCreator,
  required,
} from "../../../utils/validators/validators";
import { Textarea } from "../../common/FomsControls/FormsControls";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = React.memo(props => {
  console.log("render");
  const postsElements = [...props.posts]
    .reverse()
    .map(p => (
      <Post message={p.message} likesCount={p.likesCount} key={p.id} />
    ));
  const onAddPost = values => {
    props.addPost(values.newPostText);
  };
  return (
    <div className={classes.postsBlock}>
      <h3>My postst</h3>
      <AddNewPostForm onSubmit={onAddPost} />
      <div className={classes.posts}>{postsElements}</div>
    </div>
  );
});

const maxLength10 = maxLenthCreator(10);
let AddNewPostForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          name="newPostText"
          component={Textarea}
          placeholder="Post message"
          validate={[required, maxLength10]}
        />
      </div>
      <div>
        <button>Add Post</button>
      </div>
    </form>
  );
};
AddNewPostForm = reduxForm({ form: "ProfileAddNewPostForm" })(AddNewPostForm);
export default MyPosts;
