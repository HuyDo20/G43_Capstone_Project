import CourseDetailPage from "@/pages/admin/course-detail";
import CourseManagementPage from "@/pages/admin/course-management";
import NotiManagementPage from "@/pages/admin/notification-management";
import UserManagementPage from "@/pages/admin/user-management";

export const adminRoutes = [
  { path: "user-management", element: UserManagementPage },
  { path: "course-management", element: CourseManagementPage },
  { path: "course-management/manage", element: CourseManagementPage },
  { path: "course-management/create", element: CourseDetailPage },
  { path: "notification/list", element: NotiManagementPage },
  { path: "course-management/:id", element: CourseDetailPage },
];
