import { useDispatch, useSelector } from "react-redux";
import { resetDangerModal } from "../../entities/danger-modal/dangerModalSlice";
import { closeAppOverlay } from "../../entities/overlay/overlaySlice";
import { setLoginModal } from "../../entities/user/user-slice";

export default function Overlay() {
  const dispatch = useDispatch();
  const { isOpen: overlayState, modalToClose } = useSelector(
    (state) => state.overlay
  );

  const handleOverlayClick = () => {
    if (modalToClose === "dangerModal") {
      dispatch(resetDangerModal());
    } else if (modalToClose === "editUserProfile") {
      dispatch(setLoginModal(false));
    }

    dispatch(closeAppOverlay());
  };

  if (!modalToClose) return null;

  return (
    overlayState && <div onClick={handleOverlayClick} className="overlay"></div>
  );
}
