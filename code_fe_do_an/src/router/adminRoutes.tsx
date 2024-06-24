import CourseCreatePage from "@/pages/admin/course-create";
import CourseManagementPage from "@/pages/admin/course-management";
import UserManagementPage from "@/pages/admin/user-management";

export const adminRoutes = [
  { path: "user-management", element: UserManagementPage },
  { path: "course-management", element: CourseManagementPage },
  { path: "course-management/manage", element: CourseManagementPage },
  { path: "course-management/create", element: CourseCreatePage },
];
