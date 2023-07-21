import React from "react";
import { Provider, connect } from "react-redux";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import { compose } from "redux";
import "./App.css";
import HeaderContainer from "./components/Header/HeaderContainer";
import { Login } from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import { UsersPage } from "./components/Users/UsersContainer";
import Preloader from "./components/common/Preloader/Preloader";
import { withSuspense } from "./hoc/withSuspense";
import { initializeApp } from "./redux/app-reduser";
import store, { AppStateType } from "./redux/redux-store";
const ProfileContainer = React.lazy(
  () => import("./components/Profile/ProfileContainer")
);
const DialogsContainer = React.lazy(
  () => import("./components/Dialogs/DialogsContainer")
);
type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initializeApp: () => void;
};

const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedProfile = withSuspense(ProfileContainer);

class App extends React.Component<MapPropsType & DispatchPropsType> {
  componentDidMount() {
    this.props.initializeApp();
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Switch>
            <Route exact path="/" render={() => <Redirect to={"/profile"} />} />
            <Route path="/dialogs" render={() => <SuspendedDialogs />} />
            <Route
              path="/profile/:userId?"
              render={() => <SuspendedProfile />}
            />
            <Route
              path="/users"
              render={() => <UsersPage pageTitle={"Самурай"} />}
            />
            <Route path="/login" render={() => <Login />} />
            <Route path="*" render={() => <div>404 NOT FOUND</div>} />
          </Switch>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
});
const AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);
const SamuraiJSApp: React.FC = () => {
  return (
    <React.StrictMode>
      {/* HashRouter - только для gh-pages используется без basename */}
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
};
export default SamuraiJSApp;
