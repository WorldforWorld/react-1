import { getAuthUserData } from "./auth-reduser";
const INITIALIZED_SUCCESS = "INITIALIZED-SUCCESS";

export type InitialStateType = {
  initialized: boolean;
};

const initialState: InitialStateType = {
  initialized: false,
};
type initializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS;
};
const appReducer = (
  state: InitialStateType = initialState,
  action: any
): InitialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

export const initializedSuccess = (): initializedSuccessActionType => ({
  type: INITIALIZED_SUCCESS,
});

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData());
  Promise.all([promise]).then(() => {
    dispatch(initializedSuccess());
  });
};

export default appReducer;
