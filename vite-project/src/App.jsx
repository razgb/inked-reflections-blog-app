import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootPage";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/contact",
        element: <></>,
      },
      {
        path: "/about",
        element: <></>,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
