import styles from "./UserPostExpanded.module.css";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../shared/util/formatDate";
import LazyLoadedImage from "../lazy-loaded-image/LazyLoadedImage";
import PostQuote from "./PostQuote";
import { useEffect, useState } from "react";
import Spinner from "../../shared/ui/spinner/Spinner";
import { changeCurrentPost } from "../../entities/posts/posts-slice";
import { fetchSinglePost } from "../../features/reflections/fetchSinglePost";
import { activateAppError } from "../../entities/app-error/app-error-slice";
import { useLocation, useNavigate } from "react-router-dom";

export default function UserPostExpanded() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginState = useSelector((state) => state.user.info.loginState);
  const currentPost = useSelector((state) => state.posts.currentPost);
  const {
    displayName,
    createdAt,
    postContent,
    profilePhotoReference,
    minutesToRead,
  } = currentPost;

  const [noCurrentPost, setNoCurrentPost] = useState(
    displayName ? false : true
  );

  const coverPhotoReference =
    postContent?.[0]?.firebaseStorageReference ?? null;
  const title = postContent?.[1]?.value ?? null;

  useEffect(() => {
    if (!noCurrentPost) return;

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

        <div className={styles["author"]}>
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

            <div className={styles["author__details"]}>
              <div className={styles["author__actions"]}>
                <a href="#" className={styles["author__link"]}>
                  {displayName}
                </a>
              </div>
            </div>
            <span className={styles["post__minutes"]}>{minutesToRead}</span>
            <span className={styles["date-published"]}>
              {formatDate(createdAt)}
            </span>
          </div>
        </div>

        <h1 className={styles["post__title"]}>{title}</h1>

        <div className={styles["details"]}>
          <div className={styles["details__container"]}>
            {postContent.map((widget) => {
              const { component, id } = widget;
              if (id === "cover-image") {
                return null;
              } else if (component === "paragraph") {
                return (
                  <p key={id} className={styles["details__text"]}>
                    {widget.value}
                  </p>
                );
              } else if (component === "quote") {
                return <PostQuote key={widget.id}>{widget.value}</PostQuote>;
              } else if (component === "image") {
                return (
                  <div key={id} className={styles["post-image"]}>
                    <LazyLoadedImage
                      reference={widget.firebaseStorageReference}
                      firebaseFolder="posts"
                      altText="post image"
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>

        <div className={styles["comments"]}>
          <div className={styles["comments__container"]}></div>
        </div>
      </div>
    </article>
  );
}
