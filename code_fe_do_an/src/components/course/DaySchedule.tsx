import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { MdCheck } from 'react-icons/md';

export default function DaySchedule({ weekSelected, id = null }) {
  const [daySelected, setDaySelected] = useState(() =>
    weekSelected?.days ? weekSelected?.days[0] : {}
  );
  const [dayData, setDayData] = useState([]);
  const { FaCheck  } = useLocation();


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

  const getBackgroundColor = (percentage) => {
    return percentage === 100 ? "bg-[#e0f7fa]" : "bg-green-100";
  };

  const handleFetchDetailCourseProgress = async (dayId) => {
      let token = "";
      let accountId;
      const userEncode = localStorage.getItem("user");
      if (userEncode) {
        const userDecode = JSON.parse(userEncode);
        token = userDecode?.token;
        accountId = userDecode?.account_id;
      }
      const request = await axios.post("/get_detail_course_progress_by_day", { accountId, dayId:  dayId}, {
        headers: {
          Authorization: token,
        },
      });
    const response = request.data; 
      if (response.statusCode === 200) {
        setDayData(response.data);
      }
  };

  useEffect(() => { 

    if (daySelected.day_id) {
      handleFetchDetailCourseProgress(daySelected.day_id);
    }
  },[daySelected])

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
            <AccordionTrigger className="bg-[#c6edc3] pl-12 pr-6">
              Ngày {index + 1}: {day?.day_name}
            </AccordionTrigger>
            <AccordionContent
              onClick={handleClickVocab}
              className={`${getBackgroundColor(dayData.vocabulary?.percentage)} pt-4 pl-20 mt-1 cursor-pointer`}
            >
              Từ mới
              {dayData.vocabulary?.percentage === 100&&(<MdCheck className="inline ml-2" />)}
              
            </AccordionContent>
            
            <AccordionContent
              onClick={handleClickGrammar}
              className={`${getBackgroundColor(dayData.grammar?.percentage)} pt-4 pl-20 mt-1 cursor-pointer`}
            >
              Ngữ pháp
                 {dayData.grammar?.percentage === 100&&(<MdCheck className="inline ml-2" />)}
            </AccordionContent>
            <AccordionContent
              onClick={handleClickVideo}
              className={`${getBackgroundColor(dayData.video?.percentage)} pt-4 pl-20 mt-1 cursor-pointer`}
            >
              Video bổ trợ
            {dayData.video?.percentage === 100&&(<MdCheck className="inline ml-2" />)}
            </AccordionContent>
            <AccordionContent
              onClick={handleClickKanji}
              className={`${getBackgroundColor(dayData.kanji?.percentage)} pt-4 pl-20 mt-1 cursor-pointer`}
            >
              Kanji
            {dayData.kanji?.percentage === 100&&(<MdCheck className="inline ml-2" />)}
            </AccordionContent>
          </AccordionItem>
        ))}
        <AccordionItem value="item-7">
          <AccordionTrigger className="bg-[#c6edc3] pl-12 pr-6">
            Kiểm tra tổng hợp
          </AccordionTrigger>
          <AccordionContent className="bg-[#effdee] pt-4 pl-20 mt-1">
            Kiểm tra
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
