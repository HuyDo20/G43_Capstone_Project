import CharacterCard from '../CharacterCard';
import { dakutenKatakana } from './DakutenKataData';

export default function KatakanaBienAmTable() {
  
  
  
  return (
    <div className="flex flex-col gap-5">
      <div className="text-xl font-semibold text-[#f1a72b] ">BIẾN ÂM</div>
      <div className="w-full h-[1180px] p-8 rounded-2xl">
        <div className="w-full h-[1130px] ">
          <div className="grid grid-cols-5 gap-4">
            {dakutenKatakana.map((charData, index) => {
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
