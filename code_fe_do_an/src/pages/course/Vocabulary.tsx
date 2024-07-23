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
import { useEffect, useState, useRef } from "react";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

export default function Vocabulary() {
  const [reload, setReload] = useState(true);
  const [courseData, setCourseData] = useState([]);
  const [weekSelected, setWeekSelected] = useState({});
  const [dayCurrent, setDayCurrent] = useState({});
  const { handleFetch } = useAuth();
  const { id, week_id, day_id } = useParams();
  const [learnedVocab, setLearnedVocab] = useState(new Set());

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
              ...(_dayCurrent?.lessons || []),
              ...(_weekData[weekRepeatIndex - 1]?.days[dayRepeatIndex - 1]
                ?.lessons || []),
            ];
          });
        }
        setDayCurrent(_dayCurrent);
      }
    };
    const fetchLearnedVocab = async () => {
      const userEncode = localStorage.getItem("user");
      const accountId = userEncode ? JSON.parse(userEncode)?.account_id : null;
      try {
        const response = await axios.get(`/user/${accountId}`);
        const learnedVocabIds = response.data.map((item) => item.vocabulary_id);
        setLearnedVocab(new Set(learnedVocabIds));
      } catch (error) {
        console.error("Error fetching learned vocabulary: ", error);
      }
    };
    if (reload) {
      handleFetchData();
      fetchLearnedVocab();
      setReload(false);
    }
  }, [reload]);
  

  const handlePlayAudio = (linkAudio) => {
    const audio = new Audio(linkAudio);
    audio.play();
  };

  const VocabularyCarousel = ({ dayCurrent, currentIndex, handleViewItem, handlePlayAudio, day_id }) => {
    const [viewedItems, setViewedItems] = useState(new Set());
    const itemRefs = useRef([]);
    const [allViewed, setAllViewed] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.dataset.index;
            handleViewItem(index);
            setViewedItems((prev) => new Set(prev).add(parseInt(index)));
          }
        });
      }, { threshold: 0.5 }); // Adjust threshold as needed

      itemRefs.current.forEach((ref) => ref && observer.observe(ref));

      return () => {
        itemRefs.current.forEach((ref) => ref && observer.unobserve(ref));
      };
    }, [itemRefs.current]);

    useEffect(() => {
      if (dayCurrent?.lessons?.length === viewedItems.size) {
        setAllViewed(true);
      }
    }, [viewedItems, dayCurrent]);

    const handleComplete = async () => {
      const vocabularyIds = dayCurrent?.lessons?.map(lesson => lesson.vocab_id);
      try {
        const userEncode = localStorage.getItem("user");
        const token = userEncode ? JSON.parse(userEncode)?.token : '';
        const request = await axios.post('/update-all', {
          accountId: JSON.parse(userEncode)?.account_id,
          vocabularyIds: vocabularyIds,
        }, {
          headers: {
            Authorization: token,
          },
        });
        const response = request.data;
     
      console.log(response);
      } catch (error) {
        console.error("Error update vocabulary process", error);
        alert('An error occurred');
      }
    };

    const isLearned = (vocabId) => learnedVocab.has(vocabId);

    const isAllLearned = dayCurrent?.lessons?.every((lesson) => isLearned(lesson.vocab_id));


    return (
      <div>
        <Carousel className="w-[1200px]">
          <CarouselContent>
            {dayCurrent?.lessons
              ?.filter((item) => item.vocab_id)
              ?.map((lesson, index) => (
                <CarouselItem key={index} active={index === currentIndex}>
                  <div
                    className="p-1"
                    ref={(el) => (itemRefs.current[index] = el)}
                    data-index={index}
                  >
                    <Card>
                      <CardContent className="flex flex-row px-16 pt-10 h-[670px] w-[1200px] bg-[#f2fae9]">
                        <div className="flex flex-col gap-9 basis-2/5">
                          <div className="text-2xl text-[#7db660] font-semibold">
                            Từ vựng{" "}
                            {parseInt(lesson.day_id) !== parseInt(day_id) && (
                              <>
                                &ensp; <Tag color="green">Nhắc lại</Tag>
                              </>
                            )}
                          </div>
                          <div className="flex flex-col items-center gap-5">
                            <img
                              className="h-[450px] w-[450px] rounded-md shadow-md"
                              src={
                                lesson?.vocab_image
                                  ? lesson?.vocab_image.split(", ")[0]
                                  : "/banner.png"
                              }
                            />
                            <HiMiniSpeakerWave
                              size={30}
                              className="cursor-pointer"
                              onClick={() => handlePlayAudio(lesson.vocab_audio)}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col p-16 basis-3/5">
                          <div className="flex flex-row basis-1/4">
                            <div className="flex flex-col items-center justify-center gap-3 basis-1/2">
                              <div className="bg-[#b6da9f] w-[140px] h-[40px] p-2 text-center rounded-md shadow-sm font-semibold">
                                Từ vựng
                              </div>
                              <div>{lesson.vocab_name}</div>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-3 basis-1/2">
                              <div className="bg-[#b6da9f] w-[140px] h-[40px] p-2 text-center rounded-md shadow-sm font-semibold">
                                Kanji
                              </div>
                              <div>{lesson.vocab_kanji}</div>
                            </div>
                          </div>
                          <div className="flex flex-col items-center justify-center gap-3 basis-1/4">
                            <div className="bg-[#b6da9f] w-[140px] h-[40px] p-2 text-center rounded-md shadow-sm font-semibold">
                              Nghĩa
                            </div>
                            <div>{lesson.vocab_meaning}</div>
                          </div>

                          <div className="flex flex-col items-center gap-5 pt-10 basis-2/4 ">
                            <div className="flex flex-col items-center justify-center gap-3">
                              <div className="bg-[#b6da9f] w-[140px] h-[40px] p-2 text-center rounded-md shadow-sm font-semibold">
                                Ví dụ
                              </div>
                              <div className="flex flex-col gap-2">
                                <div>{lesson.vocab_example}</div>
                              </div>
                            </div>
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
        <div className="summary-section flex justify-center mt-4">
          {dayCurrent?.lessons
            ?.filter((item) => item.vocab_id)
            ?.map((_, index) => (
              <div
                key={index}
                className={`w-6 h-6 m-1 rounded-full ${
                  viewedItems.has(index) ? 'bg-green-500' : 'bg-gray-300'
                }`}
              ></div>
            ))}
        </div>
        {allViewed && (
          <div className="fixed bottom-5 right-10">
            <button
              onClick={handleComplete}
              className="bg-green-500 text-white p-4 rounded-lg"
            >
              Đánh dấu hoàn thành
            </button>
          </div>
        )}
      </div>
    );
  };

  const [widthScreen, setWidthScreen] = useState(window.innerWidth);

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
        <div className="bg-[#f2fae9]">
          <Header />
        </div>
        {/* Body */}
        <div className="flex flex-row">
          {/* DaySchedule */}
          <div className="p-5 shadow-md basis-1/6 h-[830px]">
            <DaySchedule weekSelected={weekSelected} id={id} />
          </div>
          {/* Content */}
          <div className="flex flex-col basis-5/6 pt-7 pl-11">
            {/* Breadcrumb */}
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
                  <BreadcrumbPage className="text-2xl font-semibold">
                    {weekSelected?.week_name}
                  </BreadcrumbPage>
                  <BreadcrumbSeparator />
                  <BreadcrumbPage className="text-2xl font-semibold">
                    {dayCurrent?.day_name}
                  </BreadcrumbPage>
                  <BreadcrumbSeparator />
                  <BreadcrumbPage className="text-2xl font-semibold">
                    Từ mới
                  </BreadcrumbPage>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            {/* Vocab Card */}
            <div className="flex justify-center w-full mt-7">
              <div className="">
                <VocabularyCarousel
                  dayCurrent={dayCurrent}
                  currentIndex={0}
                  handleViewItem={(index) => console.log('View item', index)}
                  handlePlayAudio={(audioUrl) => handlePlayAudio(audioUrl)}
                  day_id={day_id}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  if (widthScreen < 768) return <p>Say hiii</p>;
}
