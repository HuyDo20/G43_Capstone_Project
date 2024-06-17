import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import ForgotPassword from "./pages/authentication/ForgotPassword";
import Admin from "./pages/admin/Admin";
import GetAuthenticationCode from "./pages/authentication/GetAuthenticationCode";
import GetNewPassword from "./pages/authentication/GetNewPassword";
import UserProfile from "./pages/userProfie/UserProfile";
import GetNewPWSuccess from "./pages/authentication/GetNewPWSuccess";
import AuthProvider from "./hook/AuthContext";
import Alphabet from "./pages/alphabet/Alphabet";
import Course from "./pages/course/Course";
import LearningByWeek from "./pages/course/LearningByWeek";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route
            path="/getAuthenticationCode"
            element={<GetAuthenticationCode />}
          />
          <Route path="/getNewPassword" element={<GetNewPassword />} />
          <Route path="/getNewPWSuccess" element={<GetNewPWSuccess />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/alphabet" element={<Alphabet />} />
          <Route path="/course" element={<Course />} />
          <Route path="/learningByWeek" element={<LearningByWeek />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
