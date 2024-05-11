import styles from "../UserPost.module.css";
import { BookmarksIcon } from "../../../shared/ui/svg/PostSvg";
import { BookmarksSolidIcon } from "../../../shared/ui/svg/PostSvg";

// Async
import { removeBookmarkFromUsersCollection } from "../../../features/bookmarks/removeBookmarkFromUsersCollection";
import { addBookmarkToUsersCollection } from "../../../features/bookmarks/addBookmarkToUsersCollection";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { requestWithRetry } from "../../../shared/util/requestWithRetry";
import { activateAppError } from "../../../entities/app-error/app-error-slice";

import { toggleBookmarkInMainFeed } from "../../../entities/posts/mainFeedSlice";
import { toggleBookmarkInProfileFeed } from "../../../entities/posts/profileFeedSlice";
import { toggleBookmarkInBookmarkFeed } from "../../../entities/posts/bookmarkFeedSlice";
import { toggleCurrentBookmark } from "../../../entities/current-post/currentPostSlice";

const bookmarkDispatchMap = {
  mainFeed: toggleBookmarkInMainFeed,
  profileFeed: toggleBookmarkInProfileFeed,
  bookmarkFeed: toggleBookmarkInBookmarkFeed,
};

/**
 * A button to bookmark a post
 *
 * Functionality depends on whether parentArrayName exists.
 * If it does, the button will toggle the bookmark state in the parent array + current post.
 * If it doesn't, the button will toggle the bookmark state in the current post only.
 *
 * @param {string} postId - The id of the post to bookmark
 * @param {boolean} isBookmarked - Whether the post is bookmarked
 * @param {string} parentArrayName - The name of the parent array that the post is in
 * @param {number} size - The size of the bookmark icon
 * @returns {JSX.Element} - The bookmark button
 */
export default function BookmarkButton({
  postId,
  isBookmarked,
  parentArrayName,
  size = 18,
}) {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.info.uid);
  const currentPostId = useSelector((state) => state.currentPost.id);

  const userViewingExpandedPost = currentPostId === postId;
  const bookmarked = isBookmarked;

  function handleBookmarkClick() {
    let promise;

    const bookmarkMapReference = bookmarkDispatchMap[parentArrayName];
    const toggleBookmark = (payload) => dispatch(bookmarkMapReference(payload));

    if (bookmarked) {
      promise = removeBookmarkFromUsersCollection(uid, postId);
    } else {
      promise = addBookmarkToUsersCollection(uid, postId);
    }

    const sendPromise = async () => {
      try {
        if (userViewingExpandedPost) {
          dispatch(toggleCurrentBookmark(!bookmarked));
        }

        if (parentArrayName) {
          toggleBookmark({ postId, toggleState: !bookmarked }); // optimistic update
        }
        await requestWithRetry(promise);
      } catch (error) {
        if (userViewingExpandedPost) {
          dispatch(toggleCurrentBookmark(!bookmarked));
        }

        if (parentArrayName) {
          toggleBookmark({ postId, toggleState: !bookmarked }); // revert optimistic update
        }

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
          <BookmarksSolidIcon size={size} />
        ) : (
          <BookmarksIcon size={size} />
        )}
      </span>
    </button>
  );
}
