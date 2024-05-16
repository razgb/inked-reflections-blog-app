import MainContent from "../../shared/ui/main-content/MainContent";
import PageLayoutTemplate from "../../shared/ui/page-layout-template/PageLayoutTemplate";
import SidebarContent from "../../shared/ui/sidebar-content/SidebarContent";
import RecentBookmarksContainer from "../../widgets/recent-bookmarks/RecentBookmarksContainer";
import EditUserProfile from "../../widgets/edit-user-profile/EditUserProfile";

export default function EditUserProfilePage() {
  return (
    <PageLayoutTemplate>
      <MainContent>
        <EditUserProfile />
      </MainContent>
      <SidebarContent>
        <RecentBookmarksContainer />
      </SidebarContent>
    </PageLayoutTemplate>
  );
}
