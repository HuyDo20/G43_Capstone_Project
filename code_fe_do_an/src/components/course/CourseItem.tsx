import { CourseResponse } from "@/type";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const CourseItem: React.FC<CourseResponse> = (course:CourseResponse) => {

    const navigate = useNavigate();
    
    const handleEnroll = () => {
      navigate("/learningByWeek");
    }
    
  return (
    <div className="flex flex-col items-center w-full gap-3">
              <div className="w-[1100px] h-[220px] bg-[#ffcc80] rounded-2xl justify-around flex flex-row py-5 items-center">
                <img className="w-1/4 h-full rounded-2xl" src={course.course_image} />
                <div className="flex flex-col w-1/2 h-full gap-5 p-4">
                  <div className="text-xl font-semibold">
                    {course.course_name}
                  </div>
                  <div>{course.description}</div>
                </div>
                <Button onClick={handleEnroll}>Vào học</Button>
              </div>
            </div>
  )
}

export default CourseItem;