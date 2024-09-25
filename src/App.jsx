import { RouterProvider } from "react-router-dom";
import Footer from "./ui/Layout/Footer";
import Header from "./ui/Layout/Header";
import routerConfig from "./RouterConfig";

function App() {
  return (
    <>
      <Header />
      <RouterProvider router={routerConfig} />
      <Footer />
    </>
  );
}

export default App;
