import Dashpoard from "./components/profile/Dashpoard";
import MyOrder from "./components/profile/MyOrder";
import Aboutus from "./routes/Aboutus";
import ErrorPage from "./routes/ErrorPage";
import Home from "./routes/Home";
import ProductDetails from "./routes/ProductDetails";
import Profile from "./routes/Profile";
import Terms from "./routes/Terms";

const routerConfig = [
  {
    path: "/",
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
