import MainContent from "../../shared/ui/main-content/MainContent";
import PageLayoutTemplate from "../../shared/ui/page-layout-template/PageLayoutTemplate";
import SidebarContent from "../../shared/ui/sidebar-content/SidebarContent";
import ReflectionsPlusAdvert from "../../widgets/reflections-plus/ReflectionsPlusAdvert";
import RecentlySavedPosts from "../../widgets/saved-post/RecentlySavedPosts";
import UserReflections from "../../widgets/user-reflections/UserReflections";

export default function ReflectionsPage() {
  return (
    <PageLayoutTemplate>
      <MainContent>
        <UserReflections />
      </MainContent>
      <SidebarContent>
        <RecentlySavedPosts />
        <ReflectionsPlusAdvert />
      </SidebarContent>
    </PageLayoutTemplate>
  );
}
