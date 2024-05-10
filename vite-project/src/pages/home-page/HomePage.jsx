import PageLayoutTemplate from "../../shared/ui/page-layout-template/PageLayoutTemplate.jsx";
import MainContent from "../../shared/ui/main-content/MainContent.jsx";
import SidebarContent from "../../shared/ui/sidebar-content/SidebarContent.jsx";

import PostFeedContainer from "../../widgets/user-post/PostFeedContainer.jsx";
import RecentBookmarksContainer from "../../widgets/recent-bookmarks/RecentBookmarksContainer.jsx";
import ReflectionsPlusAdvert from "../../widgets/reflections-plus/ReflectionsPlusAdvert.jsx";

export default function HomePage() {
  return (
    <PageLayoutTemplate>
      <MainContent>
        <PostFeedContainer />
      </MainContent>

      <SidebarContent>
        <RecentBookmarksContainer />
        {/* <WhoToFollow />  */}
        <ReflectionsPlusAdvert />
      </SidebarContent>
    </PageLayoutTemplate>
  );
}
