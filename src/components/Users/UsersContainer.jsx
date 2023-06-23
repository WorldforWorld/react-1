import { connect } from "react-redux";
import { followAC, setUsersAC, unfollowAC } from "../../redux/users-reduser";
import Users from "./Users";

const mapStateToProps = state => ({ users: state.usersPage.users });

const mapStateToDispatch = dispatch => {
  return {
    follow: userId => {
      dispatch(followAC(userId));
    },
    unfollow: userId => {
      dispatch(unfollowAC(userId));
    },
    setUsers: users => {
      dispatch(setUsersAC(users));
    },
  };
};
export default connect(mapStateToProps, mapStateToDispatch)(Users);
