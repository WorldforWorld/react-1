import { usersAPI } from "../components/api/api";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE-IS-FOLLOWING-PROGRESS";

const initialState = {
  users: [],
  pageSize: 5,
  totalUserCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.userId) {
            return { ...u, followed: true };
          }
          return u;
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.userId) {
            return { ...u, followed: false };
          }
          return u;
        }),
      };
    case SET_USERS:
      return { ...state, users: action.users };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };
    case SET_TOTAL_USERS_COUNT:
      return { ...state, totalUserCount: action.count };
    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };
    case TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id !== action.userId),
      };
    default:
      return state;
  }
};

export const followSuccess = userId => ({ type: FOLLOW, userId });

export const unfollowSuccess = userId => ({ type: UNFOLLOW, userId });

export const setUsers = users => ({ type: SET_USERS, users });

export const toggleFollowingInProgress = (isFetching, userId) => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId,
});

export const toggleIsFetching = isFetching => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

export const setTotalUsersCount = totalUserCount => ({
  type: SET_TOTAL_USERS_COUNT,
  count: totalUserCount,
});

export const setCurrentPagep = currentPage => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});

export const getUsers = (currentPage, pageSize) => dispath => {
  dispath(toggleIsFetching(true));

  usersAPI.getUsers(currentPage, pageSize).then(data => {
    dispath(toggleIsFetching(false));
    dispath(setUsers(data.items));
    dispath(setTotalUsersCount(data.totalCount));
  });
};

export const follow = userId => dispath => {
  dispath(toggleFollowingInProgress(true, userId));
  usersAPI.follow(userId).then(data => {
    if (data.resultCode === 0) {
      dispath(followSuccess(userId));
    }
    dispath(toggleFollowingInProgress(false, userId));
  });
};

export const unfollow = userId => dispath => {
  dispath(toggleFollowingInProgress(true, userId));
  usersAPI.unfollow(userId).then(data => {
    if (data.resultCode === 0) {
      dispath(unfollowSuccess(userId));
    }
    dispath(toggleFollowingInProgress(false, userId));
  });
};

export default usersReducer;
