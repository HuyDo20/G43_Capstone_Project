import CourseDetailPage from "@/pages/admin/course-detail";
import CourseManagementPage from "@/pages/admin/course-management";
import UserManagementPage from "@/pages/admin/user-management";
import CourseCreateExamPage from "@/pages/admin/course-exam-create";
import ExamCreatePage from "@/pages/admin/course-exam-create";
import ExamManagementPage from "@/pages/admin/exam-management";
import ExamAssignPage from "@/pages/admin/assign-exam-to-course";
import NotiManagementPage from "@/pages/admin/notification/notification-management";
import NotificationCreator from "@/pages/admin/notification/notification-creator";

export const adminRoutes = [
  { path: "user-management", element: UserManagementPage },
  { path: "course-management", element: CourseManagementPage },
  { path: "course-management/manage", element: CourseManagementPage },
  { path: "course-management/create", element: CourseDetailPage },
  { path: "course-management/:id", element: CourseDetailPage },
  { path: "exam-management/create", element: ExamCreatePage },
  { path: "exam-management/manage", element: ExamManagementPage },
  { path: "exam-management/assign", element: ExamAssignPage },
  { path: "notification/manage", element: NotiManagementPage },
  { path: "notification/create", element: NotificationCreator },

];
