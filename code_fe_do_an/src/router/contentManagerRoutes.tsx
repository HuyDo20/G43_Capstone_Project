import CourseDetailPage from "@/pages/contentManager/course-detail";
import CourseManagementPage from "@/pages/contentManager/course-management";

export const contentManagerRoutes = [
  { path: "course-management", element: CourseManagementPage },
  { path: "course-management/manage", element: CourseManagementPage },
  { path: "course-management/:id", element: CourseDetailPage },
];
