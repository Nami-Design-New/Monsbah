import Aboutus from "./routes/Aboutus";
import Home from "./routes/Home";
import Terms from "./routes/Terms";

const routerConfig = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: <Home />,
  },
  {
    path: "about-us",
    element: <Aboutus />,
  },
  {
    path: "terms",
    element: <Terms />,
  },
];

export default routerConfig;
