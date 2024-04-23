import styles from "./UserPostsContainer.module.css";
import UserPost from "./UserPost";
import Spinner from "../../shared/ui/spinner/Spinner.jsx";
import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { updatePostsFeed } from "../../entities/posts/posts-slice";
import { fetchPosts } from "../../features/user-posts/fetchPosts";
import {
  activateAppError,
  resetAppError,
} from "../../entities/app-error/app-error-slice.js";
import { ErrorTriangleIcon } from "../../shared/ui/svg/PostSvg.jsx";

export default function UserPostContainer() {
  const triggerRef = useRef();
  const dispatch = useDispatch();
  const { postsFeed } = useSelector((state) => state.posts);
  // console.log("postsFeed:", postsFeed);

  async function handleFetchingPosts() {
    try {
      const posts = await fetchPosts();
      dispatch(updatePostsFeed(posts));
      // throw new Error("Testing error");
      dispatch(resetAppError());
    } catch (error) {
      dispatch(
        activateAppError({
          title: "Error getting your posts",
          message:
            "Please check your internet connection and refresh the page.",
        })
      );
      throw error; // So useQuery receives error.
    }
  }

  const { isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: handleFetchingPosts,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  // const outputFeed = postsFeed.map((post) => (
  //   <UserPost
  //     key={post.id}
  //     id={post.id}
  //     datePublished={post.createdAt}
  //     title={post.title}
  //     firstName={post.firstName}
  //     lastName={post.lastName}
  //     paragraphs={post.paragraphs}
  //     tags={post.tags}
  //     photoURL={post.photoURL}
  //   />
  // ));

  const outputFeed = useMemo(() => {
    return postsFeed.map((post) => (
      <UserPost
        key={post.id}
        id={post.id}
        displayName={post.displayName}
        createdAt={post.createdAt}
        postContent={post.postContent}
        profilePhotoReference={post.profilePhotoReference}
      />
    ));
  }, [postsFeed]);

  // Always at the end of the array even when new batches of posts come too
  // if (outputFeed.length > 0) {
  //   outputFeed.push(
  //     <div className="target" ref={triggerRef} key={"trigger-element"}></div>
  //   );
  // }

  /*Error: some issues when switching between tabs e.g.
    posts to explore to posts. */

  // useEffect(() => {
  //   if (isLoading || isError) return;

  //   const scrollContainer = document.querySelector(".scrollContainer");
  //   function handlePostsObserver(entries) {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         // console.log("Fetching posts...");
  //         refetch();
  //       }
  //     });
  //   }

  //   const postsObserver = new IntersectionObserver(handlePostsObserver, {
  //     root: scrollContainer,
  //     rootMargin: "800px",
  //     threshold: 1,
  //   });

  //   // Future me: Try and see why this is causing some ref problems.
  //   if (outputFeed.length > 0) {
  //     postsObserver.observe(triggerRef.current);
  //   }

  //   return () => {
  //     if (postsObserver) {
  //       postsObserver.disconnect(); // cleanup function
  //     }
  //   };
  // }, [dispatch, refetch, outputFeed, isLoading, isError]);

  if (isLoading) {
    return (
      <div className={styles["posts-spinner__container"]}>
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles["error-icon-container"]}>
        <ErrorTriangleIcon size={48} />
        <p className={styles["error-icon-message"]}>{error.message}</p>
      </div>
    );
  }

  return <div className={styles["user-posts-container"]}>{outputFeed}</div>;
}

/**
 * Notes:
 *
 * Realised that when user finishes all the posts there are to
 * view, firebase sends either a repeat of all the posts from the
 * beggining or the last batch again and again...
 *
 * Wonder how the fuck i'll fix this.
 */
