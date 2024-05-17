import styles from "./EditUserProfile.module.css";
import ChangeDisplayNameForm from "./sub-components/ChangeDisplayNameForm";
import ChangeEmailForm from "./sub-components/ChangeEmailForm";
import ChangePasswordForm from "./sub-components/ChangePasswordForm";
import ChangeProfilePhotoForm from "./sub-components/ChangeProfilePhotoForm";
import DeleteAccountForm from "./sub-components/DeleteAccountForm";
import LoginAccountUI from "../login-create-account/LoginAccountUI";

import { useSelector } from "react-redux";

export default function EditUserProfile() {
  const showModal = useSelector((state) => state.user.edit.showLoginModal);

  return (
    <div className={styles["edit-profile-container"]}>
      <div className={styles["login-account-container"]}>
        {showModal && (
          <LoginAccountUI navigatePath="/profile/edit" functionRef="reauth" />
        )}
      </div>

      <div className={styles["edit-profile"]}>
        <h2 className={styles["edit-profile-title"]}>Edit your profile</h2>

        <ChangeProfilePhotoForm />
        <ChangeEmailForm />
        <ChangePasswordForm />
        <ChangeDisplayNameForm />
        <DeleteAccountForm />
      </div>
    </div>
  );
}
