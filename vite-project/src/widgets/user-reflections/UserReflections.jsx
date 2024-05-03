import styles from "./UserReflections.module.css";
import ReflectButton from "../../shared/ui/buttons/ReflectButton.jsx";
import SearchInput from "../../shared/ui/search-input/SearchInput.jsx";
// import Select from "../../shared/ui/select-element/Select.jsx";

import { fetchUserPosts } from "../../features/reflections/userPosts-collection-functions/fetchUserPosts.js";
import { useSelector } from "react-redux";

import { addPostsToUserSlicePosts } from "../../entities/user/user-slice.js";
import InfiniteScrollContainer from "../../shared/ui/infinite-scroll-container/InfiniteScrollContainer.jsx";

export default function UserReflections() {
  const { info, posts } = useSelector((state) => state.user);
  const uid = info.uid;

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

        <SearchInput placeholder="Search your reflections" />

        <div className={styles["posts"]}>
          {uid && (
            <InfiniteScrollContainer
              content={posts}
              fn={async () => await fetchUserPosts(uid)}
              dispatchFn={addPostsToUserSlicePosts}
            />
          )}
        </div>
      </div>
    </div>
  );
}
