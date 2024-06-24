import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Typography, Input } from "antd";
import { useEffect, useState } from "react";
import AddDayModal from "../Modal/AddDay";
import AddLessonModal from "../Modal/AddLesson";
import DayCard from "./DayCard";

function WeekCard({ weekIndex = 0, setWeekData, weekData = [] }) {
  const [visible, setVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dayData, setDayData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [topicName, setTopicName] = useState(weekData[weekIndex]?.week_topic);

  const showLessonModal = () => {
    setIsModalVisible(true);
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleLessonCancel = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleTopicClick = () => {
    setIsEditing(true);
  };

  const handleTopicChange = (e) => {
    setTopicName(e.target.value);
  };

  const handleTopicBlur = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    let cloneWeekData = [...weekData];
    cloneWeekData[weekIndex] = {
      week_name: `Week ${weekIndex + 1}`,
      week_topic: topicName,
      course_id: null,
      week_status_id: 1,
      days: dayData,
    };
    setWeekData(cloneWeekData);
  }, [dayData, topicName]);

  useEffect(() => {
    setTopicName(weekData[weekIndex]?.week_topic);
  }, [weekData, weekIndex]);

  return (
    <>
      <Flex align="center" justify="space-between">
        {isEditing ? (
          <Input
            value={topicName}
            onChange={handleTopicChange}
            onBlur={handleTopicBlur}
            style={{ maxWidth: "200px" }}
            autoFocus
            placeholder="Topic Name"
          />
        ) : (
          <Typography.Title
            level={3}
            style={{ cursor: "pointer" }}
            onClick={handleTopicClick}
          >
            Topic: {topicName}
          </Typography.Title>
        )}
        <Flex>
          <Button
            icon={<PlusOutlined />}
            className="custom-button"
            onClick={showModal}
          >
            Add New Day
          </Button>
          <div style={{ width: "10px" }}></div>
          <Button
            icon={<PlusOutlined />}
            className="custom-button"
            onClick={showLessonModal}
          >
            Add New Lesson
          </Button>
        </Flex>
      </Flex>

      <DayCard dayData={dayData} />
      <AddDayModal
        dayData={dayData}
        setDayData={setDayData}
        onCancel={handleCancel}
        visible={visible}
      />
      <AddLessonModal
        onCancel={handleLessonCancel}
        visible={isModalVisible}
        dayData={dayData}
        setDayData={setDayData}
      />
    </>
  );
}

export default WeekCard;
