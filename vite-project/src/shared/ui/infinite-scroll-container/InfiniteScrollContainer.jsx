import Spinner from "../spinner/Spinner";
import UserPost from "../../../widgets/user-post/UserPost";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activateAppError } from "../../../entities/app-error/app-error-slice";

import {
  updateFeedObserver,
  updateMainFeed,
} from "../../../entities/posts/mainFeedSlice";
import {
  updateProfileObserver,
  updateProfileFeed,
} from "../../../entities/posts/profileFeedSlice";
import {
  updateBookmarkObserver,
  updateBookmarkFeed,
} from "../../../entities/posts/bookmarkFeedSlice";

const observerMap = {
  mainFeed: updateFeedObserver,
  profileFeed: updateProfileObserver,
  bookmarkFeed: updateBookmarkObserver,
};

const dispatchFunctionMap = {
  mainFeed: updateMainFeed,
  profileFeed: updateProfileFeed,
  bookmarkFeed: updateBookmarkFeed,
};

/**
 * Custom infinite scrolling component that abstracts everything from fetching to rendering user posts.
 * @param {array} content Infinite scroll content such as posts, comments, bookmarks.
 * @param {function} fn Async function that fetches new content.
 * @param {function} dispatchFn Redux dispatch function that updates content state in application.
 * @param {string} observerName A unique name so that redux can keep track of observer state across component mounts and unmounts e.g. ['posts', 'profile', 'bookmark'].
 * @param {boolean} isProfilePost Whether the post is a profile post.
 * @returns {Array} Content inside array that react renders.
 */
export default function InfiniteScrollContainer({
  content,
  fn,
  parentArrayName,
}) {
  const dispatch = useDispatch();
  const triggerRef = useRef();
  const uid = useSelector((state) => state.user.info.uid);

  const { postBatchLimit, intersectionObserverState: observerState } =
    useSelector((state) => state[parentArrayName]);

  const output = content.map((post) => {
    // postUid should be named autherUid in the future in the final stages of the app.
    return (
      <UserPost
        key={post.id}
        postUid={post.uid}
        {...post}
        parentArrayName={parentArrayName}
      />
    );
  });

  const fetchContent = async () => {
    try {
      const newContentArray = await fn(uid);
      const newContentLength = newContentArray.length;

      const observerUpdater = observerMap[parentArrayName];
      const dispatchFn = dispatchFunctionMap[parentArrayName];

      // No more content in firestore after this batch.
      if (newContentLength < postBatchLimit) {
        dispatch(
          observerUpdater({
            bool: false,
          })
        );
      }

      // There is more content in firestore after this batch.
      else
        dispatch(
          observerUpdater({
            bool: true,
          })
        );

      dispatch(dispatchFn(newContentArray));
    } catch (error) {
      console.log(error);
      dispatch(
        activateAppError({
          title: "Error loading posts",
          message: "Check your internet connection and try again.",
        })
      );
    }
  };

  useEffect(() => {
    if (!observerState || !triggerRef.current || !uid || !parentArrayName)
      return;

    const targetRefCurrent = triggerRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fetchContent();
            observer.unobserve(targetRefCurrent);
          }
        });
      },
      {
        rootMargin: "500px",
        threshold: 0,
      }
    );

    if (targetRefCurrent) {
      observer.observe(targetRefCurrent);
    }

    return () => {
      if (targetRefCurrent) {
        observer.unobserve(targetRefCurrent);
      }
    };
  });

  if (observerState) {
    output.push(
      <div
        className="infinite-scroll-target"
        ref={triggerRef}
        key={"trigger-element"}
      >
        <Spinner size="large" />
      </div>
    );
  }

  // console.log(output);
  return output;
}
