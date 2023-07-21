import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/redux-store";
import {
  FilterType,
  follow,
  getUsers,
  unfollow,
} from "../../redux/users-reduser";
import {
  getCurrentPageS,
  getFollowingInProgressS,
  getPageSizeS,
  getUsersFilter,
  getUsersS,
  gettotalCountS,
} from "../../redux/users-selectors";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import { UsersSearchForm } from "./UserSearchForm";
type PropsType = {};
export const Users: React.FC<PropsType> = props => {
  const users = useSelector(getUsersS);
  const totalCount = useSelector(gettotalCountS);
  const currentPage = useSelector(getCurrentPageS);
  const pageSize = useSelector(getPageSizeS);
  const filter = useSelector(getUsersFilter);
  const followingInProgress = useSelector(getFollowingInProgressS);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers(currentPage, pageSize, filter));
  }, []);

  const onPageChanged = (pageNumber: number) => {
    dispatch(getUsers(pageNumber, pageSize, filter));
  };
  const onFilterChanged = (filter: FilterType) => {
    dispatch(getUsers(1, pageSize, filter));
  };
  const follows = (userId: number) => {
    dispatch(follow(userId));
  };
  const unfollows = (userId: number) => {
    dispatch(unfollow(userId));
  };
  return (
    <div>
      <UsersSearchForm onFilterChanged={onFilterChanged} />
      <Paginator
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalItemsCount={totalCount}
        pageSize={pageSize}
      />
      <div>
        {users.map(u => (
          <User
            user={u}
            key={u.id}
            followingInProgress={followingInProgress}
            unfollow={unfollows}
            follow={follows}
          />
        ))}
      </div>
    </div>
  );
};
