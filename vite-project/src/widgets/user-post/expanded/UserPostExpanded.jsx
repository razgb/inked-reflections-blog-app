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
import BookmarkButton from "../action-components/BookmarkButton";
import DeletePostButton from "../action-components/DeletePostButton";

import UserContentExpanded from "./UserContentExpanded";
import AuthorContainer from "./sub-components/AuthorContainer";
import PostHeader from "./sub-components/PostHeader";
import PostImageContainer from "./sub-components/PostImageContainer";
import PostInfo from "./sub-components/PostInfo";

/**
 * This component displays a single post in full, with all its content and comments.
 * If the user refreshed the page while on this component, it displays a spinner until
 * the individual post is fetched from firestore.
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
        <AuthorContainer
          profilePhotoReference={profilePhotoReference}
          displayName={displayName}
        />

        {coverPhotoReference && (
          <PostImageContainer coverPhotoReference={coverPhotoReference} />
        )}

        <PostHeader
          title={title}
          id={id}
          isBookmarked={isBookmarked}
          postArrayName={postArrayName}
          isProfilePost={isProfilePost}
          uid={uid}
        />

        <PostInfo minutesToRead={minutesToRead} createdAt={createdAt} />

        <div className={styles["details"]}>
          <UserContentExpanded postContent={postContent} />
        </div>
      </div>
    </article>
  );
}

{
  /* <div className={styles["comments"]}>
  <div className={styles["comments__container"]}></div>
</div> */
}
