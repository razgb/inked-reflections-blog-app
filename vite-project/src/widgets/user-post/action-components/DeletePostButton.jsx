import styles from "../UserPost.module.css";
import { TrashIcon } from "../../../shared/ui/svg/PostSvg";
import { useDispatch, useSelector } from "react-redux";
import { activateDangerModal } from "../../../entities/danger-modal/dangerModalSlice";
import { openAppOverlay } from "../../../entities/overlay/overlaySlice";

export default function DeletePostButton({ post, size = 20 }) {
  const { id: postId, postUid } = post;
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.info.uid);

  function handleClick() {
    dispatch(openAppOverlay({ modalToClose: "dangerModal" }));
    dispatch(
      activateDangerModal({
        title: "Are you sure you want to delete this post?",
        message: "The post will be unrecoverable.",
        dangerFunctionReference: "deletePost",
        dangerFunctionInput: { uid, postId, postUid },
        usesReduxDispatch: true,
        successRedirectPath: "/profile",
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
