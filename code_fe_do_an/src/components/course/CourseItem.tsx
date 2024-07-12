import { CourseResponse } from "@/type";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

const CourseItem: React.FC<CourseResponse> = (course: CourseResponse) => {
  const navigate = useNavigate();

  const handleEnroll = (id) => {
    navigate(`/learningByWeek/${id}`);
  };

  return (
    <div className="flex flex-col items-center w-full gap-3">
      <div className="w-[1100px] h-[220px] bg-[#b6da9f] rounded-2xl justify-around flex flex-row py-5 items-center">
        <img className="w-1/4 h-full rounded-2xl" src={course.course_image} />
        <div className="flex flex-col w-1/2 h-full gap-3 p-2">
          <div className="text-xl font-semibold">{course.course_name}</div>
          <div className="text-justify">{course.description}</div>
          <div className="flex flex-row items-center gap-3">
            <Progress className="h-[10px] basis-11/12 " value={70} />
            <div className="basis-1/12">70%</div>
          </div>
        </div>
        <Button onClick={() => handleEnroll(course.course_id)}>Vào học</Button>
      </div>
    </div>
  );
};

export default CourseItem;
