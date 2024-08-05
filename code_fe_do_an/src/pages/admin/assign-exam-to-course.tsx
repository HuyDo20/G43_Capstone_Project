import React, { useState, useEffect } from 'react';
import { Button, Form, Select, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hook/AuthContext';

const { Option } = Select;

interface Course {
  course_id: number;
  course_name: string;
}

interface Exam {
  exam_id: number;
  exam_name: string;
}

const AssignExamToCourse: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [selectedExam, setSelectedExam] = useState<number | null>(null);
  const navigate = useNavigate();
  const { handleFetch } = useAuth();

  useEffect(() => {
    fetchCourses();
    fetchExams();
  }, []);

  const fetchCourses = async () => {
      try {
        let token = "";
        const userEncode = localStorage.getItem("user");
        if (userEncode) {
          const userDecode = JSON.parse(userEncode);
          token = userDecode?.token;
        }
        const request = await axios.get("/all_course", {
          headers: {
            Authorization: token,
          },
        });
          const response = request.data;
        if (response.statusCode === 200) {
          setCourses(response.data);
        }
      } catch (error) {
        console.error(error);
        navigate('/error', { state: { message: error} });
      }
    };

      const fetchExams = async () => {
    try {
      let token = "";
      const userEncode = localStorage.getItem("user");
      if (userEncode) {
        const userDecode = JSON.parse(userEncode);
        token = userDecode?.token;
      }

      const request = await axios.get('/getAllExam', {
        headers: {
          Authorization: token,
        },
      });
        if (request.status === 200) {
        setExams(request.data.data.data); 
      } else {
        setExams([]);
      }
    } catch (error) {
      message.error('Failed to fetch exams.');
      navigate('/error', { state: { message: error.message } });
    }
  };

  const handleAssign = async () => {
    if (!selectedCourse || !selectedExam) {
      message.warning('Please select both a course and an exam.');
      return;
      }
   try {
      let token = "";
      let accountId;
      const userEncode = localStorage.getItem("user");
      if (userEncode) {
        const userDecode = JSON.parse(userEncode);
        token = userDecode?.token;
        accountId = userEncode ? JSON.parse(userEncode)?.account_id : null;
      }
      const request = await axios.post(`/assign`, {account_id:accountId, course_id:selectedCourse,exam_id:selectedExam }, {
        headers: {
          Authorization: token,
        },
      });

      if (request.status === 201) {
        message.success('Assign exam successfully!');
      }
    } catch (error) {
      message.error('Failed to save exam.');
      navigate('/error', { state: { message: error.message } });
      }
  };

 
  return (
    <div>
      <h2>Assign Exam to Course</h2>
      <Form layout="vertical">
        <Form.Item label="Select Course">
          <Select
            placeholder="Select a course"
            onChange={(value) => setSelectedCourse(value as number)}
          >
            {courses.map(course => (
              <Option key={course.course_id} value={course.course_id}>
                {course.course_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Select Exam">
          <Select
            placeholder="Select an exam"
            onChange={(value) => setSelectedExam(value as number)}
          >
            {exams.map(exam => (
              <Option key={exam.exam_id} value={exam.exam_id}>
                {exam.exam_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleAssign}>
            Assign Exam
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AssignExamToCourse;
