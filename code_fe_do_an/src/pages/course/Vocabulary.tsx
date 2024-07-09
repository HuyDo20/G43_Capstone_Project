import { DaySchedule } from "@/components/course";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useAuth } from "@/hook/AuthContext";
import Header from "@/layout/header/Header";
import { Tag } from "antd";
import { useEffect, useState } from "react";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";

export default function Vocabulary() {
  const [reload, setReload] = useState(true);
  const [courseData, setCourseData] = useState([]);
  const [weekSelected, setWeekSelected] = useState({});
  const [dayCurrent, setDayCurrent] = useState({});
  const { handleFetch } = useAuth();
  const { id, week_id, day_id } = useParams();
  const navigate = useNavigate();

  const handleLearningByWeek = () => {
    navigate(`/learningByWeek/${id}`);
  };
  
  useEffect(() => {
    const handleFetchData = async () => {
      const response = await handleFetch({
        method: "get",
        url: `/course-detail/${id}`,
      });
      if (response.statusCode === 200) {
        const result = response.data;

        setCourseData(result.courseData);
        setWeekSelected(
          result.weekData?.find((item) => item.week_id === parseInt(week_id))
        );
        const _weekData = result.weekData;
        let _dayCurrent = result.weekData
          ?.find((item) => item.week_id === parseInt(week_id))
          ?.days?.find((item) => item.day_id === parseInt(day_id));
        if (
          _dayCurrent.repeat_lesson &&
          typeof _dayCurrent.repeat_lesson === "string"
        ) {
          const _repeatLesson = JSON.parse(_dayCurrent.repeat_lesson) || [];
          _repeatLesson.forEach((item) => {
            const weekRepeatIndex = item?.split(" - ")[0]?.replace("Week ", "");
            const dayRepeatIndex = item?.split(" - ")[1]?.replace("Day ", "");
            _dayCurrent.lessons = [
              ..._dayCurrent?.lessons,
              ..._weekData[weekRepeatIndex - 1]?.days[dayRepeatIndex - 1]
                ?.lessons,
            ];
          });
        }
        setDayCurrent(_dayCurrent);
      }
    };
    if (reload) {
      handleFetchData();
      setReload(false);
    }
  }, [reload]);

  const handlePlayAudio = (linkAudio) => {
    const audio = new Audio(linkAudio);
    audio.play();
  };

  const [widthScreen, setWidthScreen] = useState(window.innerWidth);
  console.log(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidthScreen(window.innerWidth);
    });
    return () =>
      window.removeEventListener("resize", () => {
        setWidthScreen(window.innerWidth);
      });
  }, []);
  if (widthScreen >= 768)
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
            <DaySchedule weekSelected={weekSelected} id={id} />
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
                      onClick={handleLearningByWeek}
                      className="text-2xl font-semibold"
                    >
                      {courseData?.course_name}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-2xl font-semibold">
                      {weekSelected?.week_name}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-2xl font-semibold">
                      {dayCurrent?.day_name}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-2xl font-semibold">
                      Từ mới
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
                    {dayCurrent?.lessons
                      ?.filter((item) => item.vocab_id)
                      ?.map((lesson, index) => (
                        <CarouselItem key={index}>
                          <div className="p-1">
                            <Card>
                              <CardContent className="flex flex-row px-16 pt-10 h-[670px] w-[1200px] bg-[#fff8e1]">
                                <div className="flex flex-col gap-9 basis-2/5">
                                  <div className="text-2xl text-[#7db660] font-semibold">
                                    Từ vựng{" "}
                                    {parseInt(lesson.day_id) !==
                                      parseInt(day_id) && (
                                      <>
                                        &ensp; <Tag color="green">Nhắc lại</Tag>
                                      </>
                                    )}
                                  </div>
                                  <div className="flex flex-col items-center gap-5">
                                    <img
                                      className="h-[450px] w-[450px] rounded-md shadow-md"
                                      // src={
                                      //   lesson.vocab_image
                                      //     ? lesson.vocab_image
                                      //     : "/banner.png"
                                      // }
                                      src={
                                        lesson?.vocab_image
                                          ? lesson?.vocab_image.split(", ")[0]
                                          : "/banner.png"
                                      }
                                    />
                                    <HiMiniSpeakerWave
                                      size={30}
                                      className="cursor-pointer"
                                      onClick={() =>
                                        handlePlayAudio(lesson.vocab_audio)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col p-16 basis-3/5">
                                  <div className="flex flex-row basis-1/4">
                                    <div className="flex flex-col items-center justify-center gap-3 basis-1/2">
                                      <div className="bg-[#d1eeb0] w-[140px] h-[40px] p-2 text-center rounded-md shadow-sm font-semibold">
                                        Từ vựng
                                      </div>
                                      <div>{lesson.vocab_name}</div>
                                    </div>
                                    <div className="flex flex-col items-center justify-center gap-3 basis-1/2">
                                      <div className="bg-[#d1eeb0] w-[140px] h-[40px] p-2 text-center rounded-md shadow-sm font-semibold">
                                        Kanji
                                      </div>
                                      <div>{lesson.vocab_kanji}</div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-center justify-center gap-3 basis-1/4">
                                    <div className="bg-[#d1eeb0] w-[140px] h-[40px] p-2 text-center rounded-md shadow-sm font-semibold">
                                      Nghĩa
                                    </div>
                                    <div>{lesson.vocab_meaning}</div>
                                  </div>

                                  <div className="flex flex-col items-center gap-5 pt-10 basis-2/4 ">
                                    <div className="flex flex-col items-center justify-center gap-3">
                                      <div className="bg-[#d1eeb0] w-[140px] h-[40px] p-2 text-center rounded-md shadow-sm font-semibold">
                                        Ví dụ
                                      </div>
                                      <div>{lesson.vocab_example}</div>
                                    </div>
                                    {/* <Button className=" w-[140px] h-[40px] mt-8">
                                    <Dialog>
                                      <DialogTrigger>Luyện tập</DialogTrigger>
                                      <DialogContent>
                                        <Practice />
                                      </DialogContent>
                                    </Dialog>
                                  </Button> */}
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

  if (widthScreen < 768) return <p>Say hiii</p>;
}