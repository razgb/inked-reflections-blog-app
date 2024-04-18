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
import MenuActionButton from "./MenuActionButton";
import SignoutModal from "../login-create-account/SignoutModal";

import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeLocationState } from "../../entities/url-location/location-slice";
import { ThemeContext } from "../../entities/theme/ThemeContext";

const ICON_SIZE = 20;

/*
  Notes for future me: 
  You have to refactor the entire codebase for a more component friendly 
  architecture and use the useContext theme api for dynamic changing of themes.

  Maybe create a separate css file for your colors. 
 */

export default function Menu({ menuOpenState, handleToggleMenuState }) {
  const dispatch = useDispatch();
  const urlLocationName = useSelector((state) => state.location.locationName);
  const [openLogout, setOpenLogout] = useState(false);

  const { theme, toggleTheme } = useContext(ThemeContext);

  function handleOpenLogout(action) {
    if (action === "open") setOpenLogout(true);
    else setOpenLogout(false);
  }

  useEffect(() => {
    function handlePopState() {
      const location = window.location.pathname;
      if (urlLocationName !== location) {
        // console.log("Corrected back button bug.");
        dispatch(changeLocationState(location));
      }
    }
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  });

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
          <div className={styles["theme-icon__container"]}>
            <MenuActionButton title="Theme" menuOpenState={menuOpenState}>
              {theme === "light" ? (
                <SunIcon size={24} />
              ) : (
                <MoonIcon size={ICON_SIZE} />
              )}
            </MenuActionButton>
          </div>

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
