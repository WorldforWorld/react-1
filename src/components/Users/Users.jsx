import { NavLink } from "react-router-dom";
import userPhoto from "../../assets/images/user.png";
import styles from "./users.module.css";
const Users = props => {
  const pagesCount = Math.ceil(props.totalUserCount / props.pageSize);
  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    if (pages.length < props.pageSize * 5) {
      pages.push(i);
    }
  }
  return (
    <div>
      <div>
        {pages.map(p => {
          return (
            <span
              className={props.currentPage === p && styles.selectedPage}
              onClick={e => {
                props.onPageChanged(p);
              }}
              key={p}
            >
              {p}
            </span>
          );
        })}
      </div>
      {props.users.map(u => (
        <div key={u.id}>
          <span>
            <div>
              <NavLink to={"/profile/" + u.id}>
                <img
                  src={u.photos.small != null ? u.photos.small : userPhoto}
                  alt="phot"
                  className={styles.userPhoto}
                />
              </NavLink>
            </div>
            <div>
              {u.followed ? (
                <button
                  disabled={props.followingInProgress.some(id => id === u.id)}
                  onClick={() => props.unfollow(u.id)}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  disabled={props.followingInProgress.some(id => id === u.id)}
                  onClick={() => props.follow(u.id)}
                >
                  Follow
                </button>
              )}
            </div>
          </span>
          <span>
            <span>
              <div>{u.name}</div>
              <div>{u.status}</div>
            </span>
            <span>
              <div>{"u.location.country"}</div>
              <div>{"u.location.city"}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};
export default Users;
