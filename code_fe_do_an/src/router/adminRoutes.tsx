import CourseDetailPage from "@/pages/admin/course-detail";
import CourseManagementPage from "@/pages/admin/course-management";
import UserManagementPage from "@/pages/admin/user-management";
import CourseCreateExamPage from "@/pages/admin/course-exam-create";

export const adminRoutes = [
  { path: "user-management", element: UserManagementPage },
  { path: "course-management", element: CourseManagementPage },
  { path: "course-management/manage", element: CourseManagementPage },
  { path: "course-management/create", element: CourseDetailPage },
  { path: "course-management/:id", element: CourseDetailPage },
  { path: "course-exam-create", element: CourseCreateExamPage }
];
