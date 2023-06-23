import styles from "./users.module.css";
const Users = props => {
  if (props.users.length === 0) {
    props.setUsers([
      {
        id: 1,
        photoUrl:
          "https://i.discogs.com/k3USJ7OYmgaMjSD2u16nkcVBbX_72Mm0ZsRHBTm7lBM/rs:fit/g:sm/q:90/h:730/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTExNTQ2/MS0xNTg3MTU1OTM1/LTI3MDkuanBlZw.jpeg",
        followed: true,
        fullName: "Sahsa",
        status: "I am a boss",
        location: { city: "Minsk", country: "Belfrus" },
      },
      {
        id: 2,
        photoUrl:
          "https://i.discogs.com/k3USJ7OYmgaMjSD2u16nkcVBbX_72Mm0ZsRHBTm7lBM/rs:fit/g:sm/q:90/h:730/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTExNTQ2/MS0xNTg3MTU1OTM1/LTI3MDkuanBlZw.jpeg",
        followed: false,
        fullName: "Masha",
        status: "I am a boss too",
        location: { city: "Moskow", country: "Russian" },
      },
      {
        id: 3,
        photoUrl:
          "https://i.discogs.com/k3USJ7OYmgaMjSD2u16nkcVBbX_72Mm0ZsRHBTm7lBM/rs:fit/g:sm/q:90/h:730/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTExNTQ2/MS0xNTg3MTU1OTM1/LTI3MDkuanBlZw.jpeg",
        followed: true,
        fullName: "Viktor",
        status: "I am a boss true",
        location: { city: "Kiev", country: "Ukrane" },
      },
    ]);
  }

  return (
    <div>
      {props.users.map(u => (
        <div key={u.id}>
          <span>
            <div>
              <img src={u.photoUrl} alt="phot" className={styles.userPhoto} />
            </div>
            <div>
              {u.followed ? (
                <button
                  onClick={() => {
                    props.follow(u.id);
                  }}
                >
                  Follow
                </button>
              ) : (
                <button
                  onClick={() => {
                    props.unfollow(u.id);
                  }}
                >
                  Unfollow
                </button>
              )}
            </div>
          </span>
          <span>
            <span>
              <div>{u.fullName}</div>
              <div>{u.status}</div>
            </span>
            <span>
              <div>{u.location.country}</div>
              <div>{u.location.city}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};
export default Users;
