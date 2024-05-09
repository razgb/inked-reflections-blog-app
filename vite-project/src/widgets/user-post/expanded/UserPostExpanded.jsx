import styles from "./UserPostExpanded.module.css";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../../shared/util/formatDate";
import LazyLoadedImage from "../../lazy-loaded-image/LazyLoadedImage";
import { useEffect, useState } from "react";
import Spinner from "../../../shared/ui/spinner/Spinner";
import { changeCurrentPost } from "../../../entities/posts/posts-slice";
import { fetchSinglePost } from "../../../features/reflections/fetchSinglePost";
// import { activateAppError } from "../../../entities/app-error/app-error-slice";
import { useNavigate } from "react-router-dom";
import BookmarkButton from "../BookmarkButton";
import DeletePostButton from "../DeletePostButton";

import UserContentExpanded from "./UserContentExpanded";

/**
 * This component displays a single post in full, with all its content and comments.
 * If the post doesn't exist, it displays a spinner until the individual post
 * is fetched from firestore.
 * @returns {JSX.Element}
 */
export default function UserPostExpanded() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uid = useSelector((state) => state.user.info.uid);
  const loginState = useSelector((state) => state.user.info.loginState);
  const currentPost = useSelector((state) => state.posts.currentPost);
  const {
    id,
    displayName,
    createdAt,
    postContent,
    profilePhotoReference,
    minutesToRead,
    isBookmarked,
    isProfilePost,
    postArrayName,
  } = currentPost;

  const [noCurrentPost, setNoCurrentPost] = useState(
    displayName ? true : false
  );

  const coverPhotoReference =
    postContent?.[0]?.firebaseStorageReference ?? null;
  const title = postContent?.[1]?.value ?? null;

  useEffect(() => {
    if (noCurrentPost) return;

    const url = window.location.href;
    const urlAsArray = url.split("/");
    const postIdIndex = urlAsArray.indexOf("posts") + 1;
    const postId = urlAsArray[postIdIndex];

    const getSinglePost = async () => {
      try {
        const post = await fetchSinglePost(postId);
        dispatch(changeCurrentPost(post));
      } catch (error) {
        console.log(error);
      }
    };

    getSinglePost();
    setNoCurrentPost(false);
  }, [dispatch, noCurrentPost]);

  if (!displayName)
    return (
      <div className={styles["spinner-container"]}>
        <Spinner />
      </div>
    );

  if (!loginState) {
    navigate("/flow/login");
    return;
  }

  return (
    <article className={styles["post"]}>
      <div className={styles["post__container"]}>
        <div className={styles["author__container"]}>
          {profilePhotoReference && (
            <div className={styles["author__image-container"]}>
              <div className={styles["author__image"]}>
                <LazyLoadedImage
                  reference={profilePhotoReference}
                  firebaseFolder="profile"
                  altText="Reflection post's author profile picture"
                  spinnerSize="small"
                />
              </div>
            </div>
          )}

          <div className={styles["author__actions"]}>
            <a href="#" className={styles["author__link"]}>
              {displayName}
            </a>
          </div>
        </div>

        {coverPhotoReference && (
          <div className={styles["post-image-container"]}>
            <div className={styles["post-image"]}>
              <LazyLoadedImage
                reference={coverPhotoReference}
                firebaseFolder="posts"
                altText="Reflection cover photo"
                spinnerSize="large"
              />
            </div>
          </div>
        )}

        <div className={styles["post__header"]}>
          <h1 className={styles["post__title"]}>{title}</h1>

          <div className={styles["post__actions"]}>
            {/* postArrayName here is postFeed as we don't want to instantly
             delete the bookmark if the user goes back to the feed they 
             navigated from */}

            <BookmarkButton
              postId={id}
              isBookmarked={isBookmarked}
              postArrayName={postArrayName}
              size={22}
            />

            {isProfilePost && (
              <DeletePostButton postId={id} postUid={uid} size={22} />
            )}
          </div>
        </div>

        <div className={styles["post__info"]}>
          <span className={styles["post__minutes"]}>{minutesToRead}</span>
          <span className={styles["post__date-published"]}>
            {formatDate(createdAt)}
          </span>
        </div>

        <div className={styles["details"]}>
          <div className={styles["details__container"]}>
            <UserContentExpanded postContent={postContent} />
          </div>
        </div>

        <div className={styles["comments"]}>
          <div className={styles["comments__container"]}></div>
        </div>
      </div>
    </article>
  );
}
