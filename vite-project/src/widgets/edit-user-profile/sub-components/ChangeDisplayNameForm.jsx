import styles from "../EditUserProfile.module.css";
import Button from "../../../shared/ui/buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";

import { handleDisplayNameChange } from "../util/handleDisplayNameChange";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../shared/ui/spinner/Spinner";

export default function ChangeDisplayNameForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nameRef = useRef(null);
  const { displayName, photoURL } = useSelector((state) => state.user.info);
  const { uid } = useSelector((state) => state.user.info);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      handleDisplayNameChange({
        uid,
        newDisplayName: nameRef.current.value,
        photoURL,
        navigate,
        setLoading,
      })
    );
  };

  return (
    <form onSubmit={handleSubmit} className={styles["form-item"]}>
      <div className={styles["input-container"]}>
        <label className={styles["label"]} htmlFor="displayName">
          Change Display Name
        </label>
        <input
          type="text"
          id="displayName"
          placeholder={displayName}
          className={styles["input"]}
          ref={nameRef}
        />
      </div>

      <div className={styles["button-container"]}>
        <Button type="submit">
          {loading ? (
            <Spinner size="small" contrastPrimaryColor />
          ) : (
            "Update Display Name"
          )}
        </Button>
      </div>
    </form>
  );
}
