import React from "react";
import { Provider, connect } from "react-redux";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import { compose } from "redux";
import "./App.css";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import ProfileContainer from "./components/Profile/ProfileContainer";
import UsersContainer from "./components/Users/UsersContainer";
import Preloader from "./components/common/Preloader/Preloader";
import { initializeApp } from "./redux/app-reduser";
import store from "./redux/reduc-store";
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
          <Routes>
            <Route path="/dialogs" element={<DialogsContainer />} />
            <Route path="/profile/:userId?" element={<ProfileContainer />} />
            <Route path="/users" element={<UsersContainer />} />
            <Route path="/login" element={<Login />} />
          </Routes>
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
      <BrowserRouter>
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
};
export default SamuraiJSApp;
