import PageLayoutTemplate from "../../shared/ui/page-layout-template/PageLayoutTemplate";
import MainContent from "../../shared/ui/main-content/MainContent";
import SidebarContent from "../../shared/ui/sidebar-content/SidebarContent";
import UserPostExpanded from "../../widgets/user-post/expanded/UserPostExpanded";
import ReflectionsPlusAdvert from "../../widgets/reflections-plus/ReflectionsPlusAdvert";
import RecentBookmarksContainer from "../../widgets/bookmarked-posts/RecentBookmarksContainer";

export default function PostDetailsPage() {
  return (
    <>
      <PageLayoutTemplate>
        <MainContent>
          <UserPostExpanded />
        </MainContent>
        <SidebarContent>
          <RecentBookmarksContainer />
          <ReflectionsPlusAdvert />
        </SidebarContent>
      </PageLayoutTemplate>
    </>
  );
}
