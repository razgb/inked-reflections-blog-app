import styles from "./Menu.module.css";
import {
  HomeSolidIcon,
  SearchSolidIcon,
  HamburgerSolidIcon,
  HelpSolidIcon,
  BookmarksSolidIcon,
  ProfileSolidIcon,
  ReflectionsSolidIcon,
  SettingsSolidIcon,
} from "../../shared/ui/svg-solid/MenuSvgSolid";
import {
  HomeIcon,
  SearchIcon,
  ProfileIcon,
  ReflectionsIcon,
  BookmarksIcon,
  SettingsIcon,
  HelpIcon,
  SunIcon,
  MoonIcon,
  SignoutIcon,
} from "../../shared/ui/svg/MenuSvg";
import MenuButton from "./MenuButton";
import { useState } from "react";
import MenuActionButton from "./MenuActionButton";
import SignoutModal from "../login-create-account/SignoutModal";
import { useSelector } from "react-redux";

const ICON_SIZE = 20;

export default function Menu({ menuOpenState, handleToggleMenuState }) {
  const urlLocationName = useSelector((state) => state.location.locationName);
  const [openLogout, setOpenLogout] = useState(false);

  function handleOpenLogout(action) {
    if (action === "open") setOpenLogout(true);
    else setOpenLogout(false);
  }

  return (
    <aside className={styles["menu"]}>
      <div className={styles["menu-container"]}>
        <MenuButton toggleMenu={handleToggleMenuState}>
          <HamburgerSolidIcon size={ICON_SIZE} />
        </MenuButton>

        <div className={styles["menu-actions-1"]}>
          <MenuButton destination="/posts" title="Home" open={menuOpenState}>
            {urlLocationName.includes("posts") ? (
              <HomeSolidIcon size={ICON_SIZE} />
            ) : (
              <HomeIcon size={ICON_SIZE} />
            )}
          </MenuButton>

          <MenuButton
            destination="/explore"
            title="Explore"
            open={menuOpenState}
          >
            {urlLocationName.includes("explore") ? (
              <SearchSolidIcon size={ICON_SIZE} />
            ) : (
              <SearchIcon size={ICON_SIZE} />
            )}
          </MenuButton>

          <MenuButton
            destination="/reflections"
            title="Reflections"
            open={menuOpenState}
          >
            {urlLocationName.includes("reflections") ? (
              <ReflectionsSolidIcon size={ICON_SIZE} />
            ) : (
              <ReflectionsIcon size={ICON_SIZE} />
            )}
          </MenuButton>

          <MenuButton
            destination="/bookmarks"
            title="Bookmarks"
            open={menuOpenState}
          >
            {urlLocationName.includes("bookmarks") ? (
              <BookmarksSolidIcon size={ICON_SIZE} />
            ) : (
              <BookmarksIcon size={ICON_SIZE} />
            )}
          </MenuButton>

          <MenuButton
            destination="/profile"
            title="Profile"
            open={menuOpenState}
          >
            {urlLocationName.includes("profile") ? (
              <ProfileSolidIcon size={ICON_SIZE} />
            ) : (
              <ProfileIcon size={ICON_SIZE} />
            )}
          </MenuButton>

          <MenuButton
            destination="/settings"
            title="Settings"
            open={menuOpenState}
          >
            {urlLocationName.includes("settings") ? (
              <SettingsSolidIcon size={ICON_SIZE} />
            ) : (
              <SettingsIcon size={ICON_SIZE} />
            )}
          </MenuButton>

          <MenuButton destination="/help" title="Help" open={menuOpenState}>
            {urlLocationName.includes("help") ? (
              <HelpSolidIcon size={ICON_SIZE} />
            ) : (
              <HelpIcon size={ICON_SIZE} />
            )}
          </MenuButton>
        </div>

        <div className={styles["menu-actions-2"]}>
          <MenuActionButton title="Theme" menuOpenState={menuOpenState}>
            <MoonIcon size={ICON_SIZE} />
          </MenuActionButton>
          <MenuActionButton
            title="Sign out"
            onClick={() => handleOpenLogout("open")}
            menuOpenState={menuOpenState}
          >
            <SignoutIcon size={ICON_SIZE} />
          </MenuActionButton>
        </div>

        {openLogout && <SignoutModal onClose={handleOpenLogout} />}
        {openLogout && <div className={styles["menu-overlay"]}></div>}
      </div>
    </aside>
  );
}
