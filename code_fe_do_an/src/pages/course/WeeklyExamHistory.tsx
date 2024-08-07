import React, { useState } from 'react';
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
import ExamHistoryItem from '@/components/exam/ExamHistoryItem';
import ExamHistoryDetail from '@/components/exam/ExamHistoryDetail';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Provided test data
const testData = [
  {
    "examTitle": "Final Exam",
    "createdTime": "2024-08-07T10:00:00.000Z",
    "multiChoice": {
      "correct": 1,
      "total": 2
    },
    "reading": {
      "correct": 2,
      "total": 3
    },
    "listening": {
      "correct": 3,
      "total": 4
    },
    "score": 85
  },
  {
    "examTitle": "Midterm Exam",
    "createdTime": "2024-08-01T09:30:00.000Z",
    "multiChoice": {
      "correct": 2,
      "total": 3
    },
    "reading": {
      "correct": 3,
      "total": 4
    },
    "listening": {
      "correct": 4,
      "total": 5
    },
    "score": 90
  },
  {
    "examTitle": "Quiz 1",
    "createdTime": "2024-07-25T14:00:00.000Z",
    "multiChoice": {
      "correct": 1,
      "total": 1
    },
    "reading": {
      "correct": 1,
      "total": 1
    },
    "listening": {
      "correct": 2,
      "total": 2
    },
    "score": 95
  },
  {
    "examTitle": "Quiz 2",
    "createdTime": "2024-07-18T11:00:00.000Z",
    "multiChoice": {
      "correct": 0,
      "total": 1
    },
    "reading": {
      "correct": 1,
      "total": 1
    },
    "listening": {
      "correct": 1,
      "total": 1
    },
    "score": 75
  },
  {
    "examTitle": "Practice Exam 1 ",
    "createdTime": "2024-06-30T08:45:00.000Z",
    "multiChoice": {
      "correct": 2,
      "total": 2
    },
    "reading": {
      "correct": 3,
      "total": 3
    },
    "listening": {
      "correct": 4,
      "total": 4
    },
    "score": 90
  },
   {
    "examTitle": "Practice Exam 2",
    "createdTime": "2024-06-30T08:45:00.000Z",
    "multiChoice": {
      "correct": 2,
      "total": 2
    },
    "reading": {
      "correct": 3,
      "total": 3
    },
    "listening": {
      "correct": 4,
      "total": 4
    },
    "score": 80
  },
    {
    "examTitle": "Practice Exam 3",
    "createdTime": "2024-06-30T08:45:00.000Z",
    "multiChoice": {
      "correct": 2,
      "total": 2
    },
    "reading": {
      "correct": 3,
      "total": 3
    },
    "listening": {
      "correct": 4,
      "total": 4
    },
    "score": 65
  },
     {
    "examTitle": "Practice Exam 4",
    "createdTime": "2024-06-30T08:45:00.000Z",
    "multiChoice": {
      "correct": 2,
      "total": 2
    },
    "reading": {
      "correct": 3,
      "total": 3
    },
    "listening": {
      "correct": 4,
      "total": 4
    },
    "score": 60
  }, {
    "examTitle": "Practice Exam 5",
    "createdTime": "2024-06-30T08:45:00.000Z",
    "multiChoice": {
      "correct": 2,
      "total": 2
    },
    "reading": {
      "correct": 3,
      "total": 3
    },
    "listening": {
      "correct": 4,
      "total": 4
    },
    "score": 75
  }

];

export default function WeeklyExamHistory() {
  const [courseData] = useState({ course_name: "Sample Course" });
  const [weekSelected] = useState({ week_name: "Sample Week" });
  const [examHistory] = useState(testData);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleLearningByWeek = () => {
    navigate(`/learningByWeek/${id}`);
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
                  Exam History
                </BreadcrumbPage>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {/* Main Content */}
          <div className="flex justify-center w-full mt-7">
            <div className="w-full max-w-6xl max-h-[800px] overflow-y-auto bg-white rounded-lg shadow-lg p-6 border-2">
              {/* Section 1: Latest Exam History */}
              {examHistory.length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Bài kiểm tra gần đây nhất:</h2>
                  <ExamHistoryDetail exam={examHistory[0]} />
                </div>
              )}
              {/* Section 2: Older Exam History */}
              {examHistory.length > 1 && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Các bài trước đây:</h2>
                  {examHistory.slice(1).map((exam, index) => (
                    <ExamHistoryItem key={index} exam={exam} />
                  ))}
                </div>
              )}
              {/* Section 3: Column Chart */}
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Lịch sử kiểm tra</h2>
                <BarChart
                  width={400}
                  height={400}
                  data={examHistory.map(exam => ({
                    name: exam.examTitle,
                    score: exam.score,
                    date: new Date(exam.createdTime).toLocaleDateString(),
                  }))}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" fill="#82ca9d" />
                </BarChart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
