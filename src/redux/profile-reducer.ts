import { stopSubmit } from "redux-form";
import { profileAPI, usersAPI } from "../api/api";
import { PhotosType, PostType, ProfileType } from "../types/types";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET-USER-PROFILE";
const SET_STATUS = "SET-STATUS";
const DELETE_POST = "DELETE-POST";
const SAVE_PHOTO_SUCCESS = "SAVE-PHOTO-SUCCESS";

const initialState = {
  posts: [
    { id: 1, message: "Hi, how are you?", likesCount: 0 },
    { id: 2, message: "It's my first post", likesCount: 165 },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: "",
  newPostText: "",
};

export type InitialStateType = typeof initialState;
const profileReducer = (
  state = initialState,
  action: any
): InitialStateType => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: state.posts.length + 1,
        message: action.newPostText,
        likesCount: 0,
      };
      return { ...state, posts: [...state.posts, newPost], newPostText: "" };

    case SET_USER_PROFILE:
      return { ...state, profile: action.profile };
    case SET_STATUS:
      return { ...state, status: action.status };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(p => p.id !== action.postID),
      };
    case SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };
    default:
      return state;
  }
};
type addPostActionCreatorActionType = {
  type: typeof ADD_POST;
  newPostText: string;
};
export const addPostActionCreator = (
  newPostText: string
): addPostActionCreatorActionType => ({
  type: ADD_POST,
  newPostText,
});
type setUserProfileActionType = {
  type: typeof SET_USER_PROFILE;
  profile: ProfileType;
};
export const setUserProfile = (
  profile: ProfileType
): setUserProfileActionType => ({
  type: SET_USER_PROFILE,
  profile,
});
type setStatusActionType = {
  type: typeof SET_STATUS;
  status: string;
};
export const setStatus = (status: string): setStatusActionType => ({
  type: SET_STATUS,
  status,
});
type deletePostActionType = {
  type: typeof DELETE_POST;
  psotId: number;
};
export const deletePost = (psotId: number): deletePostActionType => ({
  type: DELETE_POST,
  psotId,
});
type savePhotoSuccessActionType = {
  type: typeof SAVE_PHOTO_SUCCESS;
  photos: PhotosType;
};
export const savePhotoSuccess = (
  photos: PhotosType
): savePhotoSuccessActionType => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
});

export const getUserProfile = (userId: number) => async (dispatch: any) => {
  const response = await usersAPI.getProfile(userId);
  dispatch(setUserProfile(response.data));
};

export const getStatus = (userId: number) => async (dispatch: any) => {
  const response = await profileAPI.getStatus(userId);
  dispatch(setStatus(response.data));
};

export const updateStatus = (status: string) => async (dispatch: any) => {
  try {
    const response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  } catch (error) {}
};

export const savePhoto = (file: any) => async (dispatch: any) => {
  const response = await profileAPI.savePhoto(file);
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos));
  }
};

export const saveProfile =
  (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
      dispatch(getUserProfile(userId));
    } else {
      dispatch(
        stopSubmit("edit-profile", { _error: response.data.messages[0] })
      );
      return Promise.reject(response.data.message[0]);
    }
  };

export default profileReducer;
