import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../utils/object-helpers";

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
  portionSize: 10,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: true,
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: false,
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

export const getUsers = (page, pageSize) => async dispath => {
  dispath(toggleIsFetching(true));
  dispath(setCurrentPagep(page));

  const data = await usersAPI.getUsers(page, pageSize);
  dispath(toggleIsFetching(false));
  dispath(setUsers(data.items));
  dispath(setTotalUsersCount(data.totalCount));
};
const followUnfollowFlow = async (
  dispath,
  userId,
  apiMethod,
  actionCreator
) => {
  dispath(toggleFollowingInProgress(true, userId));
  const data = await apiMethod(userId);
  if (data.resultCode === 0) {
    dispath(actionCreator(userId));
  }
  dispath(toggleFollowingInProgress(false, userId));
};
export const follow = userId => async dispath => {
  const apiMethod = usersAPI.follow.bind(usersAPI);
  const actionCreator = followSuccess;
  followUnfollowFlow(dispath, userId, apiMethod, actionCreator);
};

export const unfollow = userId => async dispath => {
  const apiMethod = usersAPI.unfollow.bind(usersAPI);
  const actionCreator = unfollowSuccess;
  followUnfollowFlow(dispath, userId, apiMethod, actionCreator);
};

export default usersReducer;
