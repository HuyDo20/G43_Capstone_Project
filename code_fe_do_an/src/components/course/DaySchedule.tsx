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
  const [weeklyExamId, setWeeklyExamId] = useState(0);
  const [dayData, setDayData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
    window.location.href = `/${id}/${weekSelected.week_id}/${weeklyExamId}/weeklyExam`;
    };

   const handleClickExamHistory = () => {
    window.location.href = `/${id}/${weekSelected.week_id}/${weeklyExamId}/examsHistory`;
  };


  const isCompletedDay = (index) => {
    if (!weekData || weekData.length === 0) {
      return false;
    }

    if (weekData[index]?.vocabulary?.percentage === 100 && weekData[index]?.grammar?.percentage === 100 &&
      weekData[index]?.video?.percentage === 100 && weekData[index]?.kanji?.percentage === 100) {
      return true;
    }
    return false;
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
      const requestExam = await axios.post("/get_exam_by_course_and_week", { courseId: id, weekId: weekId }, {
      headers: {
        Authorization: token,
      },
      });
      const responseExam = requestExam.data;
      if (responseExam.statusCode === 200) {
         setWeeklyExamId(responseExam.data.data.exam_id);
      } else {
        setWeeklyExamId(0);
      }
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
            <AccordionTrigger className='bg-[#c6edc3] pl-12 pr-6 flex items-center justify-between'>
            <div className="flex items-center">
            {isCompletedDay(index) && (
            <Tooltip title="Learned">
            <CheckCircleOutlined style={{ color: 'green', fontSize: '25px' }} />
            </Tooltip>
              )}
            <span className='ml-2'>Ngày {index + 1}: {day?.day_name}</span>
            </div>
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
            <CheckCircleOutlined style={{ color: 'green', fontSize: '24px' }} />
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
            <CheckCircleOutlined style={{ color: 'green', fontSize: '24px' }} />
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
            <CheckCircleOutlined style={{ color: 'green', fontSize: '24px' }} />
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

        {weeklyExamId !== 0 ? ( <AccordionItem value="item-7">
          <AccordionTrigger className="bg-[#c6edc3] pl-12 pr-6">
            Kiểm tra tổng hợp
          </AccordionTrigger>
          <AccordionContent className="bg-[#effdee] pt-4 pl-20 mt-1 cursor-pointer" onClick={handleClickExam}>
            Kiểm tra
          </AccordionContent>
          <AccordionContent className="bg-[#effdee] pt-4 pl-20 mt-1 cursor-pointer" onClick={handleClickExamHistory}>
            Lịch sử kiểm tra
          </AccordionContent>
        </AccordionItem>) : (<AccordionItem value="item-7">
          <AccordionTrigger className="bg-[#c6edc3] pl-12 pr-6">
            Kiểm tra tổng hợp
          </AccordionTrigger>
          <AccordionContent className="bg-[#effdee] pt-4 pl-20 mt-1 cursor-pointer">
            Trống
          </AccordionContent>
        </AccordionItem>)}
      </Accordion>
    </div>
  );
}
