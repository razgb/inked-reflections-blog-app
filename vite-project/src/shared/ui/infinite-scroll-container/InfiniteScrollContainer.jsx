import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Spinner from "../spinner/Spinner";
import { activateAppError } from "../../../entities/app-error/app-error-slice";
import UserPost from "../../../widgets/user-post/UserPost";

/**
 * Custom infinite scrolling component that abstracts everything from fetching to rendering user posts.
 * @param {array} content Infinite scroll content such as posts, comments, bookmarks.
 * @param {function} fn Async function that fetches new content.
 * @param {function} dispatchFn Redux dispatch function that updates content state in application.
 * @param {Number} batchLimit Default value: 10, match this number to how many documents you request from firebase.
 * @returns {Array} Content inside array that react renders.
 */
export default function InfiniteScrollContainer({
  content,
  fn,
  dispatchFn,
  batchLimit = 10,
}) {
  const dispatch = useDispatch();
  const triggerRef = useRef();
  const [observerState, setObserverState] = useState(true);

  const output = content.map((post) => (
    <UserPost
      key={post.id}
      id={post.id}
      displayName={post.displayName}
      createdAt={post.createdAt}
      postContent={post.postContent}
      profilePhotoReference={post.profilePhotoReference}
    />
  ));

  const fetchContent = async () => {
    try {
      const newContentArray = await fn();
      const newContentLength = newContentArray.length;

      if (newContentLength < batchLimit) {
        setObserverState(false); // No more content in firestore.
      } else setObserverState(true);

      dispatch(dispatchFn(newContentArray));
    } catch (error) {
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
