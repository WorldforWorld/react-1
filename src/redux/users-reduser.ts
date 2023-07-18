import { Dispatch } from "react";
import { UserType } from "../types/types";
import { updateObjectInArray } from "../utils/object-helpers";
import { usersAPI } from "./../api/users-api";
import { AppStateType, BaseThunkType, InferActionsTypes } from "./redux-store";

const initialState = {
  users: [] as Array<UserType>,
  pageSize: 5,
  totalUserCount: 0,
  portionSize: 10,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>, // array of users ids
};
const usersReducer = (
  state = initialState,
  action: ActionsTypes
): InitialState => {
  switch (action.type) {
    case "SN/USERS/FOLLOW":
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: true,
        }),
      };
    case "SN/USERS/UNFOLLOW":
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: false,
        }),
      };
    case "SN/USERS/SET_USERS":
      return { ...state, users: action.users };
    case "SN/USERS/SET_CURRENT_PAGE":
      return { ...state, currentPage: action.currentPage };
    case "SN/USERS/SET_TOTAL_USERS_COUNT":
      return { ...state, totalUserCount: action.count };
    case "SN/USERS/TOGGLE_IS_FETCHING":
      return { ...state, isFetching: action.isFetching };
    case "SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS":
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
export const actions = {
  followSuccess: (userId: number) =>
    ({
      type: "SN/USERS/FOLLOW",
      userId,
    } as const),
  unfollowSuccess: (userId: number) =>
    ({
      type: "SN/USERS/UNFOLLOW",
      userId,
    } as const),
  setUsers: (users: Array<UserType>) =>
    ({
      type: "SN/USERS/SET_USERS",
      users,
    } as const),
  toggleFollowingInProgress: (isFetching: boolean, userId: number) =>
    ({
      type: "SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS",
      isFetching,
      userId,
    } as const),
  toggleIsFetching: (isFetching: boolean) =>
    ({
      type: "SN/USERS/TOGGLE_IS_FETCHING",
      isFetching,
    } as const),
  setTotalUsersCount: (totalUserCount: number) =>
    ({
      type: "SN/USERS/SET_TOTAL_USERS_COUNT",
      count: totalUserCount,
    } as const),
  setCurrentPagep: (currentPage: number) =>
    ({
      type: "SN/USERS/SET_CURRENT_PAGE",
      currentPage,
    } as const),
};

export const getUsers =
  (page: number, pageSize: number): ThunkType =>
  async (dispath, getState) => {
    dispath(actions.toggleIsFetching(true));
    dispath(actions.setCurrentPagep(page));

    const data = await usersAPI.getUsers(page, pageSize);
    dispath(actions.toggleIsFetching(false));
    dispath(actions.setUsers(data.items));
    dispath(actions.setTotalUsersCount(data.totalUserCount));
  };
const _followUnfollowFlow = async (
  dispath: Dispatch<ActionsTypes>,
  userId: number,
  apiMethod: any,
  actionCreator: (userId: number) => ActionsTypes
) => {
  dispath(actions.toggleFollowingInProgress(true, userId));
  const data = await apiMethod(userId);
  if (data.resultCode === 0) {
    dispath(actionCreator(userId));
  }
  dispath(actions.toggleFollowingInProgress(false, userId));
};
export const follow =
  (userId: number): ThunkType =>
  async dispath => {
    const apiMethod = usersAPI.follow.bind(usersAPI);
    const actionCreator = actions.followSuccess;
    _followUnfollowFlow(dispath, userId, apiMethod, actionCreator);
  };

export const unfollow =
  (userId: number): ThunkType =>
  async dispath => {
    const apiMethod = usersAPI.unfollow.bind(usersAPI);
    const actionCreator = actions.unfollowSuccess;
    _followUnfollowFlow(dispath, userId, apiMethod, actionCreator);
  };

export default usersReducer;

type InitialState = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>;
