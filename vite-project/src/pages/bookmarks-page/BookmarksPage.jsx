import MainContent from "../../shared/ui/main-content/MainContent";
import PageLayoutTemplate from "../../shared/ui/page-layout-template/PageLayoutTemplate";
import SidebarContent from "../../shared/ui/sidebar-content/SidebarContent";
import Bookmarks from "../../widgets/bookmarks/Bookmarks.jsx";
import ReflectionsPlusAdvert from "../../widgets/reflections-plus/ReflectionsPlusAdvert.jsx";

export default function BookmarksPage() {
  return (
    <PageLayoutTemplate>
      <MainContent>
        <Bookmarks />
      </MainContent>
      <SidebarContent>
        <ReflectionsPlusAdvert />
      </SidebarContent>
    </PageLayoutTemplate>
  );
}

/**
 * Plans for future:
 *
 * - Introduce filtering features by date
 */
