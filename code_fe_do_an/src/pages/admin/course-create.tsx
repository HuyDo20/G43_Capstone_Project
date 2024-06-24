import { useState } from "react";
import { Steps, Typography, Card, notification } from "antd";
import { StepOne, StepTwo, StepThree } from "@/components/createCoure";
import type { GetProp, UploadFile, UploadProps } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

function CourseCreatePage() {
  const navigate = useNavigate();
  const [waitingCreate, setWaitingCreate] = useState(false);
  const [step, setStep] = useState(0);
  const [course, setCourse] = useState({
    course_name: "",
    description: "",
    course_image: "",
    course_status_id: 1,
    week: "0",
  });
  const [weekData, setWeekData] = useState([]);

  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const handleNextStep = () => setStep(step + 1);
  const handlePreviousStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    try {
      let token = "";
      let id = "";
      const userEncode = localStorage.getItem("user");
      if (userEncode) {
        const userDecode = JSON.parse(userEncode);
        token = userDecode?.token;
        id = userDecode?.account_id;
      }
      setWaitingCreate(true);
      const createCourse = await axios.post(
        "/course",
        { ...course, account_id: id },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (createCourse.status === 201) {
        const createCourseResponse = createCourse.data?.data?.data;
        const courseId = createCourseResponse.course_id;
        await weekData.forEach(async (week) => {
          const createWeek = await axios.post(
            "/week",
            {
              ...week,
              course_id: courseId,
              account_id: id,
            },
            {
              headers: {
                Authorization: token,
              },
            }
          );
          if (createWeek.status === 201) {
            const createWeekResponse = createWeek.data?.data?.data;
            const weekId = createWeekResponse.week_id;
            await week.days.forEach(async (day) => {
              const createDay = await axios.post(
                "/day",
                {
                  ...day,
                  week_id: weekId,
                  account_id: id,
                },
                {
                  headers: {
                    Authorization: token,
                  },
                }
              );
              if (createDay.status === 201) {
                const createDayResponse = createDay.data?.data?.data;
                const dayId = createDayResponse.day_id;
                day.lessons.forEach(async (lesson) => {
                  switch (lesson.type) {
                    case "vocab":
                      await axios.post(
                        "/vocabulary",
                        {
                          ...lesson,
                          vocab_status_id: 1,
                          account_id: id,
                          day_id: dayId,
                        },
                        {
                          headers: {
                            Authorization: token,
                          },
                        }
                      );
                      break;
                    case "kanji":
                      const createKanji = await axios.post(
                        "/kanji",
                        {
                          ...lesson,
                          kanji_status_id: 1,
                          account_id: id,
                          day_id: dayId,
                        },
                        {
                          headers: {
                            Authorization: token,
                          },
                        }
                      );
                      if (createKanji.status === 201) {
                        const createKanjiResponse =
                          createKanji.data?.data?.data;
                        const kanjiId = createKanjiResponse.kanji_id;
                        lesson.kanji_words.forEach(async (kanji) => {
                          await axios.post(
                            "/kanji_word",
                            {
                              ...kanji,
                              kanji_word_status_id: 1,
                              account_id: id,
                              kanji_id: kanjiId,
                            },
                            {
                              headers: {
                                Authorization: token,
                              },
                            }
                          );
                        });
                      }
                      break;
                    case "grammar":
                      const createGrammar = await axios.post(
                        "/grammar",
                        {
                          ...lesson,
                          grammar_status_id: 1,
                          account_id: id,
                          day_id: dayId,
                        },
                        {
                          headers: {
                            Authorization: token,
                          },
                        }
                      );
                      if (createGrammar.status === 201) {
                        const createGrammarResponse =
                          createGrammar.data?.data?.data;
                        const grammarId = createGrammarResponse.grammar_id;
                        lesson.grammar_examples.forEach(async (grammar) => {
                          await axios.post(
                            "/grammar_example",
                            {
                              ...grammar,
                              grammar_example_status_id: 1,
                              account_id: id,
                              grammar_id: grammarId,
                            },
                            {
                              headers: {
                                Authorization: token,
                              },
                            }
                          );
                        });
                      }
                      break;
                    case "video":
                      const createVideo = await axios.post(
                        "/video",
                        {
                          ...lesson,
                          video_status_id: 1,
                          account_id: id,
                          day_id: dayId,
                          video_link: lesson.video_link
                            ? lesson.video_link
                            : "",
                        },
                        {
                          headers: {
                            Authorization: token,
                          },
                        }
                      );
                      if (createVideo.status === 201) {
                        const createVideoResponse =
                          createVideo.data?.data?.data;
                        const videoId = createVideoResponse.video_id;
                        lesson.questions.forEach(async (question) => {
                          const createVideoQuestion = await axios.post(
                            "/video_question",
                            {
                              ...question,
                              video_question_status_id: 1,
                              account_id: id,
                              video_id: videoId,
                            },
                            {
                              headers: {
                                Authorization: token,
                              },
                            }
                          );
                          if (createVideoQuestion.status === 201) {
                            const createVideoQuestionResponse =
                              createVideoQuestion.data?.data?.data;
                            const videoQuestionId =
                              createVideoQuestionResponse.video_question_id;
                            question.options.forEach(async (option) => {
                              await axios.post(
                                "/video_option",
                                {
                                  ...option,
                                  video_option_status_id: 1,
                                  account_id: id,
                                  video_question_id: videoQuestionId,
                                },
                                {
                                  headers: {
                                    Authorization: token,
                                  },
                                }
                              );
                            });
                          }
                        });
                      }
                      break;
                    default:
                      break;
                  }
                });
              }
            });
          }
        });
      }
      notification.success({
        message: "Course Creation Successful",
        description:
          "You have successfully created a new course and associated data.",
      });
      setTimeout(() => {
        setWaitingCreate(false);
        navigate("/admin/course-management/manage");
      }, 2000);
    } catch (e) {
      setWaitingCreate(false);
      notification.error({
        message: "Failed to Create Course",
        description: `Error: ${e.message}`,
      });
      console.log(e.message);
    }
  };

  return (
    <div style={{ margin: "0 auto", textAlign: "center" }}>
      <Typography.Title level={3}>Create New Course</Typography.Title>
      <Steps current={step} style={{ margin: "2% auto", maxWidth: "800px" }}>
        <Steps.Step title="Create Course" />
        <Steps.Step title="Add more week and lesson" />
        <Steps.Step title="Finish" />
      </Steps>
      <Card style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {step === 0 && (
          <StepOne
            course={course}
            setCourse={setCourse}
            fileList={fileList}
            setFileList={setFileList}
            onPreview={onPreview}
            handleNextStep={handleNextStep}
          />
        )}
        {step === 1 && (
          <StepTwo
            week={parseInt(course.week)}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
            weekData={weekData}
            setWeekData={setWeekData}
          />
        )}
        {step === 2 && (
          <StepThree
            handlePreviousStep={handlePreviousStep}
            handleSubmit={handleSubmit}
            waitingCreate={waitingCreate}
          />
        )}
      </Card>
    </div>
  );
}

export default CourseCreatePage;
