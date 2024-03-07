import styles from "./UserPostsContainer.module.css";
import UserPost from "./UserPost";
import { useEffect, useRef } from "react";

export default function UserPostContainer() {
  const triggerRef = useRef();

  useEffect(() => {
    const scrollContainer = document.querySelector(".scrollContainer");

    function handlePostsObserver(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("Fetching...");
        }
      });
    }

    const postsObserver = new IntersectionObserver(handlePostsObserver, {
      root: scrollContainer,
      rootMargin: "800px",
      threshold: 1,
    });

    postsObserver.observe(triggerRef.current);

    return () => postsObserver.disconnect(); // cleanup function!
  }, []);

  const tempArrayOfPosts = [];
  for (let i = 0; i < 10; i++) {
    tempArrayOfPosts.push(<UserPost key={Math.random()} />);
  }
  tempArrayOfPosts.push(
    <div className="target" ref={triggerRef} key={Math.random()}>
      hello
    </div>
  );

  return (
    <div className={styles["user-posts-container"]}>{tempArrayOfPosts}</div>
  );
}
