import Aboutus from "./routes/Aboutus";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
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
    path: "terms-and-conditions",
    element: <Terms />,
  },
  {
    path: "Profile",
    element: <Profile />,
  },
];

export default routerConfig;
