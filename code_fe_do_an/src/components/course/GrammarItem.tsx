import { GrammarItemList } from "@/type";
import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function GrammarItem({
  grammar_name,
  grammar_structure,
}: GrammarItemList) {
  const navigate = useNavigate();

 const handleClick = () => {
    navigate("/grammar/detail");
 }
  
  return (
    <div className="flex flex-row w-full h-16 gap-5 px-7">
      <div className="flex items-center justify-center text-white rounded-md basis-1/6 bg-[#4b9c47] font-semibold">
        {grammar_name}
      </div>
      <div className="flex flex-row justify-between pl-28 pr-7 rounded-md basis-5/6 items-center bg-[#d1eeb0]">
        <div className="text-xl font-semibold">{grammar_structure}</div>
        <Button
          className="bg-[#d1eeb0] border border-[#4b9c47] text-black"
          onClick={handleClick}
        >
          Chi tiết
        </Button>
      </div>
    </div>
  );
}
