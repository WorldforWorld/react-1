import { LaptopOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import "antd/dist/antd.css";
import SubMenu from "antd/lib/menu/SubMenu";
import React from "react";
import { Provider, connect } from "react-redux";
import {
  BrowserRouter,
  Link,
  Redirect,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import { compose } from "redux";
import "./App.css";
import { Header } from "./components/Header/Header";
import { Login } from "./components/Login/Login";
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
const ChatPage = React.lazy(() => import("./pages/Chat/ChatPage"));
const { Content, Footer, Sider } = Layout;
type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initializeApp: () => void;
};

const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedProfile = withSuspense(ProfileContainer);
const SuspendedChatPage = withSuspense(ChatPage);

class App extends React.Component<MapPropsType & DispatchPropsType> {
  componentDidMount() {
    this.props.initializeApp();
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }

    return (
      <Layout>
        <Header />
        <Content
          style={{
            padding: "0 50px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout
            className="site-layout-background"
            style={{
              padding: "24px 0",
            }}
          >
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                // defaultSelectedKeys={["1"]}
                // defaultOpenKeys={["sub1"]}
                style={{ height: "100%" }}
              >
                <SubMenu key="sub1" icon={<UserOutlined />} title="My profile">
                  <Menu.Item key="1">
                    <Link to="/profile">Profile</Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link to="/dialogs">Messages</Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  icon={<LaptopOutlined />}
                  title="Developers"
                >
                  <Menu.Item key="3">
                    <Link to="/developers">Developers</Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub3"
                  icon={<LaptopOutlined />}
                  title="Developers"
                >
                  <Menu.Item key="4">
                    <Link to="/chat">Chat</Link>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content
              style={{
                padding: "0 24px",
                minHeight: 280,
              }}
            >
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => <Redirect to={"/profile"} />}
                />
                <Route path="/dialogs" render={() => <SuspendedDialogs />} />
                <Route
                  path="/profile/:userId?"
                  render={() => <SuspendedProfile />}
                />
                <Route
                  path="/developers"
                  render={() => <UsersPage pageTitle={"Самураи"} />}
                />
                <Route path="/chat" render={() => <SuspendedChatPage />} />
                <Route path="/login" render={() => <Login />} />
                <Route path="*" render={() => <div>404 NOT FOUND</div>} />
              </Switch>
            </Content>
          </Layout>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
      /*  <div className="app-wrapper">
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
              path="/developers"
              render={() => <UsersPage pageTitle={"Самурай"} />}
            />
            <Route path="/login" render={() => <Login />} />
            <Route path="*" render={() => <div>404 NOT FOUND</div>} />
          </Switch>
        </div>
      </div> */
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
