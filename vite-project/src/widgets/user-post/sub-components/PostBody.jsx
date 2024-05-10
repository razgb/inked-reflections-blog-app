import styles from "../UserPost.module.css";
import LazyLoadedImage from "../../../widgets/lazy-loaded-image/LazyLoadedImage";

export default function PostBody({
  title,
  abstractParagraph,
  coverPhotoReference,
}) {
  return (
    <div className={styles["post__body"]}>
      <div className={styles["post__details"]}>
        <div className={styles["post__text"]}>
          <h3 className={styles["post__title"]}>{title}</h3>
          <p className={styles["post__abstract"]}>
            {formatAbstractParagraph(abstractParagraph)}
          </p>
        </div>

        {coverPhotoReference && (
          <div className={styles["post__image-wrapper"]}>
            <div className={styles["post__image-container"]}>
              <LazyLoadedImage
                reference={coverPhotoReference}
                altText={`Post cover photo for title: ${title}`}
                firebaseFolder="posts"
                spinnerSize="large"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Formats the first paragraph of the post as an abstract by showing the first 30 words with an ending trail of '...'
 * @param {string} paragraph
 * @returns {string} formated paragraph
 */
function formatAbstractParagraph(paragraph) {
  const length = paragraph.split("").length;
  if (length <= 180) return paragraph + "...";
  else {
    const abstractArray = paragraph.split(" ").splice(0, 30);
    const lastWord = abstractArray.pop().trim();
    abstractArray.push(lastWord);
    return abstractArray.join(" ") + "...";
  }
}
