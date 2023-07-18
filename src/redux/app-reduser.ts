import { getAuthUserData } from "./auth-reduser";
import { InferActionsTypes } from "./redux-store";

const initialState = {
  initialized: false,
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
const appReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "SN/APP/INITIALIZED-SUCCESS":
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};
export const actions = {
  initializedSuccess: () =>
    ({
      type: "SN/APP/INITIALIZED-SUCCESS",
    } as const),
};

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData());
  Promise.all([promise]).then(() => {
    dispatch(actions.initializedSuccess());
  });
};

export default appReducer;
