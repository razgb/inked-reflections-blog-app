import MainContent from "../../shared/ui/main-content/MainContent";
import PageLayoutTemplate from "../../shared/ui/page-layout-template/PageLayoutTemplate";
import SidebarContent from "../../shared/ui/sidebar-content/SidebarContent";
// import ReflectionsPlusAdvert from "../../widgets/reflections-plus/ReflectionsPlusAdvert";
import RecentBookmarksContainer from "../../widgets/recent-bookmarks/RecentBookmarksContainer";
import ProfileFeedContainer from "../../widgets/user-profile/ProfileFeedContainer";

export default function ProfilePage() {
  return (
    <PageLayoutTemplate>
      <MainContent>
        <ProfileFeedContainer />
      </MainContent>
      <SidebarContent>
        <RecentBookmarksContainer />
      </SidebarContent>
    </PageLayoutTemplate>
  );
}
