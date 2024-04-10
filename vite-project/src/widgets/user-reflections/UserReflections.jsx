import styles from "./UserReflections.module.css";
import DummyUserPost from "../../widgets/user-post/DummyUserPost.jsx";
import SearchInput from "../../shared/ui/search-input/SearchInput.jsx";
import ReflectButton from "../../shared/ui/buttons/ReflectButton.jsx";
import Select from "../../shared/ui/select-element/Select.jsx";
import LinkButton from "../../shared/ui/buttons/LinkButton.jsx";

export default function UserReflections() {
  return (
    <div className={styles["reflections"]}>
      <div className={styles["reflections__container"]}>
        <div className={styles["reflections__actions"]}>
          <div className={styles["half-1"]}>
            <h2 className={styles["heading"]}>Your Reflections</h2>
            <Select />
          </div>
          <div className={styles["half-2"]}>
            <ReflectButton size={20} />
          </div>
        </div>

        <SearchInput placeholder="Search your reflections" />

        <div className={styles["posts"]}>
          <DummyUserPost />
          <DummyUserPost />
          <DummyUserPost />
          <DummyUserPost />
          <DummyUserPost />
          <DummyUserPost />
          <DummyUserPost />
          <DummyUserPost />
          <DummyUserPost />
          <DummyUserPost />
        </div>
      </div>
    </div>
  );
}
