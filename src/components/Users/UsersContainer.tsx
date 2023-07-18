import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store";
import { follow, getUsers, unfollow } from "../../redux/users-reduser";
import {
  getCurrentPageS,
  getFollowingInProgressS,
  getIsFetchingS,
  getPageSizeS,
  getTotalUserCountS,
  getUsersS,
} from "../../redux/users-selectors";
import { UserType } from "../../types/types";
import Preloader from "../common/Preloader/Preloader";
import Users from "./Users";

type MapStatePropsType = {
  currentPage: number;
  pageSize: number;
  totalUserCount: number;
  users: Array<UserType>;
  isFetching: boolean;
  followingInProgress: Array<number>;
};

type MapDispatchPropsType = {
  getUsers: (currentPage: number, pageSize: number) => void;
  unfollow: (userId: number) => void;
  follow: (userId: number) => void;
};

type OwnPropsType = {
  pageTitle: string;
};
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;
class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }
  onPageChanged = (pageNumber: number) => {
    this.props.getUsers(pageNumber, this.props.pageSize);
  };
  render() {
    return (
      <>
        <h2>{this.props.pageTitle}</h2>
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
const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  users: getUsersS(state),
  pageSize: getPageSizeS(state),
  totalUserCount: getTotalUserCountS(state),
  currentPage: getCurrentPageS(state),
  isFetching: getIsFetchingS(state),
  followingInProgress: getFollowingInProgressS(state),
});
export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
    mapStateToProps,
    {
      follow,
      unfollow,
      getUsers,
    }
  )
)(UsersContainer);
