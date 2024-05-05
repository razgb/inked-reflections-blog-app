import styles from "./UserPost.module.css";
import { TrashIcon } from "../../shared/ui/svg/PostSvg";
import { useState } from "react";

export default function TrashButton({ postId }) {
  const [showModal, setShowModal] = useState(false);
  function handlePostDeletion() {
    setShowModal(true);
  }

  return (
    <button
      onClick={handlePostDeletion}
      className={`${styles["trash-button"]}`}
    >
      <span className={styles["trash-icon-container"]}>
        <TrashIcon size={20} />
      </span>
    </button>
  );
}
