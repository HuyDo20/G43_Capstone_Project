import { CourseItem } from "@/components/course";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import { CourseResponse } from "@/type";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Course() {
  const [courseList, setCourseList] = useState<CourseResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(2); // Number of courses to display per page

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
    const handleResize = () => {
      setWidthScreen(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const lastCourseIndex = currentPage * coursesPerPage;
  const firstCourseIndex = lastCourseIndex - coursesPerPage;
  const currentCourses = courseList.slice(firstCourseIndex, lastCourseIndex);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const renderCourses = () => (
    <div className="container w-full h-full p-10 flex flex-col gap-y-7 items-center bg-[#f2fae9]">
      <div className="text-2xl font-semibold text-[#78b24d]">KHÓA HỌC</div>
      {currentCourses.map((courseData: CourseResponse, index) => (
        <CourseItem
          key={index}
          course_name={courseData.course_name}
          course_id={courseData.course_id}
          course_image={courseData.course_image}
          description={courseData.description}
          week={courseData.week}
        />
      ))}
      <Pagination
        coursesPerPage={coursesPerPage}
        totalCourses={courseList.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );

  return (
    <div
      className="w-full h-full bg-center bg-cover"
      style={{ backgroundImage: `url("/public/bg2.jpg")` }}
    >
      <div className="flex flex-col w-full h-full">
        <div className="bg-[#f2fae9]">
          <Header />
        </div>

        <div className="w-full container max-w-[1400px] h-fit p-7">
          {renderCourses()}
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

interface PaginationProps {
  coursesPerPage: number;
  totalCourses: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination = ({ coursesPerPage, totalCourses, paginate, currentPage }: PaginationProps) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCourses / coursesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination flex justify-center mt-4 space-x-2">
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
            <button
              onClick={() => paginate(number)}
              className={`page-link px-3 py-1 rounded-md focus:outline-none ${number === currentPage ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
