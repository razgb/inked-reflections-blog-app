import styles from "./UserPost.module.css";
import { BookmarksIcon } from "../../shared/ui/svg/PostSvg";
import { BookmarksSolidIcon } from "../../shared/ui/svg/PostSvg";

import { useDispatch, useSelector } from "react-redux";
import { addBookmarkIdToUsersCollection } from "../../features/bookmarks/addBookmarkIdToUsersCollection";
import { removeBookmarkIdFromUsersCollection } from "../../features/bookmarks/removeBookmarkIdFromUsersCollection";
import { requestWithRetry } from "../../shared/util/requestWithRetry";
import { activateAppError } from "../../entities/app-error/app-error-slice";
import {
  addBookmarkPost,
  removeBookmarkPost,
} from "../../entities/posts/posts-slice";

export default function BookmarkButton({ postId }) {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.info.uid);
  const bookmarkIds = useSelector((state) => state.posts.bookmarks.ids);
  const bookmarked = bookmarkIds.includes(postId);

  function handleBookmarkClick() {
    let promise;
    let dispatchAction; // Optimistic update
    let reverseDispatchAction; // Revert optimistic update

    if (bookmarked) {
      promise = removeBookmarkIdFromUsersCollection(uid, postId);
      dispatchAction = () => dispatch(removeBookmarkPost(postId));
      reverseDispatchAction = () => dispatch(addBookmarkPost(postId));
    } else {
      promise = addBookmarkIdToUsersCollection(uid, postId);
      dispatchAction = () => dispatch(addBookmarkPost(postId));
      reverseDispatchAction = () => dispatch(removeBookmarkPost(postId));
    }

    const sendPromise = async () => {
      try {
        dispatchAction();

        await requestWithRetry(promise);
      } catch (error) {
        reverseDispatchAction();

        const errorDetails = JSON.parse(error.message);
        const { title, message } = errorDetails;
        dispatch(activateAppError({ title, message }));
      }
    };

    sendPromise();
  }

  return (
    <button onClick={handleBookmarkClick} className={styles["bookmark-button"]}>
      <span className={styles["bookmark-icon-container"]}>
        {bookmarked ? (
          <BookmarksSolidIcon size={18} />
        ) : (
          <BookmarksIcon size={18} />
        )}
      </span>
    </button>
  );
}

/*
Notes: 

Use this as the promise to test the error handling.
const promise = new Promise((_, reject) => reject(new Error("test error")));

You'll see that the optimistic update will reverse upon this error and also
the error will shown in the app error state modal.
*/
