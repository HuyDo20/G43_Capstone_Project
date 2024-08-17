import React, { useState, useEffect } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import axios from 'axios';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Tooltip, Spin } from 'antd';
import { useNavigate } from "react-router-dom";

export default function DaySchedule({ weekSelected, id = null }) {
  const [daySelected, setDaySelected] = useState(() => weekSelected?.days ? weekSelected?.days[0] : {});
  const [weekData, setWeekData] = useState([]);
  const [weeklyExamId, setWeeklyExamId] = useState(0);
  const [dayData, setDayData] = useState({});
  const [loadingDayData, setLoadingDayData] = useState(null);
  const [examHistory, setExamHistory] = useState([]);
  const [isPassedExam, setIsPassedExam] = useState(false);
  const [isloading, setLoading] = useState(true);
  const navigate = useNavigate();


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

  const checkPassWeeklyExam = () => {
    const passedExam = examHistory.filter(exam => exam.score > 80);
    setIsPassedExam(passedExam.length > 0);
  }

  const isCompletedDay = (index) => {
    const day = weekData[index];
    if (!day) return false;
    const totalLess = day.vocabulary?.total + day.grammar?.total + day.kanji?.total + day.video?.total;

    if (totalLess > 0) {
      const totalLearned = day.vocabulary?.learned + day.grammar?.learned + day.kanji?.learned + day.video?.watched;
      return totalLess === totalLearned;
    }
    return false;
  };

  const getBackgroundColor = (percentage) => {
    return percentage === 100 ? "bg-[#e0f7fa]" : "bg-green-100";
  };

  const handleFetchDetailCourseProgressByDayId = async (dayId) => {
    if (loadingDayData === dayId) return;

    setLoadingDayData(dayId);

    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      const accountId = JSON.parse(localStorage.getItem("user"))?.account_id;
      const response = await axios.post("/get_detail_course_progress_by_day", { accountId, dayId }, {
        headers: { Authorization: token },
      });

      if (response.data.statusCode === 200) {
        setDayData((prevData) => ({
          ...prevData,
          [dayId]: response.data.data,
        }));
      }
    } finally {
      setLoadingDayData(null);
    }
  };

  const handleFetchDetailCourseProgressByWeekId = async (weekId) => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    const accountId = JSON.parse(localStorage.getItem("user"))?.account_id;

    const response = await axios.post("/get_detail_course_progress_by_week", { accountId, weekId }, {
      headers: { Authorization: token },
    });

    if (response.data.statusCode === 200) {
      setWeekData(response.data.data);
      const requestExam = await axios.post("/get_exam_by_course_and_week", { courseId: id, weekId }, {
        headers: { Authorization: token },
      });
      const responseExam = requestExam.data;
      setWeeklyExamId(responseExam.statusCode === 200 ? responseExam.data.data.exam_id : 0);
      await fetchExamHistories();
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

      const url = `/examHistoriesByExamIdAndAccountId`;
   
      const request = await axios.post(url, { weekly_exam_id: weeklyExamId, accountId }, {
        headers: { Authorization: token },
      });
      
      const response = request.data;
      if (response.statusCode === 200) {
        const data = response.data;
        const tempHistory = data.data;
        checkPassWeeklyExam();
        setExamHistory(tempHistory);
      }
    } catch (error) {
      console.error('Error fetching exam histories:', error);
      navigate('/error', { state: { message: error.message } });
    } finally { 
      setLoading(false);
    }
  };


  const handleDaySelect = (day) => {
    setDaySelected(day);
    if (!dayData[day.day_id]) {
      handleFetchDetailCourseProgressByDayId(day.day_id);
    }
  };

  const handleClickVocab = (day) => {
    window.location.href = `/${id}/${weekSelected.week_id}/${day.day_id}/vocabulary`;
  };

  const handleClickKanji = (day) => {
    window.location.href = `/${id}/${weekSelected.week_id}/${day.day_id}/kanji`;
  };

  const handleClickGrammar = (day) => {
    window.location.href = `/${id}/${weekSelected.week_id}/${day.day_id}/grammar`;
  };

  const handleClickVideo = (day) => {
    window.location.href = `/${id}/${weekSelected.week_id}/${day.day_id}/video`;
  };

  const handleClickExam = () => {
    window.location.href = `/${id}/${weekSelected.week_id}/${weeklyExamId}/weeklyExam`;
  };

  const handleClickExamHistory = () => {
    window.location.href = `/${id}/${weekSelected.week_id}/${weeklyExamId}/examsHistory`;
  };


  useEffect(() => {
    if (weekSelected.week_id) {
      handleFetchDetailCourseProgressByWeekId(weekSelected.week_id);
    }
  }, [weekSelected]);

  return (
    <>
    {
      isloading?(
          <div className = "flex justify-center items-center h-full" >
          <Spin size="large" />
          </div>
           ) : (<>
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
            onClick={() => handleDaySelect(day)}
          >
            <AccordionTrigger className='bg-[#c6edc3] pl-12 pr-6 flex items-center justify-between'>
                  <div className="flex items-center">
                  {isCompletedDay(index) ? (
                  <Tooltip title="Learned">
                  <CheckCircleOutlined style={{ color: 'green', fontSize: '25px' }} />
                  </Tooltip>
                  ) : (<Tooltip title="Unlearned">
                  <EmptyCircleIcon style={{ color: 'green', fontSize: '25px' }} />
                  </Tooltip>)}
                <span className='ml-2'>Ngày {index + 1}: {day?.day_name}</span>
              </div>
            </AccordionTrigger>

            {dayData[day.day_id]?.vocabulary?.total !== 0 && (
              <AccordionContent
                onClick={() => handleClickVocab(day)}
                className={`${getBackgroundColor(dayData[day.day_id]?.vocabulary?.percentage)} pt-4 pl-20 mt-1 cursor-pointer`}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div>
                    {dayData[day.day_id]?.vocabulary?.percentage === 100 ? (
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

            {dayData[day.day_id]?.grammar?.total !== 0 && (
              <AccordionContent
                onClick={() => handleClickGrammar(day)}
                className={`bg-green-100 pt-4 pl-20 mt-1 cursor-pointer`}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div>
                    {dayData[day.day_id]?.grammar?.percentage === 100 ? (
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

            {dayData[day.day_id]?.video?.total !== 0 && (
              <AccordionContent
                onClick={() => handleClickVideo(day)}
                className={`bg-green-100 pt-4 pl-20 mt-1 cursor-pointer`}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div>
                    {dayData[day.day_id]?.video?.percentage === 100 ? (
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

            {dayData[day.day_id]?.kanji?.total !== 0 && (
              <AccordionContent
                onClick={() => handleClickKanji(day)}
                className={`bg-green-100 pt-4 pl-20 mt-1 cursor-pointer`}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div>
                    {dayData[day.day_id]?.kanji?.percentage === 100 ? (
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

        {weeklyExamId !== 0 ? (
          <AccordionItem value="item-7">
            <AccordionTrigger className="bg-[#c6edc3] pl-12 pr-6">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div>
                  {isPassedExam === true &&(
                      <Tooltip title="Learned">
                        <CheckCircleOutlined style={{ color: 'green', fontSize: '24px' }} />
                      </Tooltip>
                  )}
                  </div>
                  <span style={{ marginLeft: '8px' }}>Kiểm tra tổng hợp</span>
              </div>
              
            </AccordionTrigger>
            <AccordionContent className="bg-[#effdee] pt-4 pl-20 mt-1 cursor-pointer" onClick={handleClickExam}>
              Kiểm tra
            </AccordionContent>
            <AccordionContent className="bg-[#effdee] pt-4 pl-20 mt-1 cursor-pointer" onClick={handleClickExamHistory}>
              Lịch sử kiểm tra
            </AccordionContent>
          </AccordionItem>
        ) : (
          <AccordionItem value="item-7">
            <AccordionTrigger className="bg-[#c6edc3] pl-12 pr-6">
              Kiểm tra tổng hợp
            </AccordionTrigger>
            <AccordionContent className="bg-[#effdee] pt-4 pl-20 mt-1 cursor-pointer">
              Trống
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  </>)
}
     </>
  );
}
