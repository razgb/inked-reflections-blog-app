const BookmarksIcon = ({ size }) => {
  return (
    <svg
      className="icon"
      xmlns="http://www.w3.org/2000/svg"
      id="Outline"
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <path d="M20.137,24a2.8,2.8,0,0,1-1.987-.835L12,17.051,5.85,23.169a2.8,2.8,0,0,1-3.095.609A2.8,2.8,0,0,1,1,21.154V5A5,5,0,0,1,6,0H18a5,5,0,0,1,5,5V21.154a2.8,2.8,0,0,1-1.751,2.624A2.867,2.867,0,0,1,20.137,24ZM6,2A3,3,0,0,0,3,5V21.154a.843.843,0,0,0,1.437.6h0L11.3,14.933a1,1,0,0,1,1.41,0l6.855,6.819a.843.843,0,0,0,1.437-.6V5a3,3,0,0,0-3-3Z" />
    </svg>
  );
};

const BookmarksSolidIcon = ({ size }) => {
  return (
    <svg
      className="icon"
      xmlns="http://www.w3.org/2000/svg"
      id="Filled"
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <path d="M2.849,23.55a2.954,2.954,0,0,0,3.266-.644L12,17.053l5.885,5.853a2.956,2.956,0,0,0,2.1.881,3.05,3.05,0,0,0,1.17-.237A2.953,2.953,0,0,0,23,20.779V5a5.006,5.006,0,0,0-5-5H6A5.006,5.006,0,0,0,1,5V20.779A2.953,2.953,0,0,0,2.849,23.55Z" />
    </svg>
  );
};

const ActionDotsIcon = ({ size }) => {
  return (
    <svg
      className="icon"
      xmlns="http://www.w3.org/2000/svg"
      id="Outline"
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <circle cx="2" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="22" cy="12" r="2" />
    </svg>
  );
};

const ErrorTriangleIcon = ({ size }) => {
  return (
    <svg
      className="icon"
      xmlns="http://www.w3.org/2000/svg"
      id="Outline"
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z" />
      <path d="M12,5a1,1,0,0,0-1,1v8a1,1,0,0,0,2,0V6A1,1,0,0,0,12,5Z" />
      <rect x="11" y="17" width="2" height="2" rx="1" />
    </svg>
  );
};

const QuoteIcon = ({ size }) => {
  return (
    <svg
      className="icon"
      xmlns="http://www.w3.org/2000/svg"
      id="Outline"
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <path d="M8,4H4A4,4,0,0,0,0,8v4a2,2,0,0,0,2,2H7.91A6.006,6.006,0,0,1,2,19a1,1,0,0,0,0,2,8.009,8.009,0,0,0,8-8V6A2,2,0,0,0,8,4Z" />
      <path d="M22,4H18a4,4,0,0,0-4,4v4a2,2,0,0,0,2,2h5.91A6.006,6.006,0,0,1,16,19a1,1,0,0,0,0,2,8.009,8.009,0,0,0,8-8V6A2,2,0,0,0,22,4Z" />
    </svg>
  );
};

export {
  BookmarksIcon,
  BookmarksSolidIcon,
  ActionDotsIcon,
  ErrorTriangleIcon,
  QuoteIcon,
};
