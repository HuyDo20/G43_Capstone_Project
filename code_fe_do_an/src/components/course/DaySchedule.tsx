import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
export default function DaySchedule({ weekSelected, id = null }) {
  const [daySelected, setDaySelected] = useState(() =>
    weekSelected?.days ? weekSelected?.days[0] : {}
  );
  const { pathname } = useLocation();
  const navigate = useNavigate();

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
            <AccordionTrigger className="bg-[#ffefc0] pl-12 pr-6">
              Ngày {index + 1}: {day?.day_name}
            </AccordionTrigger>
            {daySelected?.lessons?.filter((item) => item.vocab_id)?.length >
              0 && (
              <AccordionContent
                onClick={handleClickVocab}
                className={
                  pathname?.includes("vocabulary")
                    ? "pt-4 pl-20 mt-1 cursor-pointer bg-[#FFEFC0]"
                    : "bg-[#fff8e1] pt-4 pl-20 mt-1 cursor-pointer hover:bg-[#FFEFC0]"
                }
              >
                Từ mới
              </AccordionContent>
            )}
            {daySelected?.lessons?.filter((item) => item.grammar_id)?.length >
              0 && (
              <AccordionContent
                onClick={handleClickGrammar}
                className={
                  pathname?.includes("grammar")
                    ? "pt-4 pl-20 mt-1 cursor-pointer bg-[#FFEFC0]"
                    : "bg-[#fff8e1] pt-4 pl-20 mt-1 cursor-pointer hover:bg-[#FFEFC0]"
                }
              >
                Ngữ pháp
              </AccordionContent>
            )}
            {daySelected?.lessons?.filter((item) => item.video_id)?.length >
              0 && (
              <AccordionContent
                onClick={handleClickVideo}
                className={
                  pathname?.includes("video")
                    ? "pt-4 pl-20 mt-1 cursor-pointer bg-[#FFEFC0]"
                    : "bg-[#fff8e1] pt-4 pl-20 mt-1 cursor-pointer hover:bg-[#FFEFC0]"
                }
              >
                Video bổ trợ
              </AccordionContent>
            )}
            {daySelected?.lessons?.filter((item) => item.kanji_id)?.length >
              0 && (
              <AccordionContent
                onClick={handleClickKanji}
                className={
                  pathname?.includes("kanji")
                    ? "pt-4 pl-20 mt-1 cursor-pointer bg-[#FFEFC0]"
                    : "bg-[#fff8e1] pt-4 pl-20 mt-1 cursor-pointer hover:bg-[#FFEFC0]"
                }
              >
                Kanji
              </AccordionContent>
            )}
          </AccordionItem>
        ))}
        <AccordionItem value="item-7">
          <AccordionTrigger className="bg-[#ffefc0] pl-12 pr-6">
            Kiểm tra tổng hợp
          </AccordionTrigger>
          <AccordionContent className="bg-[#fff8e1] pt-4 pl-20 mt-1">
            Kiểm tra
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
