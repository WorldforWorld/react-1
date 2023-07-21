import ReactDOM from "react-dom/client";
import SamuraiJSApp from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const rootElement =
  document.getElementById("root") ?? document.createElement("div");
const root = ReactDOM.createRoot(rootElement);
root.render(<SamuraiJSApp />);

reportWebVitals();
