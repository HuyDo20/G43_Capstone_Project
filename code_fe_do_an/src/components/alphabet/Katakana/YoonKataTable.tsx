import axios from 'axios';
import { useEffect, useState } from 'react';
import CharacterCard from '../CharacterCard';
import { AlphabetResponse } from '@/type';




export default function KatakanaAmGhepTable() {

  const [yoonKataList, setYoonKataList] = useState<[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const fetchData = useAuthAPI()
  useEffect(() => {
    const handleFetchData = async () => {
      const request = await axios.get("/alphabet/6");
      const response = request.data;
      if (response.statusCode === 200) {
        setYoonKataList(response.data);
      }
    };
    handleFetchData();
  }, []);

  return (
<div className="flex flex-col gap-5">
      <div className="text-xl font-semibold text-[#f1a72b] ">ÂM GHÉP</div>
      <div className="w-full h-[1180px] p-1 rounded-2xl">
        <div className="w-full h-[1130px] ">
          <div className="grid grid-cols-3 gap-4">
            {yoonKataList.map((charData: AlphabetResponse, index) => {
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
