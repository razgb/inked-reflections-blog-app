import styles from "./SearchInput.module.css";
import { SearchIcon } from "../svg/MenuSvg";
import { useRef } from "react";

export default function SearchInput({ fn, placeholder = "Search" }) {
  const searchInputRef = useRef();

  function handleSearchIconClick() {
    searchInputRef.current.focus();
  }

  return (
    <div className={styles["search"]}>
      <SearchIcon onClick={handleSearchIconClick} size={20} />
      <input
        type="search"
        placeholder={placeholder}
        className={styles["search__input"]}
        ref={searchInputRef}
      />
    </div>
  );
}

/*
  Well i'm planning to create a reusable search input component that is similar to the youtube search bar in their homepage for reference. I want it to expose 
  */
