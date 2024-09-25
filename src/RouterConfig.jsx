import Home from "./routes/Home";
import Login from "./routes/Login";

const routerConfig = [
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
];

export default routerConfig;
