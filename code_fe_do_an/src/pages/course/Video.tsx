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
export default function Video() {
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
          <div className="mb-7">
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
          {/* Video Detail*/}
          <div className="w-[1200px] h-[690px] ml-32 bg-[#fff8e1] rounded-md px-20 pt-10 flex flex-col gap-5">
            <div className="text-[#4b9c47] text-xl font-semibold">Video 1</div>
            <div className="w-full h-[400px] px-20">
              <div className="w-full h-full bg-green-200 rounded-lg"></div>
            </div>
            <div>Video_Description</div>
          </div>
        </div>
      </div>
    </div>
  )
}
