import styles from "./UserPostExpanded.module.css";
import PostQuote from "./sub-components/PostQuote.jsx";
import LazyLoadedImage from "../../lazy-loaded-image/LazyLoadedImage.jsx";

export default function UserContentExpanded({ postContent }) {
  return (
    <div className={styles["details__container"]}>
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
  );
}
