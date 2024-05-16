export default function Button({ children, buttonType, ...props }) {
  return (
    <button className={`button ${buttonType}`} {...props}>
      {children}
    </button>
  );
}
