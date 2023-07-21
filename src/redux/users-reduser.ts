import { Dispatch } from "react";
import { APIResponseType } from "../api/api";
import { UserType } from "../types/types";
import { updateObjectInArray } from "../utils/object-helpers";
import { usersAPI } from "./../api/users-api";
import { AppStateType, BaseThunkType, InferActionsTypes } from "./redux-store";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

const initialState = {
  users: [] as Array<UserType>,
  pageSize: 5,
  totalCount: 0,
  portionSize: 10,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>, // array of users ids
  filter: {
    term: "",
    friend: null as null | boolean,
  },
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
      return { ...state, totalCount: action.count };
    case "SN/USERS/TOGGLE_IS_FETCHING":
      return { ...state, isFetching: action.isFetching };
    case "SN/USERS/SET_FILTER":
      return { ...state, filter: action.payload };
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
  setTotalUsersCount: (totalCount: number) =>
    ({
      type: "SN/USERS/SET_TOTAL_USERS_COUNT",
      count: totalCount,
    } as const),
  setCurrentPagep: (currentPage: number) =>
    ({
      type: "SN/USERS/SET_CURRENT_PAGE",
      currentPage,
    } as const),
  setFilter: (filter: FilterType) =>
    ({
      type: "SN/USERS/SET_FILTER",
      payload: filter,
    } as const),
};

export const getUsers =
  (page: number, pageSize: number, filter: FilterType): ThunkType =>
  async (dispath, getState) => {
    dispath(actions.toggleIsFetching(true));
    dispath(actions.setCurrentPagep(page));
    dispath(actions.setFilter(filter));

    const data = await usersAPI.getUsers(
      page,
      pageSize,
      filter.term,
      filter.friend
    );
    dispath(actions.toggleIsFetching(false));
    dispath(actions.setUsers(data.items));
    dispath(actions.setTotalUsersCount(data.totalCount));
  };
const _followUnfollowFlow = async (
  dispath: Dispatch<ActionsTypes>,
  userId: number,
  apiMethod: (userId: number) => Promise<APIResponseType>,
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
    await _followUnfollowFlow(
      dispath,
      userId,
      usersAPI.follow.bind(usersAPI),
      actions.followSuccess
    );
  };

export const unfollow =
  (userId: number): ThunkType =>
  async dispath => {
    await _followUnfollowFlow(
      dispath,
      userId,
      usersAPI.unfollow.bind(usersAPI),
      actions.unfollowSuccess
    );
  };

export default usersReducer;

export type InitialState = typeof initialState;
export type FilterType = typeof initialState.filter;

type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>;
