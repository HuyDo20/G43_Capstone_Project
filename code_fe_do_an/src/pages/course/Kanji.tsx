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
    CarouselPrevious,
} from "@/components/ui/carousel";
import {
    Table,
    TableBody,
    TableCell,
    TableRow
} from "@/components/ui/table";
import Header from "@/layout/header/Header";
import { HiMiniSpeakerWave } from "react-icons/hi2";
  
export default function Kanji() {
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
                                Chữ Hán
                              </div>
                              <div className="flex flex-col items-center gap-5">
                                <img
                                  className="h-[450px] w-[450px] rounded-md shadow-md"
                                  src="/banner.png"
                                />
                                <HiMiniSpeakerWave size={30} />
                              </div>
                            </div>
                            <div className="flex flex-col p-12 basis-3/5">
                              <div className="flex flex-row basis-1/5">
                                <div className="flex flex-col items-center justify-center gap-3 basis-1/2">
                                  <div className="bg-[#d1eeb0] w-[140px] h-[40px] p-2 text-center rounded-md shadow-sm font-semibold">
                                    Chữ Hán
                                  </div>
                                  <div>私</div>
                                </div>
                                <div className="flex flex-col items-center justify-center gap-3 basis-1/2">
                                  <div className="bg-[#d1eeb0] w-[140px] h-[40px] p-2 text-center rounded-md shadow-sm font-semibold">
                                    Âm Hán Việt
                                  </div>
                                  <div>Tư</div>
                                </div>
                              </div>
                              <div className="flex flex-row basis-1/5">
                                <div className="flex flex-col items-center justify-center gap-3 basis-1/2">
                                  <div className="bg-[#d1eeb0] w-[140px] h-[40px] p-2 text-center rounded-md shadow-sm font-semibold">
                                    Âm on
                                  </div>
                                  <div>し</div>
                                </div>
                                <div className="flex flex-col items-center justify-center gap-3 basis-1/2">
                                  <div className="bg-[#d1eeb0] w-[140px] h-[40px] p-2 text-center rounded-md shadow-sm font-semibold">
                                    Âm kun
                                  </div>
                                  <div>わたし</div>
                                </div>
                              </div>

                              <div className="flex flex-col items-center justify-around gap-5 basis-3/5 ">
                                <div className="flex flex-col items-center justify-center gap-3">
                                  <div className="bg-[#d1eeb0] w-[140px] h-[40px] p-2 text-center rounded-md shadow-sm font-semibold">
                                    Từ ghép
                                  </div>
                                  <Table>
                                    <TableBody>
                                      <TableRow>
                                        <TableCell className="font-medium">
                                        私
                                        </TableCell>
                                        <TableCell>わたし</TableCell>
                                        <TableCell className="">
                                        tôi
                                        </TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell className="font-medium">
                                        私たち
                                        </TableCell>
                                        <TableCell>わたしたち</TableCell>
                                        <TableCell className="">
                                        chúng tôi
                                        </TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table>
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
