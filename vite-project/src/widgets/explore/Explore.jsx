import styles from "./Explore.module.css";
import TrendingItem from "./TrendingItem";
import { SearchIcon } from "../../shared/ui/svg/MenuSvg";
import { useRef } from "react";

export default function Explore() {
  const searchInputRef = useRef();

  function handleSearchIconClick() {
    searchInputRef.current.focus();
  }

  return (
    <div className={styles["explore"]}>
      <div className={styles["explore__container"]}>
        <div className={styles["search"]}>
          <SearchIcon onClick={handleSearchIconClick} size={20} />
          <input
            type="search"
            className={styles["search__input"]}
            ref={searchInputRef}
          />
        </div>

        <div className={styles["trending"]}>
          <div className={styles["trending__container"]}>
            <h2 className={styles["trending__heading"]}>Trending</h2>

            <ul className={styles["trending-list"]}>
              <TrendingItem title={"Mental health"} />
              <TrendingItem title={"Thoughts on elections"} />
              <TrendingItem title={"Gratitude exploration"} />
              <TrendingItem title={"Celebrating victories"} />
              <TrendingItem title={"Mindfulness moments"} />
              <TrendingItem title={"Growth mindset"} />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Notes:
 *
 * - Create an event when the user clicks the search icon,
 * the search__input gets focused on.
 */
