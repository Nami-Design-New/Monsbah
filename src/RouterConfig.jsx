import About from "./routes/About";
import AddAdvertisement from "./routes/addAdvertisement";
import Contact from "./routes/Contact";
import ErrorPage from "./routes/ErrorPage";
import Home from "./routes/Home";
import ProductDetails from "./routes/ProductDetails";
import Profile from "./routes/Profile";
import Terms from "./routes/Terms";
import Verification from "./routes/Verification";

const routerConfig = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "about-us",
    element: <About />,
  },
  {
    path: "contact-us",
    element: <Contact />,
  },
  {
    path: "terms-and-conditions",
    element: <Terms />,
  },
  {
    path: "Profile",
    element: <Profile />,
  },
  {
    path: "verification",
    element: <Verification />,
  },
  {
    path: "/product/:id",
    element: <ProductDetails />,
  },
  {
    path: "/add-ad",
    element: <AddAdvertisement />,
  },
  {
    path: "/add-ad/:id",
    element: <AddAdvertisement />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];

export default routerConfig;
