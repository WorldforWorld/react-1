import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  follow,
  getUsers,
  setCurrentPagep,
  unfollow,
} from "../../redux/users-reduser";
import {
  getCurrentPageS,
  getFollowingInProgressS,
  getIsFetchingS,
  getPageSizeS,
  getTotalUserCountS,
  getUsersS,
} from "../../redux/users-selectors";
import Preloader from "../common/Preloader/Preloader";
import Users from "./Users";
class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }
  onPageChanged = pageNumber => {
    this.props.setCurrentPagep(pageNumber);
    this.props.getUsers(pageNumber, this.props.pageSize);
  };
  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUserCount={this.props.totalUserCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          users={this.props.users}
          unfollow={this.props.unfollow}
          follow={this.props.follow}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    );
  }
}

/* const mapStateToProps = state => ({
  users: state.usersPage.users,
  pageSize: state.usersPage.pageSize,
  totalUserCount: state.usersPage.totalUserCount,
  currentPage: state.usersPage.currentPage,
  isFetching: state.usersPage.isFetching,
  followingInProgress: state.usersPage.followingInProgress,
}); */

const mapStateToProps = state => ({
  users: getUsersS(state),
  pageSize: getPageSizeS(state),
  totalUserCount: getTotalUserCountS(state),
  currentPage: getCurrentPageS(state),
  isFetching: getIsFetchingS(state),
  followingInProgress: getFollowingInProgressS(state),
});

export default compose(
  connect(mapStateToProps, { follow, unfollow, setCurrentPagep, getUsers })
)(UsersContainer);
