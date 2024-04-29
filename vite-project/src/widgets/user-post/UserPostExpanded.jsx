import styles from "./UserPostExpanded.module.css";
import { useSelector } from "react-redux";
import { formatDate } from "../../shared/util/formatDate";
import LazyLoadedImage from "../lazy-loaded-image/LazyLoadedImage";
import PostQuote from "./PostQuote";

export default function UserPostExpanded() {
  const { displayName, createdAt, postContent, profilePhotoReference } =
    useSelector((state) => state.posts.currentPost);
  const coverPhotoReference = postContent[0].firebaseStorageReference;
  const title = postContent[1].value;

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

        <header className={styles["post__header"]}>
          <h1 className={styles["post__title"]}>{title}</h1>
        </header>

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
            <span className={styles["post__minutes"]}>7-min read</span>
            <span className={styles["date-published"]}>
              {formatDate(createdAt)}
            </span>
          </div>
        </div>

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
