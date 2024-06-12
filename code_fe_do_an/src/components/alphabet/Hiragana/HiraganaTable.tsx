// import { useAuthAPI } from "@/hook/AuthContext";
import { useEffect, useState } from "react";
import CharacterCard from "../CharacterCard";
import axios from "axios";
// import { hiragana } from "./HiraganaData";

interface HiraganaItem 
  {
    alphabet_id: number,
    type_id: number,
    japanese_character: string,
    romaji_character: string,
    alphabet_audio: string,
    alphabet_image: string
}


export default function HiraganaTable() {

  const [hiraganaList, setHiraganaList] = useState<[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const fetchData = useAuthAPI()
  useEffect(() => {
    const handleFetchData = async () => {
      const request = await axios.get("/alphabet");
      const response = request.data;
      if (response.statusCode === 200) {
        setHiraganaList(response.data);
      }
    };
    handleFetchData();
  }, []);
  
  return (
    <div className="flex flex-col gap-5">
      <div className="text-xl font-semibold text-[#f1a72b] ">BẢNG CHỮ CÁI</div>
      <div className="w-full h-[1180px] p-8 rounded-2xl">
        <div className="w-full h-[1130px] ">
          <div className="grid grid-cols-5 gap-4">
            {hiraganaList.map((charData: HiraganaItem, index) => {
              if (charData.japanese_character.trim() !== "") {
                return (
                  <CharacterCard
                    key={index}
                    character={charData}
                  />
                );
              } else {
                return <div></div>;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
