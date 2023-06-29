import preloader from "../../../assets/images/loading-3.gif";
const Preloader = props => {
  return (
    <div style={{ backgroundColor: "white" }}>
      <img width="200" height="200" src={preloader} alt="pre" />
    </div>
  );
};
export default Preloader;
