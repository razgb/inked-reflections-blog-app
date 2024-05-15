import styles from "./InfiniteScrollContainer.module.css";
import Spinner from "../spinner/Spinner";
import UserPost from "../../../widgets/user-post/UserPost.jsx";
import { InfiniteScrollContainerText } from "./InfiniteScrollContainerText.jsx";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContentUtil } from "./fetchContentUtil";

/**
 * Custom infinite scrolling component that abstracts everything from fetching to rendering user posts.
 * @param {array} content Infinite scroll content such as posts, comments, bookmarks.
 * @param {function} fn Async function that fetches new content.
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
  const {
    userHasPosts,
    completedFeed,
    intersectionObserverState: observerState,
  } = useSelector((state) => state[parentArrayName]);

  const [loading, setLoading] = useState(false);

  let output;
  if (parentArrayName !== "bookmarkFeed") {
    output = content.map((post) => {
      return (
        <UserPost
          key={post.id}
          postUid={post.uid}
          {...post}
          parentArrayName={parentArrayName}
        />
      );
    });
  } else
    output = content
      .slice()
      .reverse()
      .map((post) => {
        return (
          <UserPost
            key={post.id}
            postUid={post.uid}
            {...post}
            parentArrayName={parentArrayName}
          />
        );
      });

  useEffect(() => {
    if (
      !observerState ||
      !triggerRef.current ||
      !uid ||
      loading ||
      completedFeed === true
    )
      return;

    const targetRefCurrent = triggerRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLoading(true);
            dispatch(fetchContentUtil({ fn, parentArrayName, uid })).then(() =>
              setLoading(false)
            );
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
  }, [
    observerState,
    triggerRef,
    uid,
    loading,
    completedFeed,
    dispatch,
    fn,
    parentArrayName,
  ]);

  if (observerState) {
    output.push(
      <div
        className={styles["intersection-observer-target"]}
        ref={triggerRef}
        key={"intersection-observer-target"}
      ></div>
    );
  }

  if (loading) {
    output.push(
      <div
        className={styles["infinite-scroll-spinner-container"]}
        key={"infinite-scroll-spinner-container"}
      >
        <Spinner size="large" />
      </div>
    );
  } else if (userHasPosts === false && parentArrayName !== "mainFeed") {
    const message =
      parentArrayName !== "bookmarkFeed"
        ? "Write a new reflection to see it here"
        : "Bookmark a post to see it here";

    output.push(
      <InfiniteScrollContainerText key="no-owned-posts">
        {message}
      </InfiniteScrollContainerText>
    );
  } else if (completedFeed) {
    let containerLocation = "";

    switch (parentArrayName) {
      case "mainFeed":
        containerLocation = "home";
        break;
      case "profileFeed":
        containerLocation = "profile";
        break;
      case "bookmarkFeed":
        containerLocation = "bookmarks";
        break;
    }

    output.push(
      <InfiniteScrollContainerText key="no-more-posts">{`You've viewed all the posts in your ${containerLocation} feed`}</InfiniteScrollContainerText>
    );
  }

  return output;
}
