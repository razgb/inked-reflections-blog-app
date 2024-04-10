import styles from "./UserProfileContainer.module.css";
export default function UserProfileContainer({ children }) {
  return <div className={styles["user-profile-container"]}>{children}</div>;
}
