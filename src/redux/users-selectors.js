export const getUsersS = state => {
  return state.userPage.users;
};

export const getPageSizeS = state => {
  return state.userPage.pageSize;
};

export const getTotalUserCountS = state => {
  return state.userPage.totalUserCount;
};

export const getCurrentPageS = state => {
  return state.userPage.currentPage;
};

export const getIsFetchingS = state => {
  return state.userPage.isFetching;
};

export const getFollowingInProgressS = state => {
  return state.userPage.followingInProgress;
};
