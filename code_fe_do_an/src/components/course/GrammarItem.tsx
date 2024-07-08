import { GrammarItemList } from "@/type";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Tag } from "antd";

export default function GrammarItem({
  grammar_name,
  grammar_structure,
  grammar_id,
  checkIsRepeat,
}: GrammarItemList) {
  const { id, week_id, day_id } = useParams();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/grammar/detail");
    navigate(`/${id}/${week_id}/${day_id}/grammar/detail/${grammar_id}`);
  };

  return (
    <div className="flex flex-row w-full h-16 gap-5 px-7">
      <div className="flex items-center justify-center text-white rounded-md basis-1/6 bg-[#4b9c47] font-semibold">
        {grammar_name}{" "}
        {checkIsRepeat && (
          <>
            &ensp; <Tag color="green">Nhắc lại</Tag>
          </>
        )}
      </div>
      <div className="flex flex-row justify-between pl-28 pr-7 rounded-md basis-5/6 items-center bg-[#d1eeb0]">
        <div className="text-xl font-semibold">{grammar_structure}</div>
        <Button
          className="bg-[#d1eeb0] border border-[#4b9c47] text-black hover:bg-[#b8e782] hover:text-black"
          onClick={handleClick}
        >
          Chi tiết
        </Button>
      </div>
    </div>
  );
}
