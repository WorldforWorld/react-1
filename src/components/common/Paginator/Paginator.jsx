import styles from "./Paginator.module.css";
const Paginator = props => {
  const pagesCount = Math.ceil(props.totalUserCount / props.pageSize);
  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    if (pages.length < props.pageSize * 5) {
      pages.push(i);
    }
  }
  return (
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
  );
};
export default Paginator;
