import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import { reducer as FormReducer } from "redux-form";
import ThunkMiddleware from "redux-thunk";
import appReducer from "./app-reduser";
import authReducer from "./auth-reduser";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reduser";
const reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: FormReducer,
  app: appReducer,
});

const store = createStore(reducers, applyMiddleware(ThunkMiddleware));

export default store;
