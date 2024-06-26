import { DaySchedule, Practice } from "@/components/course";
import GrammarItem from "@/components/course/GrammarItem";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import Header from "@/layout/header/Header";

export default function Grammar() {
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
          {/* Grammar List*/}
          <div className="w-[1300px] h-[650px] ml-16 bg-[#fff8e1] mt-5 rounded-md px-20 pt-10 flex flex-col gap-10">
            <div className="text-[#4b9c47] font-semibold text-xl">Ngữ pháp</div>
            <div className="flex flex-col gap-5 w-full h-[370px] ">
              <GrammarItem
                grammar_name="Ngữ pháp 1"
                grammar_structure="A は B ...."
              />
              <GrammarItem
                grammar_name="Ngữ pháp 2"
                grammar_structure="A は B ...."
              />
              <GrammarItem
                grammar_name="Ngữ pháp 3"
                grammar_structure="A は B ...."
              />
              <GrammarItem
                grammar_name="Ngữ pháp 4"
                grammar_structure="A は B ...."
              />
            </div>
            <div className="flex items-center justify-center">
              <Button
                size="lg"
                className="text-base text-black bg-[#ffc267] hover:bg-[#f8b95a]"
              >
                <Dialog>
                  <DialogTrigger>Luyện tập</DialogTrigger>
                  <DialogContent>
                    <Practice/>
                  </DialogContent>
                </Dialog>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
