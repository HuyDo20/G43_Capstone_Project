import {
  Button,
  Card,
  Collapse,
  Empty,
  Flex,
  List,
  Tag,
  Typography,
  notification,
} from "antd";
import axios from "axios";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const { Panel } = Collapse;

function DayCard({
  dayData,
  setVisibleNewDay,
  setVisibleLesson,
  setDaySelected,
  setDayIndexSelected,
  setLessonSelected,
  setLessonIndexSelected,
  setReload,
}) {
  const handleOpenNewDay = (item, index) => {
    setVisibleNewDay(true);
    setDaySelected(item);
    setDayIndexSelected(index);
  };
  const handleOpenLesson = (item, index) => {
    setVisibleLesson(true);
    setLessonSelected(item);
    setLessonIndexSelected(index);
  };
  const handleDeleteDay = async (dayId) => {
    try {
      let token = "";
      let userId = "";
      const userEncode = localStorage.getItem("user");
      if (userEncode) {
        const userDecode = JSON.parse(userEncode);
        token = userDecode?.token;
        userId = userDecode?.account_id;
      }
      const response = await axios.patch(
        `/day/${dayId}`,
        { account_id: userId },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        notification.success({
          message: "Deleted successfully",
          description: response.data.data.message,
        });
        setReload(true);
      }
    } catch (error) {
      console.error(
        "Error deleting the day:",
        error.response ? error.response.data : error.message
      );
      notification.error({
        message: "Failed to Delete Day",
        description: `Error: ${error.message}`,
      });
    }
  };

  const handleDeleteLesson = async (lesson) => {
    const lessonId =
      lesson.vocab_id ||
      lesson.kanji_id ||
      lesson.grammar_id ||
      lesson.video_id;
    const url = lesson.vocab_id
      ? "vocabulary"
      : lesson.kanji_id
      ? "kanji"
      : lesson.grammar_id
      ? "grammar"
      : lesson.video_id
      ? "video"
      : null;
    try {
      let token = "";
      let userId = "";
      const userEncode = localStorage.getItem("user");
      if (userEncode) {
        const userDecode = JSON.parse(userEncode);
        token = userDecode?.token;
        userId = userDecode?.account_id;
      }
      const response = await axios.patch(
        `/${url}/${lessonId}`,
        { account_id: userId },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        notification.success({
          message: "Deleted successfully",
          description: response.data.data.message,
        });
        setReload(true);
      }
    } catch (error) {
      console.error(
        "Error deleting the lesson:",
        error.response ? error.response.data : error.message
      );
      notification.error({
        message: "Failed to Delete lesson",
        description: `Error: ${error.message}`,
      });
    }
  };
  return (
    <>
      {dayData.length ? (
        dayData.map((day, index) => (
          <Collapse
            key={index}
            defaultActiveKey={["0"]}
            bordered={false}
            style={{
              margin: "2% 0",
              borderRadius: "8px",
              backgroundColor: "#e3eaef",
              textAlign: "left",
            }}
          >
            <Panel
              header={
                <Flex align="center" justify="space-between">
                  <Typography.Title level={5} style={{ marginBottom: "0" }}>
                    Day {index + 1}: {day.day_name}{" "}
                    {day?.repeat_lesson && day?.repeat_lesson.length > 0 && (
                      <>
                        &ensp;
                        <Tag color="warning">Have Repeat</Tag>
                      </>
                    )}
                  </Typography.Title>
                  <Flex>
                    <AiOutlineEdit
                      style={{ width: "20px", height: "20px" }}
                      onClick={() => handleOpenNewDay(day, index)}
                    />
                    &ensp;
                    <AiOutlineDelete
                      style={{ width: "20px", height: "20px" }}
                      onClick={() => handleDeleteDay(day.day_id)}
                    />
                  </Flex>
                </Flex>
              }
              key={index + 1}
            >
              {day.lessons.length ? (
                // (
                //   day.lessons.map((lesson, pos) => {
                //     const title =
                //       lesson.vocab_name ||
                //       lesson.kanji_name ||
                //       lesson.video_name ||
                //       lesson.grammar_name;
                //     return (
                //       <div
                //         key={lesson.id}
                //         style={{
                //           marginBottom: "10px",
                //           backgroundColor: "#fff",
                //           padding: "16px",
                //           display: "flex",
                //           justifyContent: "space-between",
                //         }}
                //       >
                //         <div>
                //           Lesson {pos + 1}: <b>{title}</b>
                //         </div>
                //         <Flex>
                //           <Button onClick={() => handleOpenLesson(lesson, pos)}>
                //             Edit
                //           </Button>
                //           &ensp;
                //           <Button onClick={() => handleDeleteLesson(lesson)}>
                //             Delete
                //           </Button>
                //         </Flex>
                //       </div>
                //     );
                //   })
                // )
                <>
                  {day?.lessons?.filter((item) => item.type === "vocab")
                    ?.length > 0 && (
                    <List
                      header={<div>Vocabulary</div>}
                      bordered
                      dataSource={day.lessons.filter(
                        (item) => item.type === "vocab"
                      )}
                      style={{ marginBottom: "2%", backgroundColor: "#fff" }}
                      renderItem={(item, pos) => {
                        const title = item.vocab_name;
                        return (
                          <List.Item>
                            <div>
                              Lesson Name: <b>{title}</b>
                            </div>
                            <Flex>
                              <Button
                                onClick={() => handleOpenLesson(item, pos)}
                              >
                                Edit
                              </Button>
                              &ensp;
                              <Button onClick={() => handleDeleteLesson(item)}>
                                Delete
                              </Button>
                            </Flex>
                          </List.Item>
                        );
                      }}
                    />
                  )}
                  {day?.lessons?.filter((item) => item.type === "kanji")
                    ?.length > 0 && (
                    <List
                      header={<div>Kanji</div>}
                      bordered
                      style={{ marginBottom: "2%", backgroundColor: "#fff" }}
                      dataSource={day.lessons.filter(
                        (item) => item.type === "kanji"
                      )}
                      renderItem={(item, pos) => {
                        const title = item.kanji_name;
                        return (
                          <List.Item>
                            <div>
                              Lesson Name: <b>{title}</b>
                            </div>
                            <Flex>
                              <Button
                                onClick={() => handleOpenLesson(item, pos)}
                              >
                                Edit
                              </Button>
                              &ensp;
                              <Button onClick={() => handleDeleteLesson(item)}>
                                Delete
                              </Button>
                            </Flex>
                          </List.Item>
                        );
                      }}
                    />
                  )}
                  {day?.lessons?.filter((item) => item.type === "grammar")
                    ?.length > 0 && (
                    <List
                      header={<div>Grammar</div>}
                      bordered
                      style={{ marginBottom: "2%", backgroundColor: "#fff" }}
                      dataSource={day.lessons.filter(
                        (item) => item.type === "grammar"
                      )}
                      renderItem={(item, pos) => {
                        const title = item.grammar_name;
                        return (
                          <List.Item>
                            <div>
                              Lesson Name: <b>{title}</b>
                            </div>
                            <Flex>
                              <Button
                                onClick={() => handleOpenLesson(item, pos)}
                              >
                                Edit
                              </Button>
                              &ensp;
                              <Button onClick={() => handleDeleteLesson(item)}>
                                Delete
                              </Button>
                            </Flex>
                          </List.Item>
                        );
                      }}
                    />
                  )}
                  {day?.lessons?.filter((item) => item.type === "video")
                    ?.length > 0 && (
                    <List
                      header={<div>Video</div>}
                      bordered
                      style={{ marginBottom: "2%", backgroundColor: "#fff" }}
                      dataSource={day.lessons.filter(
                        (item) => item.type === "video"
                      )}
                      renderItem={(item, pos) => {
                        const title = item.video_name;
                        return (
                          <List.Item>
                            <div>
                              Lesson Name: <b>{title}</b>
                            </div>
                            <Flex>
                              <Button
                                onClick={() => handleOpenLesson(item, pos)}
                              >
                                Edit
                              </Button>
                              &ensp;
                              <Button onClick={() => handleDeleteLesson(item)}>
                                Delete
                              </Button>
                            </Flex>
                          </List.Item>
                        );
                      }}
                    />
                  )}
                </>
              ) : (
                <Card style={{ margin: "3% 0" }}>
                  <Empty description={"No have lesson in here"} />
                </Card>
              )}
            </Panel>
          </Collapse>
        ))
      ) : (
        <Card style={{ margin: "3% 0" }}>
          <Empty description={"No have day in here"} />
        </Card>
      )}
    </>
  );
}

export default DayCard;
