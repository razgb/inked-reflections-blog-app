import styles from "./UserProfile.module.css";
import { useSelector } from "react-redux";
// import userProfile from "../../../public/default-profile.jpeg";
import useImageURL from "../../shared/hooks/useImageURL";
import Spinner from "../../shared/ui/spinner/Spinner";

export default function UserProfile() {
  const userInfo = useSelector((state) => state.user.info);
  const { imageURL: profilePhotoURL, loading } = useImageURL(
    "profile",
    userInfo.photoURL
  );

  return (
    <article
      className={`${styles["user"]} ${profilePhotoURL ? undefined : "hide"}`}
    >
      <div className={styles["user__container"]}>
        <div className={styles["user__photo-container"]}>
          <img
            src={profilePhotoURL}
            alt="User Profile Photo"
            className={styles["user__photo"]}
          />
        </div>
        <h3 className={styles["user__display-name"]}>
          {userInfo.displayName || "Name"}
        </h3>
        <span>{userInfo.email || "Email"}</span>
      </div>
    </article>
  );
}

/**
 * Notes:
 *
 * - Make a pen icon that shows profile image can be changed.
 * - Make a separate edit profile button that allows user to
 *    -> change email
 *    -> change password
 *    -> change displayName
 *    -> delete account
 *    -> remove profile picture
 *    -> change/cancel subscription
 *
 * SubNote: Make it similar to how instagram or twitter does it.
 * */
