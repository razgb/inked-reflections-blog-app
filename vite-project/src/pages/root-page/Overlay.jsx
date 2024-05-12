import { useDispatch, useSelector } from "react-redux";
import { resetDangerModal } from "../../entities/danger-modal/dangerModalSlice";

export default function Overlay() {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.danger.showModal);

  const handleOverlayClick = () => dispatch(resetDangerModal());

  return (
    showModal && <div onClick={handleOverlayClick} className="overlay"></div>
  );
}
