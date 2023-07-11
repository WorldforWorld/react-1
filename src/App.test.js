import ReactDOM from "react-dom";
import SamuraiJSApp from "./App";
test("renders learn react link", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SamuraiJSApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// import { createRoot } from 'react-dom/client';

// test('renders without crashing', () => {
//     const container = document.createElement('div');
//     const root = createRoot(container);
//     root.render(<SamuraiJSApp tab="home" />);
//     root.unmount();
//   });
