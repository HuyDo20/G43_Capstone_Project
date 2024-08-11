import CourseDetailPage from "@/pages/admin/course-detail";
import CourseManagementPage from "@/pages/admin/course-management";
import NotificationCreator from "@/pages/admin/notification/notification-creator";
import NotiManagementPage from "@/pages/admin/notification/notification-management";
import UserManagementPage from "@/pages/admin/user-management";

export const adminRoutes = [
  { path: "user-management", element: UserManagementPage },
  { path: "course-management", element: CourseManagementPage },
  { path: "course-management/manage", element: CourseManagementPage },
  { path: "course-management/create", element: CourseDetailPage },
  { path: "notification/manage", element: NotiManagementPage },
  { path: "notification/create", element: NotificationCreator },
  { path: "course-management/:id", element: CourseDetailPage },
];
