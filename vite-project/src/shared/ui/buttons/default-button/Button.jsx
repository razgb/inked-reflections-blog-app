export default function Button({ children, buttonType, ...props }) {
  let extraStyles = "";
  if (buttonType === "error") {
    extraStyles += "error";
  }

  return (
    <button className={`button ${extraStyles}`} {...props}>
      {children}
    </button>
  );
}
