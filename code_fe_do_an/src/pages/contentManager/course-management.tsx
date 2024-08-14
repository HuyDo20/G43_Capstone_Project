import { useAuth } from "@/hook/AuthContext";
import { Tabs, Table, Button, Modal, Input, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";

interface Course {
  course_id: number;
  course_name: string;
  description: string;
  course_status_id: number;
  course_image: string;
  week: number;
  deactive_reason?: string; // Optional field for deactivation reason
}

const statusLabels = {
  1: "Pending",
  2: "Active",
  3: "Deactivated",
};

const CoursesManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const { handleFetch } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [reload, setReload] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    course_id: number;
    action: string;
    reason?: string;
  } | null>(null);
  const [deactivationReason, setDeactivationReason] = useState<string>("");

  const showConfirmModal = (course_id: number, action: string) => {
    setConfirmAction({ course_id, action });
    setIsModalVisible(true);
  };

  const handleActionView = (course_id: number) => {
     navigate(`/contentManager/course-management/${course_id}`, {
        state: { mode: "view" },
      });
  }

const handleOk = async () => {
  try {
    if (!confirmAction) return;
    const { course_id, action } = confirmAction;
    // Determine the new course status ID based on the action
    let course_status_id;
    let note;
    let requestData = {course_status_id, note, deactivationReason};

    if (action === "activate") {
      course_status_id = 2; // Assuming 2 is the status ID for active
      requestData.note = ""; 
    } else if (action === "reject") {
      if (deactivationReason === "" || !deactivationReason) {
        message.warning("Please provide a reason for deactivation.");
        return;
      }
      course_status_id = 3; 
      requestData.note = deactivationReason; 
    }

    requestData.course_status_id = course_status_id;

    //call backend
      let token = "";
      let accountId;
      const userEncode = localStorage.getItem("user");
      if (userEncode) {
        const userDecode = JSON.parse(userEncode);
        token = userDecode?.token;
        accountId = userDecode?.account_id;
       }
      const request = await axios.put(`/course/${course_id}`, { course_status_id: requestData.course_status_id , note: requestData.note}, {
        headers: {
          Authorization: token,
        },
      });
      const response = request.data;
    // Handle success or failure response
    if (response.statusCode === 200) {
      message.success("Cập nhật trạng thái khóa học thành công");
      setReload(true); // Trigger reload of data
    } else {
      message.error(`Failed to update course with ID: ${course_id}.`);
      alert(`Failed to update course. Please try again.`);
    }

    // Reset the modal state
    setIsModalVisible(false);
    setDeactivationReason("");
  } catch (error) {
    console.log("Error in handleOk:", error);
    message.error("An error occurred while processing your request. Please try again.");
  }
};

  const handleCancel = () => {
    setIsModalVisible(false);
    setDeactivationReason("");
  };

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
          console.log(response.data);
          setCourses(response.data);
        }
      } catch (error) {
        console.error(error);
        navigate('/error', { state: { message: error } });
      }
    };
    if (reload) {
      fetchCourses();
      setReload(false);
    }
  }, [reload]);

  const renderActions = (course: Course) => {
    switch (course.course_status_id) {
      case 1: // Pending
        return (
          <div className="flex flex-row gap-2">
            <Button onClick={() => handleActionView(course.course_id)}>
              View
            </Button>
            <Button
              type="primary"
              onClick={() => showConfirmModal(course.course_id, "activate")}
            >
              Activate
            </Button>
            <Button
              danger
              onClick={() => showConfirmModal(course.course_id, "reject")}
            >
              Reject
            </Button>
          </div>
        );
      case 2: // Active
        return (
          <div className="flex flex-row gap-2">
            <Button onClick={() => handleActionView(course.course_id)}>
              View
            </Button>
            <Button
              danger
              onClick={() => showConfirmModal(course.course_id, "reject")}
            >
              Reject
            </Button>
          </div>
        );
      case 3: // Deactivated
        return (
          <div className="flex flex-row gap-2">
            <Button onClick={() => handleActionView(course.course_id)}>
              View
            </Button>
            <Button
              type="primary"
              onClick={() => showConfirmModal(course.course_id, "activate")}
            >
              Activate
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  const commonColumns = [
  {
    title: "Tên khóa",
    dataIndex: "course_name",
    key: "course_name",
    width: 150, 
  },
  {
    title: "Ảnh đại diện",
    dataIndex: "course_image",
    key: "course_image",
    width: 120, 
    render: (course_image: string) => (
      <img
        src={course_image?.split(", ")[1] || course_image?.split(", ")[0] || ""}
        style={{ maxWidth: "100px" }}
        alt="thumbnail course"
      />
    ),
  },
  {
    title: "Miêu tả",
    dataIndex: "description",
    key: "description",
    width: 250, 
  },
  {
    title: "Số tuần",
    dataIndex: "week",
    key: "week",
    width: 80, 
  },
  {
    title: "Trạng thái",
    dataIndex: "course_status_id",
    key: "status",
    width: 100, 
    render: (status: number) => statusLabels[status],
  },
];

const columns = [
  ...commonColumns,
  {
    title: "Thao tác",
    key: "actions",
    width: 200, 
    render: (_: any, record: Course) => renderActions(record),
  },
];

const deactivatedColumns = [
  ...commonColumns,
  {
    title: "Lý do",
    dataIndex: "note",
    key: "note",
    width: 250, 
  },
  {
    title: "Thao tác",
    key: "actions",
    width: 200, 
    render: (_: any, record: Course) => renderActions(record),
  },
];


  const activeCourses = courses.filter(course => course.course_status_id === 2);
  const pendingCourses = courses.filter(course => course.course_status_id === 1);
  const deactivatedCourses = courses.filter(course => course.course_status_id === 3);

  return (
    <>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Khóa học đang hoạt động" key="1">
          <Table dataSource={activeCourses} columns={columns} rowKey="course_id" />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Chờ duyệt" key="2">
          <Table dataSource={pendingCourses} columns={columns} rowKey="course_id" />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Khóa học vô hiệu hóa" key="3">
          <Table dataSource={deactivatedCourses} columns={deactivatedColumns} rowKey="course_id" />
        </Tabs.TabPane>
      </Tabs>
      <Modal
        title={confirmAction?.action === "reject" ? "Reject Course" : "Activate Course"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {confirmAction?.action === "reject" ? (
          <Input.TextArea
            value={deactivationReason}
            onChange={(e) => setDeactivationReason(e.target.value)}
            placeholder="Please provide a reason for deactivation"
            rows={4}
          />
        ) : (
          <p>Bạn có chắc muốn {confirmAction?.action} khóa này?</p>
        )}
      </Modal>
    </>
  );
};

export default CoursesManagementPage;
