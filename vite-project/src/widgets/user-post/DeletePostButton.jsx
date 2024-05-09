import styles from "./UserPost.module.css";
import { TrashIcon } from "../../shared/ui/svg/PostSvg";
import { useDispatch, useSelector } from "react-redux";
import { activateDangerModal } from "../../entities/danger-modal/danger-modal-slice";
import { useNavigate } from "react-router-dom";

export default function DeletePostButton({ postId, postUid, size = 20 }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.info.uid);

  function handleClick() {
    dispatch(
      activateDangerModal({
        title: "Are you sure you want to delete this post?",
        message: "The post will be unrecoverable.",
        dangerFunctionReference: "deletePost",
        dangerFunctionInput: { uid, postId, postUid },
      })
    );
  }

  return (
    <button onClick={handleClick} className={`${styles["trash-button"]}`}>
      <span className={styles["trash-icon-container"]}>
        <TrashIcon size={size} />
      </span>
    </button>
  );
}
