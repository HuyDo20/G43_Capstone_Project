import { DaySchedule, ResetDeadline } from "@/components/course";
import React from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hook/AuthContext";
import Header from "@/layout/header/Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Progress } from "../../components/ui/progress";

export default function LearningByWeek() {
  const { id } = useParams();
  const { handleFetch } = useAuth();
  const [reload, setReload] = useState(true);
  const [courseData, setCourseData] = useState([]);
  const [weekData, setWeekData] = useState([]);
  const [weekSelected, setWeekSelected] = useState([]);


  useEffect(() => {
    const handleFetchData = async () => {
      const response = await handleFetch({
        method: "get",
        url: `/course-detail/${id}`,
      });
      if (response.statusCode === 200) {
        const result = response.data;
        setCourseData(result.courseData);
        setWeekData(result.weekData);
        setWeekSelected(result.weekData[0]);
      }
    };

    if (reload) {
      handleFetchData();
      setReload(false);
      }
    
  }, [reload,weekSelected]);
  return (
 
    <div>
      <div className="bg-[#f2fae9]">
        <Header />
      </div>
      <div className="container flex flex-row w-full h-fit">
        <div className="basis-1/5 h-[900px] flex flex-col items-center p-5 shadow-lg gap-7">
          <div className="text-2xl text-[#56a251] font-semibold">Tuần học</div>
          <div className="flex flex-col w-full h-full gap-3">
            {weekData.map((item, index) => (
              <Button
                className={
                  weekSelected?.week_id === item?.week_id
                    ? ""
                    : "text-black bg-white hover:bg-[#2dac5c] hover:text-white text-base"
                }
                key={index}
                onClick={() => setWeekSelected(item)}
              >
                {item?.week_name}
              </Button>
            ))}
          </div>
        </div>
        <div className="basis-4/5 h-[800px] pt-7 pl-11 flex flex-col">
          <div>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/course"
                    className="text-2xl font-semibold"
                  >
                    Khóa học
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-2xl font-semibold">
                    {courseData?.course_name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-2xl font-semibold">
                    {weekSelected?.week_topic}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {/*start */}


<div className="flex flex-row justify-between gap-10 pt-10">
  <div className="basis-4/5"> {/* DaySchedule section set to 80% width */}
    <DaySchedule weekSelected={weekSelected} id={id} />
  </div>
  <div className="basis-1/5 flex flex-col gap-4 p-6 border border-[#56a251] rounded-lg bg-[#f9f9f9] shadow-md self-start"> {/* Styled course progress section with height adjustment */}
    <div className="text-lg font-semibold text-[#56a251] text-center mb-2">Quá trình</div> {/* Section Title */}
    <div className="flex flex-row items-center gap-2">
      <div className="basis-2/5 text-sm">Từ vựng</div> {/* Adjusted text size */}
      <Progress className="h-[8px] basis-3/5" value={10} /> {/* Adjusted progress bar */}
      <div className="text-[#9cda58] text-xs">{10}%</div> {/* Adjusted percentage size */}
    </div>
    <div className="flex flex-row items-center gap-2">
      <div className="basis-2/5 text-sm">Kanji</div>
      <Progress className="h-[8px] basis-3/5" value={10} />
      <div className="text-[#9cda58] text-xs">{10}%</div>
    </div>
    <div className="flex flex-row items-center gap-2">
      <div className="basis-2/5 text-sm">Ngữ pháp</div>
      <Progress className="h-[8px] basis-3/5" value={10} />
      <div className="text-[#9cda58] text-xs">{10}%</div>
    </div>
    <div className="flex flex-row items-center gap-2">
      <div className="basis-2/5 text-sm">Video</div>
      <Progress className="h-[8px] basis-3/5" value={10} />
      <div className="text-[#9cda58] text-xs">{10}%</div>
    </div>
  </div>
</div>



          
          {/*end */}

        </div>
      </div>
    </div>
  );
}
