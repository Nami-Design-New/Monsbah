import { createBrowserRouter } from "react-router-dom";
import About from "../routes/About";
import AddAd from "../routes/AddAd";
import AddCompanyProduct from "../routes/AddCompanyProduct";
import BlogDetails from "../routes/BlogDetails";
import BLogs from "../routes/BLogs";
import Categories from "../routes/Categories";
import Chats from "../routes/Chats";
import Companies from "../routes/Companies";
import CompanyAccount from "../routes/CompanyAccount";
import CompanyCategories from "../routes/CompanyCategories";
import CompanyProfile from "../routes/CompanyProfile";
import Contact from "../routes/Contact";
import CountryAsks from "../routes/CountryAsks";
import EditCompanyProfile from "../routes/EditCompanyProfile";
import ErrorPage from "../routes/ErrorPage";
import Followers from "../routes/Followers";
import Home from "../routes/Home";
import ProductDetails from "../routes/ProductDetails";
import Profile from "../routes/Profile";
import Search from "../routes/Search";
import Terms from "../routes/Terms";
import UserProfile from "../routes/UserProfile";
import Verification from "../routes/Verification";
import RootLayout from "./../ui/Layout/RootLayout";
import ProtectionProvider from "./ProtectionProvider";
import CompaniesNotification from "./../routes/CompaniesNotification";
import CompanyFavourites from "../routes/CompanyFavourites";
import CompanyVerification from "../routes/CompanyVerification";

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
        path: "sections",
        element: <CompanyCategories />,
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
        path: "company-notification",
        element: (
          <ProtectionProvider>
            <CompaniesNotification />
          </ProtectionProvider>
        ),
      },

      {
        path: "company-verification",
        element: (
          <ProtectionProvider>
            <CompanyVerification />
          </ProtectionProvider>
        ),
      },

      {
        path: "company-favorites",
        element: (
          <ProtectionProvider>
            <CompanyFavourites />
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
