import Paginator from "../common/Paginator/Paginator";
import User from "./User";
const Users = ({
  currentPage,
  totalUserCount,
  pageSize,
  onPageChanged,
  portionSize,
  users,
  ...props
}) => {
  return (
    <div>
      <Paginator
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalUserCount={totalUserCount}
        pageSize={pageSize}
        portionSize={portionSize}
      />
      {users.map(u => (
        <User
          user={u}
          key={u.id}
          followingInProgress={props.followingInProgress}
          unfollow={props.unfollow}
          follow={props.follow}
        />
      ))}
    </div>
  );
};
export default Users;