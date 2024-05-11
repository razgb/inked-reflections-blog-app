import styles from "./UserPostExpanded.module.css";
import Spinner from "../../../shared/ui/spinner/Spinner";
import UserContentExpanded from "./UserContentExpanded";
import AuthorContainer from "./sub-components/AuthorContainer";
import PostHeader from "./sub-components/PostHeader";
import PostImageContainer from "./sub-components/PostImageContainer";
import PostInfo from "./sub-components/PostInfo";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { fetchSinglePost } from "../../../features/reflections/fetchSinglePost";
import { changeCurrentPost } from "../../../entities/current-post/currentPostSlice.js";

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
  const currentPost = useSelector((state) => state.currentPost);

  //prettier-ignore
  const {
    id, displayName, createdAt, postContent, profilePhotoReference,
    minutesToRead,isBookmarked, isProfilePost, parentArrayName 
  } = currentPost;

  const title = postContent?.[1]?.value ?? null;
  const coverPhotoReference =
    postContent?.[0]?.firebaseStorageReference ?? null;

  const [noCurrentPost, setNoCurrentPost] = useState(
    displayName ? true : false
  );

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
  }, [dispatch, noCurrentPost, parentArrayName]);

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
          parentArrayName={parentArrayName}
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
  /* 
  one day

  <div className={styles["comments"]}>
  <div className={styles["comments__container"]}></div>
  </div>
  */
}
