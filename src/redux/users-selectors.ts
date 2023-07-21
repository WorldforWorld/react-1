import { AppStateType } from "./redux-store";

export const getUsersS = (state: AppStateType) => {
  return state.usersPage.users;
};

export const getPageSizeS = (state: AppStateType) => {
  return state.usersPage.pageSize;
};

export const gettotalCountS = (state: AppStateType) => {
  return state.usersPage.totalCount;
};

export const getCurrentPageS = (state: AppStateType) => {
  return state.usersPage.currentPage;
};

export const getIsFetchingS = (state: AppStateType) => {
  return state.usersPage.isFetching;
};

export const getFollowingInProgressS = (state: AppStateType) => {
  return state.usersPage.followingInProgress;
};
export const getUsersFilter = (state: AppStateType) => {
  return state.usersPage.filter;
};
