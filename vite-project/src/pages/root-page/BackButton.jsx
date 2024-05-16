import { useLocation } from "react-router-dom";
import { ArrowIcon } from "../../shared/ui/svg/NavigationSvg";

export const BackButton = () => {
  const { pathname } = useLocation();

  function goBack() {
    window.history.back();
  }

  const condition =
    pathname.includes("/posts/") ||
    pathname === "/profile/reflect" ||
    pathname === "/profile/edit";

  return (
    <button
      onClick={goBack}
      className={`back-button ${condition ? "" : "hidden"}`}
    >
      <ArrowIcon size={36} />
    </button>
  );
};
