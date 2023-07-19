import preloader from "../../../assets/images/loading-3.gif";

const Preloader: React.FC = () => {
  return (
    <div style={{ backgroundColor: "white" }}>
      <img width="200" height="200" src={preloader} alt="pre" />
    </div>
  );
};
export default Preloader;
