import { CourseResponse } from "@/type";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import axios from "axios";
import Modal from "react-modal";

const CourseItem: React.FC<CourseResponse> = (course: CourseResponse) => {
  const navigate = useNavigate();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentDay, setCurrentDay] = useState('');

  useEffect(() => {
    const checkEnrollment = async () => {
      try {
        const userEncode = localStorage.getItem("user");
        const token = userEncode ? JSON.parse(userEncode)?.token : '';
        const response = await axios.post('/account-enroll', {
          accountId: JSON.parse(userEncode)?.account_id,
          courseId: course.course_id,
        }, {
          headers: {
            Authorization: token,
          },
        });
        setIsEnrolled(response.data.isEnrolled);
      } catch (error) {
        console.error("Error check enroll in course", error);
      }
  };
  
  checkEnrollment();

    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDay(today.toLocaleDateString('vi-VN', options));
  }, [course.course_id]);

  const handleEnroll = async (id) => {
    if (isEnrolled) {
      navigate(`/learningByWeek/${id}`);
    } else {
      setModalIsOpen(true);
    }
  };

  const handleConfirmEnroll = async () => {
    try {
      const userEncode = localStorage.getItem("user");
      const token = userEncode ? JSON.parse(userEncode)?.token : '';
      await axios.post('/enroll', {
        accountId: JSON.parse(userEncode)?.account_id,
        courseId: course.course_id,
      }, {
        headers: {
          Authorization: token,
        },
      });
      setIsEnrolled(true);
      setModalIsOpen(false);
      navigate(`/learningByWeek/${course.course_id}`);
    } catch (error) {
      console.error("Error enrolling in course", error);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="flex flex-col items-center w-full h-full gap-3">
      <div className="w-full h-full bg-[#b6da9f] rounded-2xl justify-around flex flex-row py-3 items-center">
        <img className="w-1/4 h-full rounded-2xl" src={course.course_image} />
        <div className="flex flex-col w-1/2 h-full gap-5 p-4">
          <div className="font-semibold text-2xl text-green-700">{course.course_name}</div>
          <div className="text-xs">{course.description}</div>
          <div className="flex flex-row items-center gap-3">
            <Progress className="h-[10px] basis-11/12" value={70} />
            <div className="basis-1/12">80%</div>
          </div>
        </div>
        <Button onClick={() => handleEnroll(course.course_id)}>
          {isEnrolled ? "Tiếp tục" : "Đăng ký"}
        </Button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Course Details"
        style={{
          content: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px',
            width: '60%',
            height: '60%',
            margin: 'auto',
            borderRadius: '10px',
            maxWidth: '800px',
          }
        }}
      >
        <div className="flex flex-col w-1/2 h-full gap-3 p-4">
          <h2 className="font-bold text-3xl text-green-700">{course.course_name}</h2>
          <div><strong>Tên khóa học:</strong> {course.course_name}</div>
          <div><strong>Mô tả:</strong> {course.description}</div>
          <div><strong>Số tuần học:</strong> {course.week}</div>
          <div><strong>Trình độ khóa học:</strong> {course.course_level}</div>
          <div><strong>Kỹ năng khóa học:</strong> {course.course_skill}</div>
          <div><strong>Trạng thái khóa học:</strong> {course.course_status_id}</div>
        </div>
        <div className="flex flex-col w-1/2 h-full gap-3 p-4 items-center">
          <img className="w-full h-auto rounded-2xl" src={course.course_image} alt={course.course_name} />
          <div className="mt-4 flex flex-col items-center gap-2">
            <Button className="bg-green-600 text-white font-bold py-4 px-6 rounded hover:bg-green-700 flex flex-col items-center p-6" onClick={handleConfirmEnroll}>
              <span className="text-lg font-bold leading-none">Đăng ký</span>
              <span className="text-sm text-gray-200 mt-1">{currentDay}</span>
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CourseItem;
