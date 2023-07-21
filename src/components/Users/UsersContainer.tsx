import React from "react";
import { useSelector } from "react-redux";
import { getIsFetchingS } from "../../redux/users-selectors";
import Preloader from "../common/Preloader/Preloader";
import { Users } from "./Users";

type UsersPagePropsType = {
  pageTitle: string;
};
export const UsersPage: React.FC<UsersPagePropsType> = props => {
  const isFetching = useSelector(getIsFetchingS);
  return (
    <>
      <h2>{props.pageTitle}</h2>
      {isFetching ? <Preloader /> : null}
      <Users />
    </>
  );
};
