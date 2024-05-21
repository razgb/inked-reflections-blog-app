import styles from "../ProfileUploadUI.module.css";
import { ProfileIcon } from "../../../../shared/ui/svg/MenuSvg";

export default function UserInfoInput({ error, nameRef, handleClick }) {
  return (
    <div className={styles["userinfo__inputs"]}>
      <div className={styles["name__container"]}>
        {error.nameError ? (
          <p className={styles["image-disclaimer"]}>{error.nameMessage}</p>
        ) : (
          <label className={styles["name__label"]}>Set display name</label>
        )}

        <div className={styles["name__input-container"]} onClick={handleClick}>
          <ProfileIcon size={20} />
          <input
            required
            type="text"
            className={styles["name__input"]}
            ref={nameRef}
          />
        </div>
      </div>
    </div>
  );
}
