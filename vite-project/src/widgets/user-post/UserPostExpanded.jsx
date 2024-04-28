import styles from "./UserPostExpanded.module.css";
import { useSelector } from "react-redux";
import { formatDate } from "../../shared/util/formatDate";
import Button from "../../shared/ui/buttons/Button";
import Spinner from "../../shared/ui/spinner/Spinner";
import { useState } from "react";

export default function UserPostExpanded() {
  const {
    id,
    displayName,
    createdAt,
    postContent,
    profilePhotoURL,
    coverPhotoURL,
  } = useSelector((state) => state.posts.currentPost);

  const title = postContent[1].value;
  const [content, setContent] = useState(null);

  return (
    <article className={styles["post"]}>
      <div className={styles["post__container"]}>
        <div className={styles["cover-image-container"]}>
          <img
            className={styles["cover-image"]}
            src={coverPhotoURL}
            alt="Image representing user post title..."
          />
        </div>

        <header className={styles["post__header"]}>
          <h1 className={styles["post__title"]}>{title}</h1>

          {/* <div className={styles["author__tags"]}>
            {currentPost.tags &&
              currentPost.tags.map((tag, index) => (
                <span key={index} className={styles["author__tag"]}>
                  {tag}
                </span>
              ))}
          </div> */}
        </header>

        <div className={styles["author"]}>
          <div className={styles["author__container"]}>
            <div className={styles["author__image-container"]}>
              <img
                src={profilePhotoURL}
                alt="Default profile img"
                className={styles["author__image"]}
              />
            </div>
            <div className={styles["author__details"]}>
              <div className={styles["author__actions"]}>
                <a href="#" className={styles["author__link"]}>
                  {displayName}
                </a>
                {/* <button className={styles["author__follow"]}>Follow</button> */}
                <Button>Follow</Button>
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
            {/* {currentPost.paragraphs.map((p, index) => (
              <p key={index} className={styles["details__text"]}>
                {p}
              </p>
            ))} */}
            {content}
          </div>
        </div>

        <div className={styles["comments"]}>
          <div className={styles["comments__container"]}></div>
        </div>
      </div>
    </article>
  );
}

/**
 * Will receive paragraphs in an array of paragraphs.
 *
 * 
 * <article className={styles["post"]}>
      <div className={styles["post__container"]}>
        <div className={styles["cover-image-container"]}>
          <img
            className={styles["cover-image"]}
            src={postImage}
            alt="Image representing user post title..."
          />
        </div>

        <header className={styles["post__header"]}>
          <h1 className={styles["post__title"]}>
            Principles of the DRY {`(Don't Repeat Yourself)`} rule
          </h1>
          <div className={styles["author__tags"]}>
            <span className={styles["author__tag"]}>Software</span>
            <span className={styles["author__tag"]}>Tips & Tricks</span>
            <span className={styles["author__tag"]}>Web Dev</span>
          </div>
        </header>

        <div className={styles["author"]}>
          <div className={styles["author__container"]}>
            <div className={styles["author__image-container"]}>
              <img
                src={defaultProfile}
                alt="Default profile img"
                className={styles["author__image"]}
              />
            </div>
            <div className={styles["author__details"]}>
              <div className={styles["author__actions"]}>
                <a href="#" className={styles["author__link"]}>
                  Dilan Farman
                </a>
                <button className={styles["author__follow"]}>Follow</button>
              </div>
            </div>
            <span className={styles["post__minutes"]}>7-min read</span>
            <span className={styles["date-published"]}>10/07/2024</span>
          </div>
        </div>

        <div className={styles["details"]}>
          <div className={styles["details__container"]}>
            <p className={styles["details__paragraph"]}>
              The DRY principle, which stands for "Don't Repeat Yourself," is a
              cornerstone of efficient software development. It advocates for
              eliminating redundancy in your codebase, preventing the
              replication of functionality across different parts of your
              application. Repetitive code poses a multitude of challenges:
              increased maintenance burden, higher potential for errors, and
              reduced code readability.
            </p>
            <p className={styles["details__paragraph"]}>
              By adhering to the DRY principle, you promote clean, modular code
              that is easier to reason about and manage. Key strategies to
              achieve this include leveraging functions to break down complex
              logic into reusable pieces, component-based architecture in web
              development frameworks like React or Vue, and effective
              abstraction by identifying recurring patterns and creating
              representations such as classes or higher-order functions.
            </p>
            <p className={styles["details__paragraph"]}>
              Embracing the DRY principle fosters the development of clean,
              maintainable, and reliable code. It streamlines the development
              process, reduces the likelihood of errors, and ensures your
              codebase remains understandable and adaptable as your project
              evolves.
            </p>
          </div>
        </div>

        <div className={styles["comments"]}>
          <div className={styles["comments__container"]}></div>
        </div>
      </div>
    </article>
 * */
