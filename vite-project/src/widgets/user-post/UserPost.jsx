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
  const {
    id,
    postUid,
    displayName,
    createdAt,
    postContent,
    profilePhotoReference,
    readingTime,
    isBookmarked,
  } = post;

  const isProfilePost = parentArrayName === "profileFeed";
  const coverPhotoReference = postContent[0].firebaseStorageReference;
  const title = postContent[1].value;
  const abstractParagraph = postContent[2].value;
  const minutesToRead = `${readingTime}-min read`;

  function handlePostClick(event) {
    event.preventDefault();
    const tagName = event.target.tagName.toLowerCase();
    const ignoreElements = ["button", "span", "rect", "a", "svg", "path"];
    if (ignoreElements.includes(tagName)) return;

    dispatch(
      changeCurrentPost({
        id,
        ...post,
      })
    );
    navigate(`/posts/${id}`);
  }

  return (
    <div onClick={handlePostClick} className={styles["post__wrapper"]}>
      <div className={styles["post__content"]}>
        <PostHeader
          profilePhotoReference={profilePhotoReference}
          displayName={displayName}
          createdAt={createdAt}
        />

        <PostBody
          title={title}
          abstractParagraph={abstractParagraph}
          coverPhotoReference={coverPhotoReference}
        />

        <PostFooter
          minutesToRead={minutesToRead}
          id={id}
          isBookmarked={isBookmarked}
          parentArrayName={parentArrayName}
          isProfilePost={isProfilePost}
          postUid={postUid}
        />
      </div>
    </div>
  );
}
