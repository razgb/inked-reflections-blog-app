import styles from "./UserPostsContainer.module.css";
import UserPost from "./UserPost";
import { fetchPosts } from "../../features/user-posts/fetchPosts";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

let renderInitialBatch = true;

export default function UserPostContainer() {
  const triggerRef = useRef();
  const dispatch = useDispatch();
  if (renderInitialBatch) {
    // dispatch(fetchPosts());
    renderInitialBatch = false;
  }
  const { postsFeed } = useSelector((state) => state.posts);
  console.log(postsFeed);

  const outputFeed = postsFeed.map((post) => (
    <UserPost
      key={post.id}
      id={post.id}
      title={post.title}
      firstName={post.firstName}
      lastName={post.lastName}
      paragraphs={post.paragraphs}
      tags={post.tags}
    />
  ));

  // Always at the end of the array even when new batches of posts come too!
  if (outputFeed.length > 0) {
    outputFeed.push(
      <div className="target" ref={triggerRef} key={Math.random()}></div>
    );
  }

  useEffect(() => {
    const scrollContainer = document.querySelector(".scrollContainer");

    function handlePostsObserver(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("Fetching...");
          // dispatch(fetchPosts());
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

    return () => postsObserver.disconnect(); // cleanup function!
  }, [dispatch, outputFeed]);

  return <div className={styles["user-posts-container"]}>{outputFeed}</div>;
}

/*
      const tempArrayOfPosts = [];
      for (let i = 0; i < 10; i++) {
        tempArrayOfPosts.push(<UserPost key={Math.random()} />);
      }
      tempArrayOfPosts.push(
        <div className="target" ref={triggerRef} key={Math.random()}></div>
      );
       */
// <div className={styles["user-posts-container"]}>{tempArrayOfPosts}</div>
