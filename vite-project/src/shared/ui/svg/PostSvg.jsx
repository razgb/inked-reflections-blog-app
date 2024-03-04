const FILL_COLOR = "#000";

const BookmarksIcon = ({ size }) => {
  return (
    <svg
      fill={FILL_COLOR}
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
      fill={FILL_COLOR}
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
      fill={FILL_COLOR}
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

export { BookmarksIcon, ActionDotsIcon };
