import PageLayoutTemplate from "../../shared/ui/page-layout-template/PageLayoutTemplate.jsx";
import MainContent from "../../shared/ui/main-content/MainContent.jsx";
import SidebarContent from "../../shared/ui/sidebar-content/SidebarContent.jsx";
import styles from "./HomePage.module.css";

import UserPostsContainer from "../../widgets/user-post/UserPostsContainer.jsx";
import RecentlySavedPosts from "../../widgets/saved-post/RecentlySavedPosts.jsx";
import ReflectionsPlusAdvert from "../../widgets/reflections-plus/ReflectionsPlusAdvert.jsx";

export default function HomePage() {
  return (
    <PageLayoutTemplate>
      <MainContent>
        <UserPostsContainer />
      </MainContent>

      <SidebarContent>
        <RecentlySavedPosts />
        {/* <WhoToFollow />  */}
        <ReflectionsPlusAdvert />
      </SidebarContent>
    </PageLayoutTemplate>
  );
}
