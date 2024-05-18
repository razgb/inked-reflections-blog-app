import { useDispatch, useSelector } from "react-redux";
import { resetDangerModal } from "../../entities/danger-modal/dangerModalSlice";
import { closeAppOverlay } from "../../entities/overlay/overlaySlice";
import { setLoginModal } from "../../entities/user/user-slice";
import { useEffect } from "react";

export default function Overlay() {
  const dispatch = useDispatch();
  const { isOpen: overlayState, modalToClose } = useSelector(
    (state) => state.overlay
  );

  const handleKeyDown = (event) => {
    if (event.key !== "Escape") return;

    handleOverlayClose();
  };

  const handleOverlayClose = () => {
    if (modalToClose === "dangerModal") {
      dispatch(resetDangerModal());
    } else if (modalToClose === "editUserProfile") {
      dispatch(setLoginModal(false));
    }

    dispatch(closeAppOverlay());
    window.removeEventListener("keydown", handleKeyDown);
  };

  useEffect(() => {
    if (!overlayState) return;
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  if (!modalToClose) return null;
  return (
    overlayState && <div onClick={handleOverlayClose} className="overlay"></div>
  );
}
