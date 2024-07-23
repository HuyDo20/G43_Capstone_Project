import { DaySchedule } from "@/components/course";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useAuth } from "@/hook/AuthContext";
import Header from "@/layout/header/Header";
import { Tag } from "antd";
import { useEffect, useState, useRef } from "react";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"; 

export default function Kanji() {
  const [reload, setReload] = useState(true);
  const [courseData, setCourseData] = useState([]);
  const [weekSelected, setWeekSelected] = useState({});
  const [dayCurrent, setDayCurrent] = useState({});
  const { handleFetch } = useAuth();
  const { id, week_id, day_id } = useParams();
  const [learnedKanji, setLearnedKanji] = useState(new Set());

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
    const fetchLearnedKanji = async () => {
      try {
        let token = "";
        let accountId ;
        const userEncode = localStorage.getItem("user");
        if (userEncode) {
          const userDecode = JSON.parse(userEncode);
          token = userDecode?.token;
          accountId = userEncode ? JSON.parse(userEncode)?.account_id : null;
        }
        const request = await axios.get(`/user/${accountId}`, {
          headers: {
            Authorization: token,
          },
        });
        if (request.status === 200) {
          const learnedKanjiIds = request.data.map((item) => item.kanji_id);      
          setLearnedKanji(new Set(learnedKanjiIds));
        }
        else{
          alert("fail");
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (reload) {
      handleFetchData();
      fetchLearnedKanji();
      setReload(false);
    }
  }, [reload]);
  

  const handlePlayAudio = (linkAudio) => {
    const audio = new Audio(linkAudio);
    audio.play();
  };

  const KanjiCarousel = ({ dayCurrent, currentIndex, handleViewItem, handlePlayAudio, day_id}) => {
    const [viewedItems, setViewedItems] = useState(new Set());
    const itemRefs = useRef([]);
    const [allViewed, setAllViewed] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
  
    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.dataset.index;
            handleViewItem(index);
            setViewedItems((prev) => new Set(prev).add(parseInt(index)));
            setActiveIndex(parseInt(index));
          }
        });
      }, { threshold: 0.5 });
  
      itemRefs.current.forEach((ref) => ref && observer.observe(ref));
  
      return () => {
        itemRefs.current.forEach((ref) => ref && observer.unobserve(ref));
      };
    }, [itemRefs.current]);
  
    useEffect(() => {
      const numberOfKanji = dayCurrent?.lessons?.filter(lesson => lesson.kanji_id !== undefined).length;
      if (numberOfKanji === viewedItems.size) {
        setAllViewed(true);
      }
    }, [viewedItems, dayCurrent]);
  
    const handleComplete = async () => {
      const kanjiIds = dayCurrent?.lessons
      ?.filter((lesson) => lesson.kanji_id !== undefined)
      ?.map((lesson) => lesson.kanji_id);
      try {
        const userEncode = localStorage.getItem("user");
        const token = userEncode ? JSON.parse(userEncode)?.token : '';
        await axios.post('/update-all', {
          accountId: JSON.parse(userEncode)?.account_id,
          kanjiIds: kanjiIds,
        }, {
          headers: {
            Authorization: token,
          },
        });
        setReload(true);
      } catch (error) {
        console.error("Error update kanji process", error);
        alert('An error occurred');
      }
    };
 
    const isLearned = (kanjiId) => {
      const learned = learnedKanji.has(kanjiId);
      return learned;
    };
  
    // Filter lessons with defined kanji_id and check if all are learned
    const isAllLearned = dayCurrent?.lessons
      ?.filter((lesson) => lesson.kanji_id !== undefined)
      ?.every((lesson) => isLearned(lesson.kanji_id));

    const handleSummaryClick = (index) => {
        setActiveIndex(index);
        const targetItem = itemRefs.current[index];
        if (targetItem) {
          targetItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    };
  
    const handleCarouselPrevious = () => {
      if (activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
        const targetItem = itemRefs.current[activeIndex - 1];
        if (targetItem) {
          targetItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      }
    };
  
    const handleCarouselNext = () => {
      if (activeIndex < dayCurrent?.lessons?.length - 1) {
        setActiveIndex(activeIndex + 1);
        const targetItem = itemRefs.current[activeIndex + 1];
        if (targetItem) {
          targetItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      }
    };
  
    return (
      <div>
        <Carousel className="w-[1200px]" activeIndex={activeIndex}>
          <CarouselContent>
            {dayCurrent?.lessons
              ?.filter((item) => item.kanji_id)
              ?.map((lesson, index) => (
                <CarouselItem key={index} active={index === activeIndex}>
                  <div
                    className="p-1"
                    ref={(el) => (itemRefs.current[index] = el)}
                    data-index={index}
                  >
                    <Card>
                      <CardContent className="flex flex-row px-16 pt-10 h-[670px] w-[1200px] bg-[#f2fae9]">
                        <div className="flex flex-col gap-9 basis-2/5">
                          <div className="text-2xl text-[#7db660] font-semibold">
                            Chữ Hán{" "}
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
                                lesson?.kanji_image
                                  ? lesson?.kanji_image.split(", ")[0]
                                  : "/banner.png"
                              }
                            />
                            <HiMiniSpeakerWave
                              size={30}
                              className="cursor-pointer"
                              onClick={() => handlePlayAudio(lesson.kanji_audio)}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col p-16 basis-3/5">
                          <div className="flex flex-row basis-1/4">
                            <div className="flex flex-col items-center justify-center gap-3 basis-1/2">
                              <div className="bg-[#b6da9f] w-[140px] h-[40px] p-2 text-center rounded-md shadow-sm font-semibold">
                                Chữ Hán
                              </div>
                              <div>{lesson.kanji_name}</div>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-3 basis-1/2">
                              <div className="bg-[#b6da9f] w-[140px] h-[40px] p-2 text-center rounded-md shadow-sm font-semibold">
                                Âm Hán Việt
                              </div>
                              <div>{lesson.cv_spelling}</div>
                            </div>
                          </div>
                          <div className="flex flex-row basis-1/4">
                            <div className="flex flex-col items-center justify-center gap-3 basis-1/2">
                              <div className="bg-[#b6da9f] w-[140px] h-[40px] p-2 text-center rounded-md shadow-sm font-semibold">
                                Âm on
                              </div>
                              <div>{lesson.kanji_onyomi}</div>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-3 basis-1/2">
                              <div className="bg-[#b6da9f] w-[140px] h-[40px] p-2 text-center rounded-md shadow-sm font-semibold">
                                Âm kun
                              </div>
                              <div>{lesson.kanji_kunyomi}</div>
                            </div>
                          </div>

                          <div className="flex flex-col items-center justify-around gap-5 basis-2/4">
                            <div className="flex flex-col items-center justify-center gap-3">
                              <div className="bg-[#b6da9f] w-[140px] h-[40px] p-2 text-center rounded-md shadow-sm font-semibold">
                                Từ ghép
                              </div>
                              <Table>
                                <TableBody>
                                  {lesson?.kanji_words?.map(
                                    (item, index) => (
                                      <TableRow key={index}>
                                        <TableCell className="font-medium">
                                          {item.hiragana_character}
                                        </TableCell>
                                        <TableCell>
                                          {item.kanji_word}
                                        </TableCell>
                                        <TableCell className="">
                                          {item.kanji_word_meaning}
                                        </TableCell>
                                      </TableRow>
                                    )
                                  )}
                                </TableBody>
                              </Table>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
          </CarouselContent>
          <button
        onClick={handleCarouselPrevious}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 shadow-lg"
      >
        <HiOutlineChevronLeft size={30} />
      </button>
      <button
        onClick={handleCarouselNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 shadow-lg"
      >
        <HiOutlineChevronRight size={30} />
      </button>
        </Carousel>
        <div className="summary-section flex justify-center mt-4" style={{ display: isAllLearned ? 'none' : 'normal' }}>
          {dayCurrent?.lessons
            ?.filter((item) => item.kanji_id)
            ?.map((_, index) => (
              <div
                key={index}
                onClick={() => handleSummaryClick(index)}
                className={`w-6 h-6 m-1 rounded-full flex items-center justify-center text-white cursor-pointer ${
                  index === activeIndex
                    ? 'bg-blue-500'
                    : viewedItems.has(index)
                    ? 'bg-green-500'
                    : 'bg-gray-300'
                }`}
              >
                {index + 1}
              </div>
            ))}
        </div>
        {isAllLearned && (
          <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white p-4 rounded-lg shadow-lg animate-bounce">
            Đã hoàn thành
          </div>
        )}
  
        {allViewed && !isAllLearned && (
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
                    Chữ Hán
                  </BreadcrumbPage>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            {/* Kanji Card */}
            <div className="flex justify-center w-full mt-7">
              <div className="">
                <KanjiCarousel
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
