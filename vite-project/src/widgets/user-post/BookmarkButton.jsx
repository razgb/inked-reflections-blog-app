import styles from "./UserPost.module.css";
import { BookmarksIcon } from "../../shared/ui/svg/PostSvg";
import { BookmarksSolidIcon } from "../../shared/ui/svg/PostSvg";

import { useDispatch, useSelector } from "react-redux";
import { addBookmarkToUsersCollection } from "../../features/bookmarks/addBookmarkToUsersCollection";
import { removeBookmarkFromUsersCollection } from "../../features/bookmarks/removeBookmarkFromUsersCollection";
import { requestWithRetry } from "../../shared/util/requestWithRetry";
import { activateAppError } from "../../entities/app-error/app-error-slice";
import {
  addBookmarkPost,
  removeBookmarkPost,
} from "../../entities/posts/posts-slice";

export default function BookmarkButton({
  postId,
  isBookmarked,
  postArrayName,
}) {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.info.uid);
  const bookmarked = isBookmarked;

  function handleBookmarkClick() {
    let promise;
    let dispatchAction; // Optimistic update
    let reverseDispatchAction; // Revert optimistic update

    const addBookmark = () =>
      dispatch(addBookmarkPost({ postId, postArrayName }));

    const removeBookmark = () =>
      dispatch(removeBookmarkPost({ postId, postArrayName }));

    if (bookmarked) {
      promise = removeBookmarkFromUsersCollection(uid, postId);
      dispatchAction = removeBookmark;
      reverseDispatchAction = addBookmark;
    } else {
      promise = addBookmarkToUsersCollection(uid, postId);
      dispatchAction = addBookmark;
      reverseDispatchAction = removeBookmark;
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
