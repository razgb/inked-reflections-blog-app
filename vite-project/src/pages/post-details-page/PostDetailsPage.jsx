import styles from "./PostDetailsPage.module.css";

import PageLayoutTemplate from "../../shared/ui/page-layout-template/PageLayoutTemplate";
import MainContent from "../../shared/ui/main-content/MainContent";
import SidebarContent from "../../shared/ui/sidebar-content/SidebarContent";
import UserPostExpanded from "../../widgets/user-post/UserPostExpanded";
import ReflectionsPlusAdvert from "../../widgets/reflections-plus/ReflectionsPlusAdvert";
import RecentlySavedPosts from "../../widgets/saved-post/RecentlySavedPosts";

export default function PostDetailsPage() {
  return (
    <>
      <PageLayoutTemplate>
        <MainContent>
          <UserPostExpanded />
        </MainContent>
        <SidebarContent>
          <RecentlySavedPosts />
          <ReflectionsPlusAdvert />
        </SidebarContent>
      </PageLayoutTemplate>
    </>
  );
}
