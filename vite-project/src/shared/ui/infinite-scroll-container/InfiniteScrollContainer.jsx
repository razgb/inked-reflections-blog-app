import Spinner from "../spinner/Spinner";
import UserPost from "../../../widgets/user-post/UserPost";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activateAppError } from "../../../entities/app-error/app-error-slice";
import { updateObserver } from "../../../entities/posts/posts-slice";

/**
 * Custom infinite scrolling component that abstracts everything from fetching to rendering user posts.
 * @param {array} content Infinite scroll content such as posts, comments, bookmarks.
 * @param {function} fn Async function that fetches new content.
 * @param {function} dispatchFn Redux dispatch function that updates content state in application.
 * @param {Number} batchLimit Default value: 10, match this number to how many documents you request from firebase.
 * @param {string} observerName A unique name so that redux can keep track of observer state across component mounts and unmounts e.g. ['posts', 'profile', 'bookmark'].
 * @returns {Array} Content inside array that react renders.
 */
export default function InfiniteScrollContainer({
  content,
  fn,
  dispatchFn,
  batchLimit = 10,
  observerName,
  isProfilePost,
}) {
  if (!observerName) {
    throw new Error(
      "Please enter a container name for redux observer state functionality."
    );
  }

  const dispatch = useDispatch();
  const triggerRef = useRef();
  const observerState = useSelector(
    (state) => state.posts.observers[observerName]
  );

  const output = content.map((post) => (
    <UserPost
      key={post.id}
      id={post.id}
      postUid={post.uid}
      displayName={post.displayName}
      createdAt={post.createdAt}
      postContent={post.postContent}
      profilePhotoReference={post.profilePhotoReference}
      readingTime={post.readingTime}
      isProfilePost={isProfilePost}
    />
  ));

  const fetchContent = async () => {
    try {
      const newContentArray = await fn();
      const newContentLength = newContentArray.length;

      if (newContentLength < batchLimit) {
        dispatch(
          updateObserver({
            bool: false,
            name: observerName,
          })
        ); // No more content in firestore.
      } else
        dispatch(
          updateObserver({
            bool: true,
            name: observerName,
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
    if (!observerState || !triggerRef.current) return;

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

  return output;
}
