import styles from "./Explore.module.css";
import TrendingItem from "./TrendingItem";
import SearchInput from "../../shared/ui/search-input/SearchInput";

export default function Explore() {
  return (
    <div className={styles["explore"]}>
      <div className={styles["explore__container"]}>
        <SearchInput />

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
 * Create an animation that moves a 20rem bar to suggest
 * to the user that the search query is happening in the
 * background.
 */
