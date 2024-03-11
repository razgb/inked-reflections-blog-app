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

const router = createBrowserRouter([
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
        path: "profile",
        element: <></>,
      },
      {
        path: "reflections",
        element: <></>,
      },
      {
        path: "bookmarks",
        element: <BookmarksPage />,
      },
      {
        path: "settings",
        element: <></>,
      },
      {
        path: "help",
        element: <></>,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
