import styles from "./UserReflections.module.css";
import SearchInput from "../../shared/ui/search-input/SearchInput.jsx";
import ReflectButton from "../../shared/ui/buttons/ReflectButton.jsx";

import { useEffect } from "react";
import { fetchUserPosts } from "../../features/reflections/userPosts-collection-functions/fetchUserPosts.js";
import { useDispatch, useSelector } from "react-redux";

import { activateAppError } from "../../entities/app-error/app-error-slice.js";
import { addPostsToUserSlicePosts } from "../../entities/user/user-slice.js";

// This takes too long to code and i'm not in the mood.
// import Select from "../../shared/ui/select-element/Select.jsx";

let initialFetch = true; // Used to fetch posts before a intersection observer.
export default function UserReflections() {
  const dispatch = useDispatch();
  const { info, posts } = useSelector((state) => state.user);
  const uid = info.uid;
  // console.log("User's posts:", posts);

  useEffect(() => {
    if (!uid || !initialFetch) return;

    const getUserPosts = async () => {
      initialFetch = false;
      return await fetchUserPosts(uid);
    };

    getUserPosts()
      .then((returnObj) => dispatch(addPostsToUserSlicePosts(returnObj.posts)))
      .catch((error) => {
        activateAppError(
          error.title || "Error loading posts",
          error.message || "Please try again in a couple minutes."
        );
      });
  });

  return (
    <div className={styles["reflections"]}>
      <div className={styles["reflections__container"]}>
        <div className={styles["reflections__actions"]}>
          <div className={styles["half-1"]}>
            <h2 className={styles["heading"]}>Your Reflections</h2>
            {/* <Select /> */}
          </div>
          <div className={styles["half-2"]}>
            <ReflectButton size={20}>Write a reflection</ReflectButton>
          </div>
        </div>

        {/* mini client side search function */}
        <SearchInput placeholder="Search your reflections" />

        <div className={styles["posts"]}></div>
      </div>
    </div>
  );
}
