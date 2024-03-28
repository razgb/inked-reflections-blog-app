import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
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
import ReflectionsPage from "./pages/reflections/ReflectionsPage.jsx";
import FlowPage from "./pages/flow-login-signup/FlowPage.jsx";
import LoginAccountUI from "./widgets/login-create-account/LoginAccountUI.jsx";
import CreateAccountUI from "./widgets/login-create-account/CreateAccountUI.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProfilePage from "./pages/profile-page/ProfilePage.jsx";
import ProfileUploadUI from "./widgets/login-create-account/ProfileUploadUI.jsx";

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
        element: <ProfilePage />,
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
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          addUserToState({
            loginState: true,
            uid: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            displayName: user.displayName,
            photoURL: user.photoURL,
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

/*

- Added locationSlice for application wide url pathname tracking
dquote> - Completely redesigned Menu.jsx to be more lean and readable (uses locationSlice redux state)
dquote> - Changed Menu and MainNav structure to support modals.        
dquote> - Added application wide error state messages (e.g. network issues) in errorSlice.js
dquote> - Added beta support for dark theme (not available throught UI yet) 
dquote> - Fixed a lot of CSS issues regarding the color property (some elements simply inherited color)  
dquote> - Added onAuthStateChanged observer to App.jsx that also dispatches redux action functions"   

*/
