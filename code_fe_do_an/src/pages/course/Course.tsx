import { CourseItem } from "@/components/course";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import { CourseResponse } from "@/type";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Course() {
  const [courseList, setCourseList] = useState<CourseResponse[]>([]);
  const [widthScreen, setWidthScreen] = useState(window.innerWidth);

  useEffect(() => {
    const handleFetchData = async () => {
      let token = "";
      let accountId;
      const userEncode = localStorage.getItem("user");
      if (userEncode) {
        const userDecode = JSON.parse(userEncode);
        token = userDecode?.token;
        accountId = userDecode?.account_id;
      }
      const request = await axios.post("/all_course_extend", { accountId }, {
        headers: {
          Authorization: token,
        },
      });
      const response = request.data;
      if (response.statusCode === 200) {
        console.log(response);
        setCourseList(response.data);
      }
    };
    handleFetchData();
  }, []);

  useEffect(() => {
    const updateWidth = () => setWidthScreen(window.innerWidth);
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div className="w-full h-full bg-center bg-cover" style={{ backgroundImage: `url("/public/bg2.jpg")` }}>
      <div className="flex flex-col w-full h-full">
        <div className="bg-[#f2fae9]">
          <Header />
        </div>
        <div className="w-full container max-w-[1400px] h-fit p-7">
          <div className="container w-full h-full p-10 flex flex-col gap-y-7 items-center bg-[#f2fae9]">
            <div className="text-2xl font-semibold text-[#78b24d]">
              KHÓA HỌC
            </div>
            {courseList.map((courseData: CourseResponse, index) => (
              <CourseItem
                key={index}
                course_name={courseData.course_name}
                course_id={courseData.course_id}
                course_image={courseData.course_image}
                description={courseData.description}
                week={courseData.week}
                totalProgress={courseData.totalProgress}
              />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
