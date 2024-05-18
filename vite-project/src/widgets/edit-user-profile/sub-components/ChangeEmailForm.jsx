import styles from "../EditUserProfile.module.css";
import Button from "../../../shared/ui/buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../shared/ui/spinner/Spinner";
import { handleEmailChange } from "../util/handleEmailChange";

export default function ChangeEmailForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const { uid, email } = useSelector((state) => state.user.info);
  const [loading, setLoading] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(
      handleEmailChange({
        uid,
        newEmail: emailRef.current.value,
        setLoading,
        navigate,
      })
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles["form-item"]}>
      <div className={styles["input-container"]}>
        <label className={styles["label"]} htmlFor="email">
          Change Email
        </label>
        <input
          type="email"
          id="email"
          placeholder={email}
          className={styles["input"]}
          ref={emailRef}
        />
      </div>

      <div className={styles["button-container"]}>
        <Button type="submit">
          {loading ? (
            <Spinner size="small" contrastPrimaryColor />
          ) : (
            "Update Email"
          )}
        </Button>
      </div>
    </form>
  );
}
