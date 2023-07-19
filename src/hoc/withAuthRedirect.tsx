import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { AppStateType } from "../redux/redux-store";

const mapStateToPropsFroRedirect = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
});
type MapPropsType = {
  isAuth: boolean;
};
type DispatchPropsType = {};
export function withAuthRedirect<WCP>(
  WrappedComponent: React.ComponentType<WCP>
) {
  const RedirectComponent: React.FC<
    MapPropsType & DispatchPropsType
  > = props => {
    const { isAuth, ...restProps } = props;
    if (!isAuth) return <Navigate to={"/login"} />;
    return <WrappedComponent {...(restProps as WCP)} />;
  };
  const connectedAuthRedirectComponent = connect<
    MapPropsType,
    DispatchPropsType,
    WCP,
    AppStateType
  >(
    mapStateToPropsFroRedirect,
    {}
  )(RedirectComponent);
  return connectedAuthRedirectComponent;
}
