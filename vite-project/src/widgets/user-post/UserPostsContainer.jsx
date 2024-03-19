import styles from "./UserPostsContainer.module.css";
import UserPost from "./UserPost";
import { fetchPosts } from "../../features/user-posts/fetchPosts";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { updatePostsFeed } from "../../entities/posts/posts-slice";
import Spinner from "../../shared/ui/spinner/Spinner.jsx";

export default function UserPostContainer() {
  const triggerRef = useRef();
  const dispatch = useDispatch();
  const { postsFeed, updateState } = useSelector((state) => state.posts);
  // console.log("postsFeed:", postsFeed);

  async function temp() {
    const posts = await fetchPosts();

    dispatch(updatePostsFeed(posts));
    return;
  }

  // Make an error state component please.
  const { isLoading, isError, error, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: temp,

    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const outputFeed = postsFeed.map((post) => (
    <UserPost
      key={post.id}
      id={post.id}
      datePublished={post.createdAt}
      title={post.title}
      firstName={post.firstName}
      lastName={post.lastName}
      paragraphs={post.paragraphs}
      tags={post.tags}
    />
  ));

  // Always at the end of the array even when new batches of posts come too
  if (outputFeed.length > 0) {
    outputFeed.push(
      <div className="target" ref={triggerRef} key={Math.random()}></div>
    );
  }

  useEffect(() => {
    if (isLoading) return;

    const scrollContainer = document.querySelector(".scrollContainer");
    function handlePostsObserver(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("Fetching posts...");
          refetch();
        }
      });
    }

    const postsObserver = new IntersectionObserver(handlePostsObserver, {
      root: scrollContainer,
      rootMargin: "800px",
      threshold: 1,
    });

    if (outputFeed.length > 0) {
      postsObserver.observe(triggerRef.current);
    }

    return () => {
      if (postsObserver) {
        postsObserver.disconnect(); // cleanup function
      }
    };
  }, [dispatch, refetch, outputFeed, updateState, isLoading]);

  if (isLoading) {
    return (
      <div className={styles["posts-spinner__container"]}>
        <Spinner />
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

/* Dummy queryFn:  
// queryFn: async () => {
    //   return new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve();
    //       console.log("Delayed by 3 seconds");
    //     }, 3000);
    //   });
    // },
*/
