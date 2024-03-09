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
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../../features/app-menu/toggle-menu";

const ICON_SIZE = 20;

export default function Menu() {
  const menuOpenState = useSelector((state) => state.menu.menuOpenState);

  const dispatch = useDispatch();
  function handleToggleMenuState() {
    dispatch(toggleMenu());
  }

  const [activeLink, setActiveLink] = useState(window.location.pathname);
  function handleUrlChange(destination, activeLink) {
    if (activeLink !== destination) {
      setActiveLink(destination);
    }
  }

  return (
    <aside className={styles["menu"]}>
      <div className={styles["menu-container"]}>
        <MenuButton toggleMenu={handleToggleMenuState}>
          <HamburgerSolidIcon size={ICON_SIZE} />
        </MenuButton>

        <div className={styles["menu-actions-1"]}>
          <MenuButton
            destination="/posts"
            handleUrlChange={handleUrlChange}
            activeLink={activeLink}
            title="Home"
            open={menuOpenState}
          >
            {activeLink.includes("posts") ? (
              <HomeSolidIcon size={ICON_SIZE} />
            ) : (
              <HomeIcon size={ICON_SIZE} />
            )}
          </MenuButton>

          <MenuButton
            destination="/explore"
            handleUrlChange={handleUrlChange}
            activeLink={activeLink}
            title="Explore"
            open={menuOpenState}
          >
            {activeLink.includes("explore") ? (
              <SearchSolidIcon size={ICON_SIZE} />
            ) : (
              <SearchIcon size={ICON_SIZE} />
            )}
          </MenuButton>

          <MenuButton
            destination="/reflections"
            handleUrlChange={handleUrlChange}
            activeLink={activeLink}
            title="Reflections"
            open={menuOpenState}
          >
            {activeLink.includes("reflections") ? (
              <ReflectionsSolidIcon size={ICON_SIZE} />
            ) : (
              <ReflectionsIcon size={ICON_SIZE} />
            )}
          </MenuButton>

          <MenuButton
            destination="/bookmarks"
            handleUrlChange={handleUrlChange}
            activeLink={activeLink}
            title="Bookmarks"
            open={menuOpenState}
          >
            {activeLink.includes("bookmarks") ? (
              <BookmarksSolidIcon size={ICON_SIZE} />
            ) : (
              <BookmarksIcon size={ICON_SIZE} />
            )}
          </MenuButton>

          <MenuButton
            destination="/profile"
            title="Profile"
            open={menuOpenState}
            handleUrlChange={handleUrlChange}
            activeLink={activeLink}
          >
            {activeLink.includes("profile") ? (
              <ProfileSolidIcon size={ICON_SIZE} />
            ) : (
              <ProfileIcon size={ICON_SIZE} />
            )}
          </MenuButton>

          <MenuButton
            destination="/settings"
            handleUrlChange={handleUrlChange}
            activeLink={activeLink}
            title="Settings"
            open={menuOpenState}
          >
            {activeLink.includes("settings") ? (
              <SettingsSolidIcon size={ICON_SIZE} />
            ) : (
              <SettingsIcon size={ICON_SIZE} />
            )}
          </MenuButton>

          <MenuButton
            destination="/help"
            handleUrlChange={handleUrlChange}
            activeLink={activeLink}
            title="Help"
            open={menuOpenState}
          >
            {activeLink.includes("help") ? (
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

/*
This is a save of the menu element incase i fuck up: 


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
    //       <MenuButton title="Dark">
    //         <MoonIcon size={ICON_SIZE} />
    //       </MenuButton>
    //       <MenuButton title="Signout">
    //         <SignoutIcon size={ICON_SIZE} />
    //       </MenuButton>
    //     </div>
    //   </div>
    // </aside>


*/
