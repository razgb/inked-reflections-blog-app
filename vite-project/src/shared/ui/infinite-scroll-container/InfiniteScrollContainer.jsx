import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Spinner from "../spinner/Spinner";
import { activateAppError } from "../../../entities/app-error/app-error-slice";
import UserPost from "../../../widgets/user-post/UserPost";

let initialFetch = true; // Used to fetch posts before a intersection observer.

/**
 * Custom infinite scrolling component that abstracts everything from fetching to rendering user posts.
 * @param {array} content Infinite scroll content such as posts, comments, bookmarks.
 * @param {function} fn Async function that fetches new content.
 * @param {function} dispatchFn Redux dispatch function that updates content state in application.
 * @param {boolean} turnOnObserver Boolean switch that turns observer on/off depending on last content array length from parent component. (<5 turned off due to no more posts).
 * @returns {Array} Content inside array that react renders.
 */
export default function InfiniteScrollContainer({ content, fn, dispatchFn }) {
  const dispatch = useDispatch();
  const triggerRef = useRef();
  const [observerState, setObserverState] = useState(false);

  console.log(observerState);

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
      console.log(newContentArray);

      if (newContentLength < 5) {
        setObserverState(false); // No more content in firestore.
        return;
      } else setObserverState(true);

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
    if (initialFetch) {
      fetchContent();
      initialFetch = false;
      return;
    }
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
        // rootMargin: "500px",
        threshold: 0,
      }
    );

    if (targetRefCurrent) {
      observer.observe(targetRefCurrent);
    }

    console.log("-----------------------------");

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
