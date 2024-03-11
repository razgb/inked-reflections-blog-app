import MainContent from "../../shared/ui/main-content/MainContent";
import PageLayoutTemplate from "../../shared/ui/page-layout-template/PageLayoutTemplate";
import SidebarContent from "../../shared/ui/sidebar-content/SidebarContent";

import Explore from "../../widgets/explore/Explore.jsx";
import ReflectionsPlusAdvert from "../../widgets/reflections-plus/ReflectionsPlusAdvert";
import RecentlySavedPosts from "../../widgets/saved-post/RecentlySavedPosts";
import ErrorMessage from "../../widgets/error-message/ErrorMessage.jsx";

export default function ExplorePage() {
  return (
    <PageLayoutTemplate>
      <MainContent>
        <Explore />
        <ErrorMessage />
      </MainContent>
      <SidebarContent>
        <RecentlySavedPosts />
        <ReflectionsPlusAdvert />
      </SidebarContent>
    </PageLayoutTemplate>
  );
}
