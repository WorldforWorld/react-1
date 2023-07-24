import queryString from "query-string";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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
type QueryParamsType = {
  term?: string;
  page?: string;
  friend?: string;
};
export const Users: React.FC<PropsType> = props => {
  const users = useSelector(getUsersS);
  const totalCount = useSelector(gettotalCountS);
  const currentPage = useSelector(getCurrentPageS);
  const pageSize = useSelector(getPageSizeS);
  const filter = useSelector(getUsersFilter);
  const followingInProgress = useSelector(getFollowingInProgressS);

  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const parsed = queryString.parse(
      history.location.search
    ) as QueryParamsType;
    let actualPage = currentPage;
    let actualFilter = filter;
    switch (parsed.friend) {
      case "null":
        actualFilter = { ...actualFilter, friend: null };
        break;
      case "true":
        actualFilter = { ...actualFilter, friend: true };
        break;
      case "false":
        actualFilter = { ...actualFilter, friend: false };
        break;
    }
    if (!!parsed.page) actualPage = Number(parsed.page);
    if (!!parsed.term)
      actualFilter = { ...actualFilter, term: parsed.term as string };
    dispatch(getUsers(actualPage, pageSize, actualFilter));
  }, []);
  useEffect(() => {
    const query: QueryParamsType = {};
    if (!!filter.term) query.term = filter.term;
    if (filter.friend !== null) query.friend = String(filter.friend);
    if (currentPage) query.page = String(currentPage);
    history.push({
      pathname: "/developers",
      search: queryString.stringify(query),
    });
  }, [filter, currentPage]);

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
