import { Flex, Spin } from "antd";
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./hook/AuthContext";
import Alphabet from "./pages/alphabet/Alphabet";
import ForgotPassword from "./pages/authentication/ForgotPassword";
import GetAuthenticationCode from "./pages/authentication/GetAuthenticationCode";
import GetNewPassword from "./pages/authentication/GetNewPassword";
import GetNewPWSuccess from "./pages/authentication/GetNewPWSuccess";
import Course from "./pages/course/Course";
import Grammar from "./pages/course/Grammar";
import GrammarDetail from "./pages/course/GrammarDetail";
import Kanji from "./pages/course/Kanji";
import LearningByWeek from "./pages/course/LearningByWeek";
import Video from "./pages/course/Video";
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
            <Route path="/learningByWeek/:id" element={<LearningByWeek />} />
            <Route
              path="/:id/:week_id/:day_id/vocabulary"
              element={<Vocabulary />}
            />
            <Route path="/:id/:week_id/:day_id/kanji" element={<Kanji />} />
            <Route path="/:id/:week_id/:day_id/grammar" element={<Grammar />} />
            <Route path="/:id/:week_id/:day_id/video" element={<Video />} />
            <Route
              path="/:id/:week_id/:day_id/grammar/detail/:grammar_id"
              element={<GrammarDetail />}
            />
            <Route path="/admin/*" element={<AdminRoutes />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
