import { createBrowserRouter } from "react-router-dom";
import About from "../routes/About";
import AddAd from "../routes/AddAd";
import Chats from "../routes/Chats";
import Home from "../routes/Home";
import Terms from "../routes/Terms";
import BLogs from "../routes/BLogs";
import Search from "../routes/Search";
import Contact from "../routes/Contact";
import Profile from "../routes/Profile";
import Companies from "../routes/Companies";
import ErrorPage from "../routes/ErrorPage";
import Followers from "../routes/Followers";
import Categories from "../routes/Categories";
import BlogDetails from "../routes/BlogDetails";
import UserProfile from "../routes/UserProfile";
import CountryAsks from "../routes/CountryAsks";
import Verification from "../routes/Verification";
import RootLayout from "./../ui/Layout/RootLayout";
import ProductDetails from "../routes/ProductDetails";
import ProtectionProvider from "./ProtectionProvider";
import CompanyProfile from "../routes/CompanyProfile";
import CompanyAccount from "../routes/CompanyAccount";
import AddCompanyProduct from "../routes/AddCompanyProduct";
import EditCompanyProfile from "../routes/EditCompanyProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
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
        element: (
          <ProtectionProvider>
            <Chats />
          </ProtectionProvider>
        ),
      },

      {
        path: "blogs",
        children: [
          { index: true, element: <BLogs /> },
          {
            path: ":id",
            element: <BlogDetails />,
          },
        ],
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
        element: (
          <ProtectionProvider>
            <Followers />
          </ProtectionProvider>
        ),
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
        path: "add-company-product",
        element: (
          <ProtectionProvider>
            <AddCompanyProduct />
          </ProtectionProvider>
        ),
      },
      {
        path: "edit-product/:id",
        element: (
          <ProtectionProvider>
            <AddCompanyProduct />
          </ProtectionProvider>
        ),
      },

      {
        path: "edit-company-profile",
        element: (
          <ProtectionProvider>
            <EditCompanyProfile />
          </ProtectionProvider>
        ),
      },

      {
        path: "profile",
        children: [
          {
            index: true,
            element: (
              <ProtectionProvider>
                <Profile />
              </ProtectionProvider>
            ),
          },
          {
            path: ":id",
            element: <UserProfile />,
          },
        ],
      },

      {
        path: "company-profile",
        element: (
          <ProtectionProvider>
            <CompanyAccount />
          </ProtectionProvider>
        ),
      },

      {
        path: "verification",
        element: (
          <ProtectionProvider>
            <Verification />
          </ProtectionProvider>
        ),
      },

      {
        path: "add-ad",
        element: (
          <ProtectionProvider>
            <AddAd />
          </ProtectionProvider>
        ),
      },

      {
        path: "product/:id",
        element: <ProductDetails />,
      },

      {
        path: "companies",
        children: [
          {
            index: true,
            element: <Companies />,
          },
          {
            path: ":id",
            element: <CompanyProfile />,
          },
        ],
      },
    ],
  },
]);
