import { createBrowserRouter } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";

const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "*",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  }
]);

export default routerConfig;
