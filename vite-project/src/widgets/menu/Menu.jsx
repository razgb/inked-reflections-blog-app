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
import { useDispatch } from "react-redux";

import { toggleMenu } from "../../features/app-menu/toggle-menu";

const ICON_SIZE = 20;

export default function Menu() {
  const [activeButton, SetActiveButton] = useState("home");
  const dispatch = useDispatch();
  function handleToggleMenuState() {
    dispatch(toggleMenu());
  }

  function handleActiveButton(buttonName) {
    if (typeof activeButton !== "string") return;
    SetActiveButton(buttonName);
  }

  return (
    <aside className={styles["menu"]}>
      <div className={styles["menu-container"]}>
        <MenuButton fn={handleToggleMenuState}>
          <HamburgerSolidIcon size={ICON_SIZE} />
        </MenuButton>

        <div className={styles["menu-actions-1"]}>
          <MenuButton
            destination="/"
            title="Home"
            active={activeButton === "home" ? "menu-button__active" : ""}
            fn={() => handleActiveButton("home")}
          >
            {activeButton === "home" ? (
              <HomeSolidIcon size={ICON_SIZE} />
            ) : (
              <HomeIcon size={ICON_SIZE} />
            )}
          </MenuButton>

          <MenuButton
            destination="/explore"
            active={activeButton === "search" ? true : false}
            fn={() => handleActiveButton("search")}
            title="Explore"
          >
            {activeButton === "search" ? (
              <SearchSolidIcon size={ICON_SIZE} />
            ) : (
              <SearchIcon size={ICON_SIZE} />
            )}
          </MenuButton>

          <MenuButton
            destination="/reflections"
            active={activeButton === "reflections" ? true : false}
            fn={() => handleActiveButton("reflections")}
            title="Reflections"
          >
            {activeButton === "reflections" ? (
              <ReflectionsSolidIcon size={ICON_SIZE} />
            ) : (
              <ReflectionsIcon size={ICON_SIZE} />
            )}
          </MenuButton>

          <MenuButton
            destination="/bookmarks"
            active={activeButton === "bookmarks" ? true : false}
            fn={() => handleActiveButton("bookmarks")}
            title="Bookmarks"
          >
            {activeButton === "bookmarks" ? (
              <BookmarksSolidIcon size={ICON_SIZE} />
            ) : (
              <BookmarksIcon size={ICON_SIZE} />
            )}
          </MenuButton>

          <MenuButton
            destination="/profile"
            title="Profile"
            active={activeButton === "profile" ? true : false}
            fn={() => handleActiveButton("profile")}
          >
            {activeButton === "profile" ? (
              <ProfileSolidIcon size={ICON_SIZE} />
            ) : (
              <ProfileIcon size={ICON_SIZE} />
            )}
          </MenuButton>

          <MenuButton
            destination="/settings"
            active={activeButton === "settings" ? true : false}
            fn={() => handleActiveButton("settings")}
            title="Settings"
          >
            {activeButton === "settings" ? (
              <SettingsSolidIcon size={ICON_SIZE} />
            ) : (
              <SettingsIcon size={ICON_SIZE} />
            )}
          </MenuButton>

          <MenuButton
            destination="/help"
            active={activeButton === "help" ? true : false}
            fn={() => handleActiveButton("help")}
            title="Help"
          >
            {activeButton === "help" ? (
              <HelpSolidIcon size={ICON_SIZE} />
            ) : (
              <HelpIcon size={ICON_SIZE} />
            )}
          </MenuButton>
        </div>

        <div className={styles["menu-actions-2"]}>
          {/* Create a new button for these instead? */}
          <MenuButton title="Dark">
            <MoonIcon size={ICON_SIZE} />
          </MenuButton>
          <MenuButton title="Signout">
            {/* Future me make a modal popup */}
            <SignoutIcon size={ICON_SIZE} />
          </MenuButton>
        </div>
      </div>
    </aside>
  );
}
