import MainContent from "../../shared/ui/main-content/MainContent";
import PageLayoutTemplate from "../../shared/ui/page-layout-template/PageLayoutTemplate";
import SidebarContent from "../../shared/ui/sidebar-content/SidebarContent";
import BookmarkFeedContainer from "../../widgets/bookmarks/BookmarkFeedContainer.jsx";
import RecentBookmarksContainer from "../../widgets/recent-bookmarks/RecentBookmarksContainer.jsx";
import ReflectionsPlusAdvert from "../../widgets/reflections-plus/ReflectionsPlusAdvert.jsx";

export default function BookmarksPage() {
  return (
    <PageLayoutTemplate>
      <MainContent>
        <BookmarkFeedContainer />
      </MainContent>
      <SidebarContent>
        <RecentBookmarksContainer />
        <ReflectionsPlusAdvert />
      </SidebarContent>
    </PageLayoutTemplate>
  );
}
