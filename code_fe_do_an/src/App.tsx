import { Flex, Spin } from "antd";
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./hook/AuthContext";
import Admin from "./pages/admin/Admin";
import Alphabet from "./pages/alphabet/Alphabet";
import ForgotPassword from "./pages/authentication/ForgotPassword";
import GetAuthenticationCode from "./pages/authentication/GetAuthenticationCode";
import GetNewPWSuccess from "./pages/authentication/GetNewPWSuccess";
import GetNewPassword from "./pages/authentication/GetNewPassword";
import Course from "./pages/course/Course";
import Kanji from "./pages/course/Kanji";
import LearningByWeek from "./pages/course/LearningByWeek";
import Vocabulary from "./pages/course/Vocabulary";
import Home from "./pages/home/Home";
import UserProfile from "./pages/userProfie/UserProfile";

const contentStyle = {
  padding: 50,
  borderRadius: 4,
};
const content = <div style={contentStyle} />;

const AdminRoutes = lazy(() => import("@/pages/admin/"));

const SpinnerComponent = (
  <Flex
    gap="small"
    vertical
    style={{
      height: "100vh",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Spin tip="Loading" size="large">
      {content}
    </Spin>
  </Flex>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={SpinnerComponent}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route
              path="/getAuthenticationCode"
              element={<GetAuthenticationCode />}
            />
            <Route path="/getNewPassword" element={<GetNewPassword />} />
            <Route path="/getNewPWSuccess" element={<GetNewPWSuccess />} />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/alphabet" element={<Alphabet />} />
            <Route path="/course" element={<Course />} />
            <Route path="/learningByWeek" element={<LearningByWeek />} />
            <Route path="/vocabulary" element={<Vocabulary />} />
            <Route path="/kanji" element={<Kanji />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
