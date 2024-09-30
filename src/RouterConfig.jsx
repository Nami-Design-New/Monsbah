import Home from "./routes/Home";
import Verification from "./routes/Verification";

const routerConfig = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/verification",
    element: <Verification />,
  },
  {
    path: "*",
    element: <Home />,
  },
];

export default routerConfig;
