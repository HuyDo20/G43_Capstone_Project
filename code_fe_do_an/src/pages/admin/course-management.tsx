import React, { useEffect, useState } from "react";
import { Button, Table, Tag, Modal, Form, Input, Select } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Course {
  course_id: number;
  course_name: string;
  description: string;
  course_status_id: number;
  course_image: string;
  week: number;
}

const defaultCourseData: Course = {
  course_id: 0,
  course_name: "",
  description: "",
  course_status_id: 2,
  course_image: "",
  week: 0,
};

interface CourseModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  data: Course | null;
  setReload: (reload: boolean) => void;
}

const CourseModal: React.FC<CourseModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  data,
  setReload,
}) => {
  const [courseData, setCourseData] = useState<Course>(defaultCourseData);

  useEffect(() => {
    if (data) {
      setCourseData(data);
    }
  }, [data]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = async () => {
    // API call to save the data
    setIsModalOpen(false);
    setReload(true);
  };

  return (
    <Modal
      title={data ? "Update Course" : "Create Course"}
      visible={isModalOpen}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form layout="vertical">
        <Form.Item label="Course Name">
          <Input
            name="course_name"
            value={courseData.course_name}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Description">
          <Input
            name="description"
            value={courseData.description}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Week">
          <Input
            name="week"
            type="number"
            value={courseData.week}
            onChange={handleChange}
          />
        </Form.Item>
        {/* Additional form fields can be added here */}
      </Form>
    </Modal>
  );
};

const CoursesManagementPage: React.FC = () => {
  const navigate = useNavigate()
  const [courses, setCourses] = useState<Course[]>([]);
  const [reload, setReload] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
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
      }
    };
    if (reload) {
      fetchCourses();
    }
  }, [reload]);

  const columns = [
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Week",
      dataIndex: "week",
      key: "week",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Course) => (
        <Button
          onClick={() => {
            setSelectedCourse(record);
            setIsModalOpen(true);
          }}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          navigate("/admin/course-management/create");
        }}
        style={{ marginBottom: "8px" }}
      >
        Add Course
      </Button>
      <Table dataSource={courses} columns={columns} rowKey="course_id" />
      <CourseModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        data={selectedCourse}
        setReload={setReload}
      />
    </>
  );
};

export default CoursesManagementPage;
