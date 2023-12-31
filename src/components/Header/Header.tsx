import { Link } from "react-router-dom";

import { UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Col from "antd/es/grid/col";
import Row from "antd/es/grid/row";
import Avatar from "antd/lib/avatar/avatar";
import Button from "antd/lib/button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth-reduser";
import {
  selectCurrentUserLogin,
  selectIsAuth,
} from "../../redux/auth-selectors";
import { AppDispatch } from "../../redux/redux-store";
export type MapPropsType = {};
export const Header: React.FC<MapPropsType> = props => {
  const { Header } = Layout;
  const isAuth = useSelector(selectIsAuth);
  const login = useSelector(selectCurrentUserLogin);

  const dispatch: AppDispatch = useDispatch();

  const logoutCallback = () => {
    dispatch(logout());
  };

  return (
    <Header className="header">
      <Row>
        <Col span={18}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item>
              <Link to="/developers">Developers</Link>
            </Menu.Item>
          </Menu>
        </Col>
        {isAuth ? (
          <>
            <Col span={1}>
              <Avatar
                alt={login || ""}
                style={{ backgroundColor: "#87d068" }}
                icon={<UserOutlined />}
              />
            </Col>
            <Col span={5}>
              <Button onClick={logoutCallback}>Log out</Button>
            </Col>
          </>
        ) : (
          <Col span={6}>
            <Button>
              <Link to="/login">Login</Link>
            </Button>
          </Col>
        )}
      </Row>
    </Header>
  );
};
