import styles from "./UserPost.module.css";
import PostHeader from "./sub-components/PostHeader.jsx";
import PostBody from "./sub-components/PostBody.jsx";
import PostFooter from "./sub-components/PostFooter.jsx";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeCurrentPost } from "../../entities/current-post/currentPostSlice.js";

export default function UserPost({ parentArrayName, ...post }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, postContent, readingTime, isBookmarked } = post;

  const isProfilePost = parentArrayName === "profileFeed";
  const coverPhotoReference = postContent[0].firebaseStorageReference;
  const title = postContent[1].value;
  const abstractParagraph = postContent[2].value;

  const postWithExtraData = {
    ...post,
    isBookmarked,
    isProfilePost,
    parentArrayName,
    coverPhotoReference,
    title,
    abstractParagraph,
    readingTime,
  };

  function handlePostClick(event) {
    event.preventDefault();
    const tagName = event.target.tagName.toLowerCase();
    const ignoreElements = ["button", "span", "rect", "a", "svg", "path"];
    if (ignoreElements.includes(tagName)) return;

    dispatch(
      changeCurrentPost({
        ...post,
        isBookmarked,
        readingTime,
        parentArrayName,
        isProfilePost,
      })
    );

    navigate(`/posts/${id}`);
  }

  return (
    <div onClick={handlePostClick} className={styles["post__wrapper"]}>
      <div className={styles["post__content"]}>
        <PostHeader post={postWithExtraData} />
        <PostBody post={postWithExtraData} />
        <PostFooter post={postWithExtraData} />
      </div>
    </div>
  );
}
