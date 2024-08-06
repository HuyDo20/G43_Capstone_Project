import React, { useEffect, useState } from 'react';
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
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/hook/AuthContext";
import ExamTaking from '@/components/exam/ExamTaking';


export default function WeeklyExam() {
  const [reload, setReload] = useState(true);
  const [courseData, setCourseData] = useState([]);
  const [weekSelected, setWeekSelected] = useState({});
  const [dayCurrent, setDayCurrent] = useState({});
  const { handleFetch } = useAuth();
  const { id, week_id } = useParams();
  const navigate = useNavigate();

  const handleLearningByWeek = () => {
    navigate(`/learningByWeek/${id}`);
  };
  
  const  testData = {
  courseTitle: "English 101",
  examTitle: "Final Exam",
  examData: {
    readingQuestions: [
      {
        id: 921373,
        type: "Reading",
        content: "Read the passage below and answer the questions that follow.",
        imageUrl: "http://localhost:5000/uploads/redesign_with_provided_background-1722836640791.png",
        subQuestions: [
          {
            id: 1722836600327,
            questionContent: "What is the main idea of the passage?",
            options: [
              { id: 1722836609360, content: "To inform about the benefits of regular exercise." },
              { id: 1722836610689, content: "To discuss the challenges of learning a new language." },
              { id: 1722836611792, content: "To describe the process of photosynthesis." },
              { id: 1722836615306, content: "To explain the history of the internet." }
            ],
            imageUrl: null,
            isEditing: false,
            correctOptionId: 1722836609360
          },
          {
            id: 1722836618555,
            questionContent: "Which of the following is NOT mentioned in the passage?",
            options: [
              { id: 1722836618556, content: "Health benefits of exercise." },
              { id: 1722836618557, content: "Common obstacles to regular exercise." },
              { id: 1722836618558, content: "Exercise equipment recommendations." },
              { id: 1722836618559, content: "The role of diet in fitness." }
            ],
            imageUrl: null,
            isEditing: false,
            correctOptionId: 1722836618558
          }
        ]
      },
      {
        id: 950085,
        type: "Reading",
        content: "Analyze the provided text and respond to the queries.",
        imageUrl: "http://localhost:5000/uploads/redesign_with_provided_background-1722836640791.png",
        subQuestions: [
          {
            id: 1722836654116,
            questionContent: "What is the author's purpose in writing this text?",
            options: [
              { id: 1722836656880, content: "To persuade readers to adopt a new technology." },
              { id: 1722836657478, content: "To provide information about a recent discovery." },
              { id: 1722836658259, content: "To narrate a personal experience." },
              { id: 1722836658862, content: "To compare different approaches to a problem." }
            ],
            imageUrl: null,
            isEditing: false,
            correctOptionId: 1722836657478
          }
        ]
      }
    ],
    listeningQuestions: [
      {
        id: 927497,
        type: "Listening",
        audioUrl: "http://localhost:5000/uploads/Y2meta.app - Ed Sheeran - Shape of You (Official Music Video) (320 kbps)-1722869673032.mp3",
        subQuestions: [
          {
            id: 1722836600328,
            questionContent: "What is the speaker's main argument?",
            options: [
              { id: 1722836609361, content: "The importance of healthy eating." },
              { id: 1722836610690, content: "The benefits of daily meditation." },
              { id: 1722836611793, content: "The impact of technology on education." },
              { id: 1722836615307, content: "The effects of climate change." }
            ],
            imageUrl: null,
            isEditing: false,
            correctOptionId: 1722836611793
          }
        ]
      }
    ],
    multiChoiceQuestions: [
      {
        id: 143249,
        type: "Multi-choice",
        content: "What is the capital of France?",
        options: [
          { id: 1722836533109, content: "Berlin" },
          { id: 1722836533700, content: "Madrid" },
          { id: 1722836534466, content: "Paris" },
          { id: 1722836535067, content: "Rome" }
        ],
        imageUrl: "http://localhost:5000/uploads/redesign_with_provided_background-1722836640791.png",
        correctOptionId: 1722836534466
      },
      {
        id: 213005,
        type: "Multi-choice",
        content: "Which planet is known as the Red Planet?",
        options: [
          { id: 1722836580847, content: "Earth" },
          { id: 1722836581394, content: "Mars" },
          { id: 1722836582359, content: "Jupiter" },
          { id: 1722836583202, content: "Saturn" }
        ],
        imageUrl: null,
        correctOptionId: 1722836581394
      }
    ]
  }
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
          console.log(_weekData);
        // let _dayCurrent = result.weekData
        //   ?.find((item) => item.week_id === parseInt(week_id))
        //   ?.days?.find((item) => item.day_id === parseInt(day_id));
        // if (
        //   _dayCurrent.repeat_lesson &&
        //   typeof _dayCurrent.repeat_lesson === "string"
        // ) {
        //   const _repeatLesson = JSON.parse(_dayCurrent.repeat_lesson) || [];
        //   _repeatLesson.forEach((item) => {
        //     const weekRepeatIndex = item?.split(" - ")[0]?.replace("Week ", "");
        //     const dayRepeatIndex = item?.split(" - ")[1]?.replace("Day ", "");
        //     _dayCurrent.lessons = [
        //       ...(_dayCurrent?.lessons || []),
        //       ...(_weekData[weekRepeatIndex - 1]?.days[dayRepeatIndex - 1]
        //         ?.lessons || []),
        //     ];
        //   });
        // }
        // setDayCurrent(_dayCurrent);
      }
    };

    if (reload) {
      handleFetchData();
      setReload(false);
    }
  }, [reload]);

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
                    Courses
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
                  Weekly Exam
                </BreadcrumbPage>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {/* ExamTaking Component */}
          <div className="flex justify-center w-full mt-7">
            <div className="w-800 max-w-4xl max-h-[800px] overflow-y-auto bg-white rounded-lg shadow-lg p-6 border-4 border-green-300">
              <ExamTaking 
                courseTitle={testData.courseTitle} 
                examTitle={testData.examTitle} 
                questions={testData.examData} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
