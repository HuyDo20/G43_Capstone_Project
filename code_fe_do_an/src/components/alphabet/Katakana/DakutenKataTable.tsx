import axios from 'axios';
import { useEffect, useState } from 'react';
import CharacterCard from '../CharacterCard';
import { AlphabetResponse } from '@/type';

export default function KatakanaBienAmTable() {
 
const [dakutenKataList, setDakutenKataList] = useState<[]>([]);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const fetchData = useAuthAPI()
useEffect(() => {
  const handleFetchData = async () => {
    const request = await axios.get("/alphabet/4");
    const response = request.data;
    if (response.statusCode === 200) {
      setDakutenKataList(response.data);
    }
  };
  handleFetchData();
}, []);
  return (
    <div className="flex flex-col gap-5">
      <div className="text-xl font-semibold text-[#f1a72b] ">BIẾN ÂM</div>
      <div className="w-full h-[1180px] p-8 rounded-2xl">
        <div className="w-full h-[1130px] ">
          <div className="grid grid-cols-5 gap-4">
            {dakutenKataList.map((charData: AlphabetResponse, index) => {
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
  )
}
