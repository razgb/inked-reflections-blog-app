import styles from "./UserPost.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ActionDotsIcon, BookmarksIcon } from "../../shared/ui/svg/PostSvg";
import { changeCurrentPost } from "../../entities/posts/posts-slice";
import { useDispatch } from "react-redux";
import { formatDate } from "../../shared/util/formatDate";
import useImageURL from "../../shared/hooks/useImageURL";

import Spinner from "../../shared/ui/spinner/Spinner";
import { fetchImages } from "../../shared/util/fetchImages";
import { useEffect } from "react";

export default function UserPost({
  id,
  displayName,
  createdAt,
  postContent,
  profilePhotoURL: profilePhotoReference,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { imageURL: profileImageURL, loading: profileLoading } = useImageURL(
    "profile",
    profilePhotoReference
  );
  const coverPhotoReference = postContent[0].firebaseStorageReference;
  const { imageURL: coverImageURL, loading: coverLoading } = useImageURL(
    "posts",
    coverPhotoReference
  );

  function handlePostClick(event) {
    if (event.target.tagName === "A") return;
    dispatch(
      changeCurrentPost({
        id,
        displayName,
        createdAt,
        postContent,
        profileImageURL,
        coverPhotoReference,
      })
    );
    navigate(`/posts/${id}`);
  }

  // Needs fine tuning.
  function formatAbstractParagraph(p) {
    const length = p.split("").length;
    if (length <= 240) return p;
    else {
      return p.split("").splice(0, 180).join("") + "...";
    }
  }

  const title = postContent[1].value;
  const abstractParagraph = postContent[2].value;

  return (
    <div onClick={handlePostClick} className={styles["user-post"]}>
      <div className={styles["post__container"]}>
        <div className={styles["post__row--1"]}>
          <Link to="123">
            {profileLoading ? (
              <Spinner size="small" />
            ) : (
              <img
                className={styles["post__author-img"]}
                src={profileImageURL}
                alt="Profile pic of author"
              />
            )}
          </Link>

          <h3 className={styles["post__author-name"]}>
            {/* Change to author's page. */}
            <Link to="/" className={styles["post__author-link"]}>
              {displayName}
            </Link>
          </h3>

          <span className={styles["post__author-date"]}>
            {formatDate(createdAt)}
          </span>

          {/* <span className={styles["bot"]}>{email ? null : "BOT"}</span> */}
        </div>

        <div className={styles["post__row--2"]}>
          <div className={styles["post__link"]}>
            <div className={styles["post__link-half--1"]}>
              <h3 className={styles["post__title"]}>{title}</h3>
              <p className={styles["post__abstract"]}>
                {formatAbstractParagraph(abstractParagraph)}
              </p>
            </div>

            <div className={styles["post__link-half--2"]}>
              {coverLoading ? (
                <Spinner size="small" />
              ) : (
                <img
                  className={styles["post__img"]}
                  src={coverImageURL}
                  alt="Post thumbnail"
                />
              )}
            </div>
          </div>
        </div>

        <div className={styles["post__row--3"]}>
          {/* Thinking of using useMemo for minutes calculation function in the future. */}
          <span className={styles["post__minutes"]}>7 min read</span>

          <button className={styles["post__action-button"]}>
            <span className={styles["post__icon-holder"]}>
              <BookmarksIcon size={16} />
            </span>
          </button>

          <button className={styles["post__action-button"]}>
            <span className={styles["post__icon-holder"]}>
              <ActionDotsIcon size={16} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

/*
  // console.log({
  //   id,
  //   displayName,
  //   createdAt,
  //   postContent,
  //   profilePhotoURL,
  // });
*/
