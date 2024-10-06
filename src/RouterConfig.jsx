import About from "./routes/About";
import Contact from "./routes/Contact";
import ErrorPage from "./routes/ErrorPage";
import Home from "./routes/Home";
import ProductDetails from "./routes/ProductDetails";
import Profile from "./routes/Profile";
import Terms from "./routes/Terms";

const routerConfig = [
  {
    path: "/",
    element: <Home />
  },
  {
    path: "about-us",
    element: <About />
  },
  {
    path: "contact-us",
    element: <Contact />
  },
  {
    path: "terms-and-conditions",
    element: <Terms />
  },
  {
    path: "Profile",
    element: <Profile />
  },
  {
    path: "/product/:id",
    element: <ProductDetails />
  },
  {
    path: "*",
    element: <ErrorPage />
  }
];

export default routerConfig;
