import { Link } from "react-router-dom";

/**
 * Works just like an anchor element
 * @param {Element} children JSX or HTML
 * @param {string} path Location in react router
 * @returns
 */
export default function LinkButton({ children, path, ...props }) {
  return (
    <Link to={path} className="button">
      {children}
    </Link>
  );
}
