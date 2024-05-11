import PageLayoutTemplate from "../../shared/ui/page-layout-template/PageLayoutTemplate.jsx";
import MainContent from "../../shared/ui/main-content/MainContent.jsx";
import SidebarContent from "../../shared/ui/sidebar-content/SidebarContent.jsx";

import MainFeedContainer from "../../widgets/user-post/MainFeedContainer.jsx";
import RecentBookmarksContainer from "../../widgets/recent-bookmarks/RecentBookmarksContainer.jsx";
import ReflectionsPlusAdvert from "../../widgets/reflections-plus/ReflectionsPlusAdvert.jsx";

export default function HomePage() {
  return (
    <PageLayoutTemplate>
      <MainContent>
        <MainFeedContainer />
      </MainContent>

      <SidebarContent>
        <RecentBookmarksContainer />
        <ReflectionsPlusAdvert />
      </SidebarContent>
    </PageLayoutTemplate>
  );
}

// Maybe in the future.
{
  /* <WhoToFollow />  */
}
