import { AppStateType } from "./redux-store";

export const getUsersS = (state: AppStateType) => {
  return state.usersPage.users;
};

export const getPageSizeS = (state: AppStateType) => {
  return state.usersPage.pageSize;
};

export const getTotalUserCountS = (state: AppStateType) => {
  return state.usersPage.totalUserCount;
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
