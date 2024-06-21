import { DaySchedule } from "@/components/course";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import Header from "@/layout/header/Header";
import { HiMiniSpeakerWave } from "react-icons/hi2";

export default function Vocabulary() {
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
          {/* Vocab Card*/}
          <div className="flex justify-center w-full mt-7">
            <div className="">
              <Carousel className="w-[1200px]">
                <CarouselContent>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex flex-row px-16 pt-10 h-[670px] w-[1200px] bg-[#fff8e1]">
                            <div className="flex flex-col gap-9 basis-2/5">
                              <div className="text-2xl text-[#7db660] font-semibold">
                                Từ vựng
                              </div>
                              <div className="flex flex-col items-center gap-5">
                                <img
                                  className="h-[450px] w-[450px] rounded-md shadow-md"
                                  src="/banner.png"
                                />
                                <HiMiniSpeakerWave size={30} />
                              </div>
                            </div>
                            <div className="flex flex-col p-16 basis-3/5">
                              <div className="flex flex-row basis-1/4">
                                <div className="flex flex-col items-center justify-center gap-3 basis-1/2">
                                  <div className="bg-[#d1eeb0] w-[140px] h-[40px] p-2 text-center rounded-md shadow-sm font-semibold">
                                    Từ vựng
                                  </div>
                                  <div>わたし</div>
                                </div>
                                <div className="flex flex-col items-center justify-center gap-3 basis-1/2">
                                  <div className="bg-[#d1eeb0] w-[140px] h-[40px] p-2 text-center rounded-md shadow-sm font-semibold">
                                    Kanji
                                  </div>
                                  <div>私</div>
                                </div>
                              </div>
                              <div className="flex flex-col items-center justify-center gap-3 basis-1/4">
                                <div className="bg-[#d1eeb0] w-[140px] h-[40px] p-2 text-center rounded-md shadow-sm font-semibold">
                                  Nghĩa
                                </div>
                                <div>Tôi</div>
                              </div>

                              <div className="flex flex-col items-center gap-5 pt-10 basis-2/4 ">
                                <div className="flex flex-col items-center justify-center gap-3">
                                  <div className="bg-[#d1eeb0] w-[140px] h-[40px] p-2 text-center rounded-md shadow-sm font-semibold">
                                    Ví dụ
                                  </div>
                                  <div>私はベトナム人です。(Tôi là người Việt Nam.)</div>
                                </div>
                                <Button className=" w-[140px] h-[40px] ">
                                  Luyện tập
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
