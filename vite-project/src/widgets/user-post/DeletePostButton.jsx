import styles from "./UserPost.module.css";
import { TrashIcon } from "../../shared/ui/svg/PostSvg";
import { useDispatch } from "react-redux";
import { activateDangerModal } from "../../entities/danger-modal/danger-modal-slice";

export default function DeletePostButton({ postId }) {
  const dispatch = useDispatch();

  if (!postId)
    throw new Error("DeletePostButton.jsx must contains a valid postId prop.");

  function handleClick() {
    dispatch(
      activateDangerModal({
        title: "Are you sure you want to delete this post?",
        message: "The post will be unrecoverable.",
        dangerFunctionReference: "deletePost",
        dateToSend: postId,
      })
    );
  }

  return (
    <button onClick={handleClick} className={`${styles["trash-button"]}`}>
      <span className={styles["trash-icon-container"]}>
        <TrashIcon size={20} />
      </span>
    </button>
  );
}
