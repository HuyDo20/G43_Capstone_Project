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

  const [widthScreen, setWidthScreen] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidthScreen(window.innerWidth);
    });
    return () =>
      window.removeEventListener("resize", () => {
        setWidthScreen(window.innerWidth);
      });
  }, []);
if(widthScreen >= 1100)
  return (
    <div className="flex flex-col w-full h-full bg-[#d5e9be]">
      <div className="bg-[#f2fae9]">
        <Header />
      </div>
      
      <div className="w-full h-fit p-7">
          <div className="container w-full h-full p-10 flex flex-col gap-y-7 items-center bg-[#fff8e1]">
            <div className="text-2xl font-semibold text-[#78b24d]">
              KHÓA HỌC
            </div>
            {courseList.map((courseData: CourseResponse, index)=>{
              return(
                <CourseItem
                key={index}
                course_name={courseData.course_name}
                course_id={courseData.course_id}
                course_image={courseData.course_image}
                description={courseData.description}
                week={courseData.week}
                />
              )
            })}
        </div>
      </div>
      <div className="bg-[#f2fae9]">
        <Footer />
      </div>
    </div>
  );
if(widthScreen < 1100)
  return (
    <div className="flex flex-col w-full h-full bg-[#f7ecc7]">
      <div className="bg-[#fff8e1]">
        <Header />
      </div>
 
      <div className="container w-full h-fit p-7">
        <div className="w-full h-full rounded-2xl">
          <div className="container w-full h-auto p-10 flex flex-col gap-y-7 items-center bg-[#fff8e1]">
            <div className="text-2xl font-semibold text-[#78b24d]">KHÓA HỌC</div>
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
      <div className="bg-[#fff8e1]">
        <Footer />
      </div>
    </div>
  ) 
}
