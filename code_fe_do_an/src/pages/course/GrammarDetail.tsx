import { DaySchedule } from "@/components/course";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Header from "@/layout/header/Header";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function GrammarDetail() {

const navigate = useNavigate();
  
const handleBack = () => {
  navigate("/grammar");
}
  
  return (
    <div>
      {/* Header */}
      <div className="bg-[#fff8e1]">
        <Header />
      </div>
      {/* Body*/}
      <div className="flex flex-row">
        {/* DaySchedule*/}
        <div className="p-5 shadow-md basis-1/6 h-[830px]">
          <DaySchedule />
        </div>
        {/* Content*/}
        <div className="flex flex-col basis-5/6 pt-7 pl-11">
          {/* Breadcrumb*/}
          <div className="">
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
                  <BreadcrumbLink
                    href="/learningByWeek"
                    className="text-2xl font-semibold"
                  >
                    Tiếng Nhật cơ bản 1
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-2xl font-semibold">
                    Tuần 1
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {/* Grammar List*/}
          <div className="w-[1200px] h-[700px] ml-28 bg-[#d1eeb0] mt-5 rounded-lg flex flex-col gap-5 pb-5">
            <div className="basis-[10%] bg-[#4b9c47] rounded-t-md flex flex-row justify-between items-center px-10">
              <div className="flex items-center justify-center text-xl text-white ">Ngữ pháp 1</div>
              
              <IoArrowBackCircleOutline className="text-white" size={35} onClick={handleBack}/>
            </div>
            <div className="basis-[90%] px-20 flex flex-col gap-5">
              <div className="flex flex-row gap-16 px-16 py-5 basis-1/2 ">
                <div className="flex items-center justify-center bg-white rounded-md shadow-md basis-1/2">
                  A は B ....
                </div>
                <div className="rounded-md shadow-md basis-1/2 bg-blue-50"></div>
              </div>
              <div className="basis-1/4 p-7">
                - Cấu trúc này dùng để làm cái này, diễn tả cái nọ Cấu trúc này
                dùng để làm cái này, diễn tả cái nọ...............<br/> 
                - Rồi thế này
                thế nọ vân vân và mây mây Rồi thế này thế nọ vân vân và mây mây
                .........................
              </div>
              <div className="flex flex-col basis-1/4 p-7">
                <div className="text-xl font-semibold ">Ví dụ:</div>
                <div className="flex flex-row items-center justify-center gap-16">
                  <div className="text-xl ">私はベトナム人です</div>
                  <div>Tôi là người Việt Nam</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
