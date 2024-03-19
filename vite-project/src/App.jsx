import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./pages/root-page/RootPage.jsx";
import HomePage from "./pages/home-page/HomePage";
import PostDetails from "./pages/post-details-page/PostDetailsPage.jsx";
import BookmarksPage from "./pages/bookmarks-page/BookmarksPage.jsx";
import ExplorePage from "./pages/explore-page/ExplorePage.jsx";
import ErrorMessage from "./widgets/error-message/ErrorMessage.jsx";
import ReflectionsPage from "./pages/reflections/ReflectionsPage.jsx";
import FlowPage from "./pages/flow-login-signup/FlowPage.jsx";
import LoginAccountUI from "./widgets/login-create-account/LoginAccountUI.jsx";
import CreateAccountUI from "./widgets/login-create-account/CreateAccountUI.jsx";

const router = createBrowserRouter([
  {
    path: "/flow",
    element: <FlowPage />,
    errorElement: <ErrorMessage />,
    children: [
      {
        index: true,
        element: <Navigate to="/flow/login" />,
      },
      {
        path: "login",
        element: <LoginAccountUI />,
      },
      {
        path: "signup",
        element: <CreateAccountUI />,
      },
    ],
  },
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorMessage />,
    children: [
      {
        index: true,
        element: <Navigate to="/posts" />,
      },
      {
        path: "posts",
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: ":postId",
            element: <PostDetails />,
          },
        ],
      },
      {
        path: "explore",
        element: <ExplorePage />,
      },
      {
        path: "reflections",
        element: <ReflectionsPage />,
      },
      {
        path: "bookmarks",
        element: <BookmarksPage />,
      },
      {
        path: "profile",
        element: <ErrorMessage />,
      },
      {
        path: "settings",
        element: <ErrorMessage />,
      },
      {
        path: "help",
        element: <ErrorMessage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
