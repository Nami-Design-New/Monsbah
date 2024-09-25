import Home from "./routes/Home";

const routerConfig = [
  {
    path: "/",
    element: <Home />
  },
  {
    path: "*",
    element: <Home />
  }
];

export default routerConfig;
