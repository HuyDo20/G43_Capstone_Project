import React, { useEffect, useState } from 'react';
import { DaySchedule } from "@/components/course";
import { message } from 'antd';
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
import axios from 'axios';

export default function WeeklyExam() {
  const [reload, setReload] = useState(true);
  const [courseData, setCourseData] = useState([]);
  const [weekSelected, setWeekSelected] = useState({});
  const [examData, setExamData] = useState(null);
  const { handleFetch } = useAuth();
  const { id, week_id, weekly_exam_id } = useParams();
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
      }
    };

    const fetchCourseWeeklyExam = async () => {
      try {
        let token = "";
        const userEncode = localStorage.getItem("user");
        if (userEncode) {
          const userDecode = JSON.parse(userEncode);
          token = userDecode?.token;
        }
        const request = await axios.get(`/exams/${weekly_exam_id}`, {
          headers: {
            Authorization: token,
          },
        });
        if (request.status === 200) {
          const fetchedData = request.data.data.data;
          const transformedData = transformFetchedData(fetchedData);
          setExamData(transformedData);
        }
      } catch (error) {
        navigate('/error', { state: { message: error.message } });
      }
    };

    if (reload) {
      handleFetchData();
      fetchCourseWeeklyExam();
      setReload(false);
    }
  }, [reload]);

  const transformFetchedData = (data) => {
    return {
      examTitle: data.exam_name,
      examData: {
        readingQuestions: data.questions.readingQuestions ? data.questions.readingQuestions.map(question => ({
          id: question.id,
          type: question.type,
          content: question.content,
          imageUrl: question.imageUrl,
          subQuestions: question.subQuestions ? question.subQuestions.map(subQuestion => ({
            id: subQuestion.id,
            questionContent: subQuestion.questionContent,
            options: subQuestion.options,
            imageUrl: subQuestion.imageUrl,
            userAnsweredId: null,
            correctOptionId: subQuestion.correctOptionId,
          })) : [],
        })) : [],
        listeningQuestions: data.questions.listeningQuestions ? data.questions.listeningQuestions.map(question => ({
          id: question.id,
          type: question.type,
          audioUrl: question.audioUrl,
          subQuestions: question.subQuestions ? question.subQuestions.map(subQuestion => ({
            id: subQuestion.id,
            questionContent: subQuestion.questionContent,
            options: subQuestion.options,
            imageUrl: subQuestion.imageUrl,
            userAnsweredId: null,
            correctOptionId: subQuestion.correctOptionId,
          })) : [],
        })) : [],
        multiChoiceQuestions: data.questions.multiChoiceQuestions ? data.questions.multiChoiceQuestions.map(question => ({
          id: question.id,
          type: question.type,
          content: question.content,
          options: question.options,
          imageUrl: question.imageUrl,
          userAnsweredId: null,
          correctOptionId: question.correctOptionId,
        })) : [],
      }
    };
  };

  const handleExamSubmit = (selectedAnswers) => {
    const updatedExamData = { ...examData };

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
            <div className="w-full max-w-6xl max-h-[800px] overflow-y-auto bg-white rounded-lg shadow-lg p-6 border-2">
              {examData ? (
                <ExamTaking        
                  examTitle={examData.examTitle} 
                  questions={examData.examData} 
                  mode="doing"
                  onSubmit={handleExamSubmit}
                />
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
