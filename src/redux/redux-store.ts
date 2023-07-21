import {
  Action,
  AnyAction,
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from "redux";
import { reducer as FormReducer } from "redux-form";
import ThunkMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk";
import appReducer from "./app-reduser";
import authReducer from "./auth-reduser";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reduser";
const rootReducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: FormReducer,
  app: appReducer,
});

type RootReducersType = typeof rootReducers;

export type AppStateType = ReturnType<RootReducersType>;

export type InferActionsTypes<T> = T extends {
  [keys: string]: (...args: any[]) => infer U;
}
  ? U
  : never;
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<
  R,
  AppStateType,
  unknown,
  A
>;
export type AppDispatch = ThunkDispatch<AppStateType, unknown, AnyAction>;
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(ThunkMiddleware))
);
// @ts-ignore
window.__store__ = store;
// const store = createStore(reducers, applyMiddleware(ThunkMiddleware));

export default store;
