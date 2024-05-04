import styles from "./UserProfileContainer.module.css";
import ReflectButton from "../../shared/ui/buttons/ReflectButton.jsx";
import InfiniteScrollContainer from "../../shared/ui/infinite-scroll-container/InfiniteScrollContainer.jsx";
import LazyLoadedImage from "../lazy-loaded-image/LazyLoadedImage.jsx";

import { fetchUserPosts } from "../../features/reflections/userPosts-collection-functions/fetchUserPosts.js";
import { useSelector } from "react-redux";
import { updateProfilePosts } from "../../entities/posts/posts-slice.js";
import Spinner from "../../shared/ui/spinner/Spinner.jsx";
import Button from "../../shared/ui/buttons/Button.jsx";

export default function UserProfileContainer() {
  const { profilePosts } = useSelector((state) => state.posts);
  const { info } = useSelector((state) => state.user);
  const {
    uid,
    photoURL: profilePhotoReference,
    displayName,
    dateAccountedCreated,
  } = info;

  if (!uid) {
    return (
      <div className={styles["profile__spinner"]}>
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <div className={styles["profile"]}>
      <div className={styles["profile__container"]}>
        <div className={styles["profile__section"]}>
          <div className={styles["profile__section-half-1"]}>
            <div className={styles["profile__image"]}>
              <LazyLoadedImage
                reference={profilePhotoReference}
                altText="User's profile photo."
                firebaseFolder="profile"
              />
            </div>

            <div className={styles["profile__info"]}>
              <p className={styles["profile__name"]}>{displayName}</p>
              <p className={styles["profile__created-at"]}>
                Signed up on {dateAccountedCreated}
              </p>
            </div>
          </div>

          <div className={styles["profile__section-half-2"]}>
            <Button buttonType="button">Edit profile</Button>
          </div>
        </div>

        <div className={styles["reflections__actions"]}>
          <div className={styles["half-1"]}>
            <h2 className={styles["profile__heading"]}>Your Reflections</h2>
          </div>

          <div className={styles["half-2"]}>
            <ReflectButton size={20}>Write a reflection</ReflectButton>
          </div>
        </div>

        {/* <SearchInput placeholder="Search your reflections" /> */}

        <div className={styles["posts"]}>
          {uid && (
            <InfiniteScrollContainer
              content={profilePosts}
              fn={async () => await fetchUserPosts(uid)}
              dispatchFn={updateProfilePosts}
              observerName="profile"
            />
          )}
        </div>
      </div>
    </div>
  );
}
