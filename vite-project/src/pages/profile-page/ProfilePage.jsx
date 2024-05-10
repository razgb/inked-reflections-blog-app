import MainContent from "../../shared/ui/main-content/MainContent";
import PageLayoutTemplate from "../../shared/ui/page-layout-template/PageLayoutTemplate";
import SidebarContent from "../../shared/ui/sidebar-content/SidebarContent";
// import ReflectionsPlusAdvert from "../../widgets/reflections-plus/ReflectionsPlusAdvert";
import RecentBookmarksContainer from "../../widgets/recent-bookmarks/RecentBookmarksContainer";
import UserProfileContainer from "../../widgets/user-profile/UserProfileContainer";

export default function ProfilePage() {
  return (
    <PageLayoutTemplate>
      <MainContent>
        <UserProfileContainer />
      </MainContent>
      <SidebarContent>
        <RecentBookmarksContainer />
      </SidebarContent>
    </PageLayoutTemplate>
  );
}
