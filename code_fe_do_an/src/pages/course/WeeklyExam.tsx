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
  const { handleFetch } = useAuth();
  const { id, week_id } = useParams();
  const navigate = useNavigate();

  const handleLearningByWeek = () => {
    navigate(`/learningByWeek/${id}`);
  };

  const testData = {
    courseTitle: "English 101",
    examTitle: "Final Exam",
    examData: {
      readingQuestions: [
        {
          id: 921373,
          type: "Reading",
          content: "Read the passage below and answer the questions that follow.",
          imageUrl: "http://localhost:5000/uploads/example_reading_image.png",
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
              userAnsweredId: null,
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
              userAnsweredId: null,
              correctOptionId: 1722836618558
            }
          ]
        },
        {
          id: 950085,
          type: "Reading",
          content: "Analyze the provided text and respond to the queries.",
          imageUrl: "http://localhost:5000/uploads/example_reading_image2.png",
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
              userAnsweredId: null,
              correctOptionId: 1722836657478
            }
          ]
        }
      ],
      listeningQuestions: [
        {
          id: 927497,
          type: "Listening",
          audioUrl: "http://localhost:5000/uploads/example_listening_audio.mp3",
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
              userAnsweredId: null,
              correctOptionId: 1722836611793
            },
            {
              id: 1722836600329,
              questionContent: "What is the speaker's main argument? 1",
              options: [
                { id: 1722836609362, content: "The importance of healthy eating 1." },
                { id: 1722836610691, content: "The benefits of daily meditation. 1" },
                { id: 1722836611790, content: "The impact of technology on education. 1" },
                { id: 1722836615308, content: "The effects of climate change 1." }
              ],
              imageUrl: null,
              userAnsweredId: null,
              correctOptionId: 1722836615308
            }
          ]
        },
        {
          id: 927498,
          type: "Listening",
          audioUrl: "http://localhost:5000/uploads/example_listening_audio.mp3",
          subQuestions: [
            {
              id: 1722836600320,
              questionContent: "What is the speaker's main argument 2?",
              options: [
                { id: 1722836609363, content: "The importance of healthy eating.2" },
                { id: 1722836610692, content: "The benefits of daily meditation.2" },
                { id: 1722836611795, content: "The impact of technology on education.2" },
                { id: 1722836615309, content: "The effects of climate change.2" }
              ],
              imageUrl: null,
              userAnsweredId: null,
              correctOptionId: 1722836615309
            },
            {
              id: 1722836600325,
              questionContent: "What is the speaker's main argument 2?",
              options: [
                { id: 1722836609366, content: "The importance of healthy eating.3" },
                { id: 1722836610695, content: "The benefits of daily meditation.3" },
                { id: 1722836611791, content: "The impact of technology on education.3" },
                { id: 1722836615306, content: "The effects of climate change.3" }
              ],
              imageUrl: null,
              userAnsweredId: null,
              correctOptionId: 1722836615306
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
          imageUrl: null,
          userAnsweredId: null,
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
          userAnsweredId: null,
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
      }
    };

    if (reload) {
      handleFetchData();
      setReload(false);
    }
  }, [reload]);

  const handleExamSubmit = (selectedAnswers) => {
    const updatedExamData = { ...testData };

    updatedExamData.examData.readingQuestions.forEach(question => {
      question.subQuestions.forEach(subQuestion => {
        if (selectedAnswers[subQuestion.id] !== undefined) {
          subQuestion.userAnsweredId = selectedAnswers[subQuestion.id];
        }
      });
    });

    updatedExamData.examData.listeningQuestions.forEach(question => {
      question.subQuestions.forEach(subQuestion => {
        if (selectedAnswers[subQuestion.id] !== undefined) {
          subQuestion.userAnsweredId = selectedAnswers[subQuestion.id];
        }
      });
    });

    updatedExamData.examData.multiChoiceQuestions.forEach(question => {
      if (selectedAnswers[question.id] !== undefined) {
        question.userAnsweredId = selectedAnswers[question.id];
      }
    });

    console.log('Updated Exam Data:', JSON.stringify(updatedExamData));
    // Here you can set the updated data to state or perform any necessary actions
  };

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
            <div className="w-1000 max-w-6xl max-h-[800px] overflow-y-auto bg-white rounded-lg shadow-lg p-6 border-4 border-green-300">
              <ExamTaking 
                courseTitle={testData.courseTitle} 
                examTitle={testData.examTitle} 
                questions={testData.examData} 
                mode="doing"
                onSubmit={handleExamSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
