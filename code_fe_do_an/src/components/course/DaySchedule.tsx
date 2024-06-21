import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";
export default function DaySchedule() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/vocabulary");
  };

  const handleClickKanji = () => {
    navigate("/kanji");
  };

  return (
    <div>
      <Accordion
        type="single"
        collapsible
        className="flex flex-col w-full gap-3"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="bg-[#ffefc0] pl-12 pr-6">
            Ngày 1
          </AccordionTrigger>
          <AccordionContent
            onClick={handleClick}
            className="bg-[#fff8e1] pt-4 pl-20 mt-1"
          >
            Từ mới
          </AccordionContent>
          <AccordionContent className="bg-[#fff8e1] pt-4 pl-20 mt-1">
            Ngữ pháp
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="bg-[#ffefc0] pl-12 pr-6">
            Ngày 2
          </AccordionTrigger>
          <AccordionContent className="bg-[#fff8e1] pt-4 pl-20 mt-1">
            Từ mới
          </AccordionContent>
          <AccordionContent className="bg-[#fff8e1] pt-4 pl-20 mt-1">
            Ngữ pháp
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="bg-[#ffefc0] pl-12 pr-6">
            Ngày 3
          </AccordionTrigger>
          <AccordionContent className="bg-[#fff8e1] pt-4 pl-20 mt-1">
            Từ mới
          </AccordionContent>
          <AccordionContent className="bg-[#fff8e1] pt-4 pl-20 mt-1">
            Ngữ pháp
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="bg-[#ffefc0] pl-12 pr-6">
            Ngày 4
          </AccordionTrigger>
          <AccordionContent
            onClick={handleClickKanji}
            className="bg-[#fff8e1] pt-4 pl-20 mt-1"
          >
            Kanji
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger className="bg-[#ffefc0] pl-12 pr-6">
            Ngày 5
          </AccordionTrigger>
          <AccordionContent className="bg-[#fff8e1] pt-4 pl-20 mt-1">
            Từ mới
          </AccordionContent>
          <AccordionContent className="bg-[#fff8e1] pt-4 pl-20 mt-1">
            Ngữ pháp
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger className="bg-[#ffefc0] pl-12 pr-6">
            Ngày 6
          </AccordionTrigger>
          <AccordionContent className="bg-[#fff8e1] pt-4 pl-20 mt-1">
            Kanji
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
