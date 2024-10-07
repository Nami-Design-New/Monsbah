import About from "./routes/About";
import AddAd from "./routes/AddAd";
import AltProfile from "./routes/AltProfile";
import Contact from "./routes/Contact";
import ErrorPage from "./routes/ErrorPage";
import Home from "./routes/Home";
import ProductDetails from "./routes/ProductDetails";
import Profile from "./routes/Profile";
import Search from "./routes/Search";
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
    path: "search",
    element: <Search />,
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
    path: "profile/*",
    element: <Profile />,
  },
  {
    path: "alt-profile/*",
    element: <AltProfile />,
  },
  {
    path: "verification",
    element: <Verification />,
  },
  {
    path: "add-ad",
    element: <AddAd />,
  },
  {
    path: "product/:id",
    element: <ProductDetails />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];

export default routerConfig;
