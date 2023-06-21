import MyPosts from "./MyPosts/MyPosts";
import classes from "./Profile.module.css";
const Profile = () => {
  return (
    <div>
      <div>
        <img src="https://media.istockphoto.com/id/1323860984/vector/green-background-in-vector-illustration-with-glow-and-lights.jpg?s=612x612&w=0&k=20&c=8IJexeaZOCxSRrNiCCgUvB-dexsy8w9PEF1IF8v4skU=" />
      </div>
      <div>ava + desc</div>
      <MyPosts />
    </div>
  );
};
export default Profile;
