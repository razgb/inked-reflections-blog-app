import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { auth } from "./main.jsx";
import { onAuthStateChanged } from "firebase/auth";
import {
  addUserToState,
  removeUserFromState,
} from "./entities/user/user-slice.js";

import RootLayout from "./pages/root-page/RootPage.jsx";
import HomePage from "./pages/home-page/HomePage";
import PostDetails from "./pages/post-details-page/PostDetailsPage.jsx";
import BookmarksPage from "./pages/bookmarks-page/BookmarksPage.jsx";
import ExplorePage from "./pages/explore-page/ExplorePage.jsx";
import ErrorMessage from "./widgets/error-message/ErrorMessage.jsx";
import ProfilePage from "./pages/profile-page/ProfilePage.jsx";
import FlowPage from "./pages/flow-login-signup/FlowPage.jsx";
import LoginAccountUI from "./widgets/login-create-account/LoginAccountUI.jsx";
import CreateAccountUI from "./widgets/login-create-account/CreateAccountUI.jsx";
import ProfileUploadUI from "./widgets/login-create-account/ProfileUploadUI.jsx";
import EditUserProfilePage from "./pages/profile-page/EditUserProfilePage.jsx";
import CreateReflectionPage from "./pages/profile-page/CreateReflectionPage.jsx";

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
      {
        path: "userinfo",
        element: <ProfileUploadUI />,
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
        path: "reflect",
        element: <Navigate to="/reflect/create" />,
        children: [],
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
      // {
      //   path: "explore",
      //   element: <ExplorePage />,
      // },
      {
        path: "profile",
        children: [
          {
            index: true,
            element: <ProfilePage />,
          },
          {
            path: "edit",
            element: <EditUserProfilePage />,
          },
          {
            path: "reflect",
            element: <CreateReflectionPage />,
            children: [
              {
                // Shows user their post upon form completion and validation.
                path: "preview",
                element: <></>,
              },
              {
                path: "edit",
                element: <></>,
              },
            ],
          },
        ],
      },
      {
        path: "bookmarks",
        element: <BookmarksPage />,
      },
      {
        path: "info",
        element: <ErrorMessage />,
      },
    ],
  },
]);

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, emailVerified, displayName, photoURL } = user;
        const createdAt = Number(user.metadata.createdAt);

        const dateAccountedCreated =
          convertMillisTimestampToMonthAndYear(createdAt);

        dispatch(
          addUserToState({
            loginState: true,
            uid,
            email,
            emailVerified,
            displayName,
            photoURL,
            createdAt,
            dateAccountedCreated,
          })
        );
      } else {
        dispatch(removeUserFromState());
      }
    });

    return () => {
      unsubscribe();
    };
  });

  return <RouterProvider router={router} />;
}

function convertMillisTimestampToMonthAndYear(timestamp) {
  const date = new Date(timestamp); // 1710882620642
  return date.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
}
