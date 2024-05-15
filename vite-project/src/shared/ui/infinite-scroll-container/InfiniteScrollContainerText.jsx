import styles from "./InfiniteScrollContainer.module.css";

export const InfiniteScrollContainerText = ({ children }) => {
  return (
    <div className={styles["infinite-scroll-container-text"]}>
      <p>{children}</p>
    </div>
  );
};
