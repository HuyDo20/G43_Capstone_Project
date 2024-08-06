import React, { useState, useEffect } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { MdCheck } from 'react-icons/md';
import ExamTakingPopup from '../exam/ExamTaking'; // Ensure correct import path

export default function DaySchedule({ weekSelected, id = null }) {
  const [daySelected, setDaySelected] = useState(() => weekSelected?.days ? weekSelected?.days[0] : {});
  const [weekData, setWeekData] = useState([]);
  const [dayData, setDayData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showExam, setShowExam] = useState(false);
  const { FaCheck } = useLocation();

 const EmptyCircleIcon = () => (
  <span
    style={{
      display: 'inline-block',
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      border: '2px solid green',
    }}
  ></span>
);
  
  const handleClickVocab = () => {
    window.location.href = `/${id}/${weekSelected.week_id}/${daySelected.day_id}/vocabulary`;
  };

  const testData = {
  courseTitle: "English 101",
  examTitle: "Final Exam",
  examData: {
    readingQuestions: [
      {
        id: 921373,
        type: "Reading",
        content: "Read the passage below and answer the questions that follow.",
        imageUrl: "http://localhost:5000/uploads/example_reading_image.png",
        subQuestions: [
          {
            id: 1722836600327,
            questionContent: "What is the main idea of the passage?",
            options: [
              { id: 1722836609360, content: "To inform about the benefits of regular exercise." },
              { id: 1722836610689, content: "To discuss the challenges of learning a new language." },
              { id: 1722836611792, content: "To describe the process of photosynthesis." },
              { id: 1722836615306, content: "To explain the history of the internet." }
            ],
            imageUrl: null,
            isEditing: false,
            correctOptionId: 1722836609360
          },
          {
            id: 1722836618555,
            questionContent: "Which of the following is NOT mentioned in the passage?",
            options: [
              { id: 1722836618556, content: "Health benefits of exercise." },
              { id: 1722836618557, content: "Common obstacles to regular exercise." },
              { id: 1722836618558, content: "Exercise equipment recommendations." },
              { id: 1722836618559, content: "The role of diet in fitness." }
            ],
            imageUrl: null,
            isEditing: false,
            correctOptionId: 1722836618558
          }
        ]
      },
      {
        id: 950085,
        type: "Reading",
        content: "Analyze the provided text and respond to the queries.",
        imageUrl: "http://localhost:5000/uploads/example_reading_image2.png",
        subQuestions: [
          {
            id: 1722836654116,
            questionContent: "What is the author's purpose in writing this text?",
            options: [
              { id: 1722836656880, content: "To persuade readers to adopt a new technology." },
              { id: 1722836657478, content: "To provide information about a recent discovery." },
              { id: 1722836658259, content: "To narrate a personal experience." },
              { id: 1722836658862, content: "To compare different approaches to a problem." }
            ],
            imageUrl: null,
            isEditing: false,
            correctOptionId: 1722836657478
          }
        ]
      }
    ],
    listeningQuestions: [
      {
        id: 927497,
        type: "Listening",
        audioUrl: "http://localhost:5000/uploads/example_listening_audio.mp3",
        subQuestions: [
          {
            id: 1722836600328,
            questionContent: "What is the speaker's main argument?",
            options: [
              { id: 1722836609361, content: "The importance of healthy eating." },
              { id: 1722836610690, content: "The benefits of daily meditation." },
              { id: 1722836611793, content: "The impact of technology on education." },
              { id: 1722836615307, content: "The effects of climate change." }
            ],
            imageUrl: null,
            isEditing: false,
            correctOptionId: 1722836611793
          }
        ]
      }
    ],
    multiChoiceQuestions: [
      {
        id: 143249,
        type: "Multi-choice",
        content: "What is the capital of France?",
        options: [
          { id: 1722836533109, content: "Berlin" },
          { id: 1722836533700, content: "Madrid" },
          { id: 1722836534466, content: "Paris" },
          { id: 1722836535067, content: "Rome" }
        ],
        imageUrl: null,
        correctOptionId: 1722836534466
      },
      {
        id: 213005,
        type: "Multi-choice",
        content: "Which planet is known as the Red Planet?",
        options: [
          { id: 1722836580847, content: "Earth" },
          { id: 1722836581394, content: "Mars" },
          { id: 1722836582359, content: "Jupiter" },
          { id: 1722836583202, content: "Saturn" }
        ],
        imageUrl: null,
        correctOptionId: 1722836581394
      }
    ]
  }
};


  const handleClickKanji = () => {
    window.location.href = `/${id}/${weekSelected.week_id}/${daySelected.day_id}/kanji`;
  };

  const handleClickGrammar = () => {
    window.location.href = `/${id}/${weekSelected.week_id}/${daySelected.day_id}/grammar`;
  };

  const handleClickVideo = () => {
    window.location.href = `/${id}/${weekSelected.week_id}/${daySelected.day_id}/video`;
  };

  const handleClickExam = () => {
    setShowExam(true);
  };

  const handleCloseExam = () => {
    setShowExam(false);
  };

  const getBackgroundAccordionColor = (index) => {
    if (!weekData || weekData.length === 0) {
      return "bg-[#c6edc3]";
    }

    if (weekData[index]?.vocabulary?.percentage === 100 && weekData[index]?.grammar?.percentage === 100 &&
      weekData[index]?.video?.percentage === 100 && weekData[index]?.kanji?.percentage === 100) {
      return "bg-[#e0f7fa]";
    }
    return "bg-[#c6edc3]";
  };

  const getBackgroundColor = (percentage) => {
    return percentage === 100 ? "bg-[#e0f7fa]" : "bg-green-100";
  };

  const handleFetchDetailCourseProgressByDayId = async (dayId) => {
    let token = "";
    let accountId;
    const userEncode = localStorage.getItem("user");
    if (userEncode) {
      const userDecode = JSON.parse(userEncode);
      token = userDecode?.token;
      accountId = userDecode?.account_id;
    }
    const request = await axios.post("/get_detail_course_progress_by_day", { accountId, dayId: dayId }, {
      headers: {
        Authorization: token,
      },
    });
    const response = request.data;
    if (response.statusCode === 200) {
      setDayData(response.data);
    }
  };

  const handleFetchDetailCourseProgressByWeekId = async (weekId) => {
    let token = "";
    let accountId;
    const userEncode = localStorage.getItem("user");
    if (userEncode) {
      const userDecode = JSON.parse(userEncode);
      token = userDecode?.token;
      accountId = userDecode?.account_id;
    }
    const request = await axios.post("/get_detail_course_progress_by_week", { accountId, weekId: weekId }, {
      headers: {
        Authorization: token,
      },
    });
    const response = request.data;
    if (response.statusCode === 200) {
      setWeekData(response.data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      if (weekSelected.week_id) {
        await handleFetchDetailCourseProgressByWeekId(weekSelected.week_id);
      }

      if (daySelected.day_id) {
        await handleFetchDetailCourseProgressByDayId(daySelected.day_id);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [daySelected, weekSelected]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {showExam && (
        <ExamTakingPopup
          courseTitle={testData.courseTitle}
          examTitle={testData.examTitle}
          questions={testData.examData}
           onClose={handleCloseExam}
        />
      )}
      <Accordion
        type="single"
        collapsible
        className="flex flex-col w-full gap-3"
      >
        {weekSelected?.days?.map((day, index) => (
          <AccordionItem
            value={`item-${index + 1}`}
            key={index}
            onClick={() => setDaySelected(day)}
          >
            <AccordionTrigger className={`${getBackgroundAccordionColor(index)} pl-12 pr-6`}>
              Ngày {index + 1}: {day?.day_name}
            </AccordionTrigger>

            {dayData.vocabulary?.total !== 0 && (
             <AccordionContent
             onClick={handleClickVocab}
            className={`${getBackgroundColor(dayData.vocabulary?.percentage)} pt-4 pl-20 mt-1 cursor-pointer`}
            >
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>
            {dayData.vocabulary?.percentage === 100 ? (
            <Tooltip title="Learned">
            <CheckCircleOutlined style={{ color: 'green', fontSize: '24px' }} />
            </Tooltip>
             ) : (
            <Tooltip title="Not Learned">
           <EmptyCircleIcon />
           </Tooltip>
            )}
          </div>
         <span style={{ marginLeft: '8px' }}>Từ vựng</span>
        </div>
        </AccordionContent>
            )}

          {dayData.grammar?.total !== 0 && (
  <AccordionContent
    onClick={handleClickGrammar}
    className={`${getBackgroundColor(dayData.grammar?.percentage)} pt-4 pl-20 mt-1 cursor-pointer`}
  >
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div>
        {dayData.grammar?.percentage === 100 ? (
          <Tooltip title="Learned">
            <MdCheck style={{ color: 'green', fontSize: '24px' }} />
          </Tooltip>
        ) : (
          <Tooltip title="Not Learned">
            <EmptyCircleIcon />
          </Tooltip>
        )}
      </div>
      <span style={{ marginLeft: '8px' }}>Ngữ pháp</span>
    </div>
  </AccordionContent>
)}

{dayData.video?.total !== 0 && (
  <AccordionContent
    onClick={handleClickVideo}
    className={`${getBackgroundColor(dayData.video?.percentage)} pt-4 pl-20 mt-1 cursor-pointer`}
  >
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div>
        {dayData.video?.percentage === 100 ? (
          <Tooltip title="Learned">
            <MdCheck style={{ color: 'green', fontSize: '24px' }} />
          </Tooltip>
        ) : (
          <Tooltip title="Not Learned">
            <EmptyCircleIcon />
          </Tooltip>
        )}
      </div>
      <span style={{ marginLeft: '8px' }}>Video bổ trợ</span>
    </div>
  </AccordionContent>
)}

{dayData.kanji?.total !== 0 && (
  <AccordionContent
    onClick={handleClickKanji}
    className={`${getBackgroundColor(dayData.kanji?.percentage)} pt-4 pl-20 mt-1 cursor-pointer`}
  >
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div>
        {dayData.kanji?.percentage === 100 ? (
          <Tooltip title="Learned">
            <MdCheck style={{ color: 'green', fontSize: '24px' }} />
          </Tooltip>
        ) : (
          <Tooltip title="Not Learned">
            <EmptyCircleIcon />
          </Tooltip>
        )}
      </div>
      <span style={{ marginLeft: '8px' }}>Kanji</span>
    </div>
  </AccordionContent>
)}


          </AccordionItem>
        ))}
        <AccordionItem value="item-7">
          <AccordionTrigger className="bg-[#c6edc3] pl-12 pr-6">
            Kiểm tra tổng hợp
          </AccordionTrigger>
          <AccordionContent className="bg-[#effdee] pt-4 pl-20 mt-1 cursor-pointer" onClick={handleClickExam}>
            Kiểm tra
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
