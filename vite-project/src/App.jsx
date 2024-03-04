import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./pages/root-page/RootPage.jsx";
import HomePage from "./pages/home-page/HomePage";
import PostDetails from "./pages/post-details/PostDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
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
        element: <></>,
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
        element: <></>,
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
