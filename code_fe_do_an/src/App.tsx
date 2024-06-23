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
          <Route path="/vocabulary" element={<Vocabulary />} />
          <Route path="/kanji" element={<Kanji />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
