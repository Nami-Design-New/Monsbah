import About from "./routes/About";
import AddAd from "./routes/AddAd";
import Notifcations from "./routes/Notifcations";
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
    path: "notifcations",
    element: <Notifcations />,
    protected: true,
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
