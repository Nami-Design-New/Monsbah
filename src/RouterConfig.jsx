import About from "./routes/About";
import Chats from "./routes/Chats";
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
    path: "chats",
    element: <Chats />,
    protected: true,
  },
  {
    path: "search/*",
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
    path: "Profile/*",
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
    path: "*",
    element: <ErrorPage />,
  },
];

export default routerConfig;
