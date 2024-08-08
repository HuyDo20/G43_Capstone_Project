import React, { useEffect, useState } from 'react';
import { DaySchedule } from "@/components/course";
import { Spin } from 'antd';
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
import ExamHistoryItem from '@/components/exam/ExamHistoryItem';
import ExamHistoryDetail from '@/components/exam/ExamHistoryDetail';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

export default function WeeklyExamHistory() {
  const [courseData, setCourseData] = useState([]);
  const [weekSelected, setWeekSelected] = useState({});
  const [examHistory, setExamHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { handleFetch } = useAuth();
  const { id, week_id, weekly_exam_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleFetchData = async () => {
      try {
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
      } catch (error) {
        console.error('Error fetching course data:', error);
        navigate('/error', { state: { message: error.message } });
      }
    };

    const fetchExamHistories = async () => {
      try {
        let token = "";
        let accountId;
        const userEncode = localStorage.getItem("user");
        if (userEncode) {
          const userDecode = JSON.parse(userEncode);
          token = userDecode?.token;
          accountId = userEncode ? JSON.parse(userEncode)?.account_id : null;
        }
        const url = `/examHistories/${weekly_exam_id}/${accountId}`;
        const request = await axios.get(url, {
          headers: {
            Authorization: token,
          },
        });
      
        const response = request.data;
        console.log(response);
        if (response.statusCode === 200) {
          const data = response.data;
          setExamHistory(data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching exam histories:', error);
        navigate('/error', { state: { message: error.message } });
      }
    };

    handleFetchData();
    fetchExamHistories();
  }, [id, week_id, weekly_exam_id, handleFetch, navigate]);

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
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <Spin size="large" />
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
