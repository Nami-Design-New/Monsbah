import About from "./routes/About";
import AddAd from "./routes/AddAd";
import Chats from "./routes/Chats";
import Contact from "./routes/Contact";
import ErrorPage from "./routes/ErrorPage";
import Home from "./routes/Home";
import ProductDetails from "./routes/ProductDetails";
import Profile from "./routes/Profile";
import Search from "./routes/Search";
import Terms from "./routes/Terms";
import Verification from "./routes/Verification";
import UserProfile from "./routes/UserProfile";
import Categories from "./routes/Categories";
import CountryAsks from "./routes/CountryAsks";
import Followers from "./routes/Followers";

const router = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "categories",
    element: <Categories />,
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
    path: "asks",
    element: <CountryAsks />,
  },
  {
    path: "search/*",
    element: <Search />,
  },
  {
    path: "followers/*",
    element: <Followers />,
    protected: true,
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
    path: "profile",
    element: <Profile />,
    protected: true,
  },
  {
    path: "profile/:id",
    element: <UserProfile />,
  },

  {
    path: "verification",
    element: <Verification />,
    protected: true,
  },
  {
    path: "add-ad",
    element: <AddAd />,
    protected: true,
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

export default router;
