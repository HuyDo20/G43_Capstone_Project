import { CourseItem } from "@/components/course";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import { CourseResponse } from "@/type";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Course() {
  const [courseList, setCourseList] = useState<[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const fetchData = useAuthAPI()
  useEffect(() => {
    const handleFetchData = async () => {
      let token = "";
      const userEncode = localStorage.getItem("user");
      if (userEncode) {
        const userDecode = JSON.parse(userEncode);
        token = userDecode?.token;
      }
      const request = await axios.get("/all_course", {
        headers: {
          Authorization: token,
        },
      });
      const response = request.data;
      if (response.statusCode === 200) {
        setCourseList(response.data);
      }
    };
    handleFetchData();
  }, []);

  return (
    <div
      className="w-full h-full bg-center bg-cover"
      style={{ backgroundImage: `url("/public/bg2.png")` }}
    >
      <div className="flex flex-col w-full h-full">
        <div className="bg-[#f2fae9] mb-10">
          <Header />
        </div>

        <div className="container max-w-[1400px] w-full h-fit p-7">
          <div className="w-full h-full rounded-2xl">
            <div className="container w-full h-[1000px] p-10 flex flex-col gap-y-7 items-center bg-[#f2fae9] rounded-md shadow-md">
              <div className="text-2xl font-semibold text-[#78b24d]">
                KHÓA HỌC
              </div>
              {courseList.map((courseData: CourseResponse, index) => {
                return (
                  <CourseItem
                    key={index}
                    course_name={courseData.course_name}
                    course_id={courseData.course_id}
                    course_image={courseData.course_image}
                    description={courseData.description}
                    week={courseData.week}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="">
          <Footer />
        </div>
      </div>
    </div>
  );
}
