import { Button } from "@/components/ui/button";
import Header from "@/layout/header/Header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DaySchedule, ResetDeadline } from "@/components/course";


export default function LearningByWeek() {
  return (
    <div>
      <div className="bg-[#fff8e1]">
        <Header />
      </div>
      <div className="container flex flex-row w-full h-fit">
        <div className="basis-1/5 h-[900px] flex flex-col items-center p-5 shadow-lg gap-7">
          <div className="text-2xl text-[#56a251] font-semibold">Tuần học</div>
          <div className="flex flex-col w-full h-full gap-3">
            <Button className="text-black bg-white hover:bg-[#2dac5c] hover:text-white text-base">
              Tuần 1
            </Button>
            <Button className="text-black bg-white hover:bg-[#2dac5c] hover:text-white text-base">
              Tuần 2
            </Button>
            <Button className="text-black bg-white hover:bg-[#2dac5c] hover:text-white text-base">
              Tuần 3
            </Button>
            <Button className="text-black bg-white hover:bg-[#2dac5c] hover:text-white text-base">
              Tuần 4
            </Button>
            <Button className="text-black bg-white hover:bg-[#2dac5c] hover:text-white text-base">
              Tuần 5
            </Button>
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
                    Tiếng Nhật cơ bản 1
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex flex-col items-center gap-3 pt-10">
            <div>
              <ResetDeadline />
            </div>
            <div className="w-[800px]">
              <DaySchedule/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
