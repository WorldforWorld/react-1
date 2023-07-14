import React, { Suspense, lazy } from "react";
import { Provider, connect } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import { compose } from "redux";
import "./App.css";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import UsersContainer from "./components/Users/UsersContainer";
import Preloader from "./components/common/Preloader/Preloader";
import { initializeApp } from "./redux/app-reduser.ts";
import store from "./redux/redux-store";
const ProfileContainer = lazy(() =>
  import("./components/Profile/ProfileContainer")
);
const DialogsContainer = lazy(() =>
  import("./components/Dialogs/DialogsContainer")
);
export function withRouter(Children) {
  return props => {
    const match = { params: useParams() };
    return <Children {...props} match={match} />;
  };
}
class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }
  render() {
    if (this.props.initialized) {
      return <Preloader />;
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Suspense fallback={<Preloader />}>
            <Routes>
              <Route exact path="/" element={<Navigate to={"/profile"} />} />
              <Route path="/dialogs" element={<DialogsContainer />} />
              <Route path="/profile/:userId?" element={<ProfileContainer />} />
              <Route path="/users" element={<UsersContainer />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<div>404 NOT FOUND</div>} />
            </Routes>
          </Suspense>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  initialized: state.app.state,
});
const AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);
const SamuraiJSApp = props => {
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
