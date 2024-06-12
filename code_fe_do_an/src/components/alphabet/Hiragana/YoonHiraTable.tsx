import CharacterCard from '../CharacterCard';
import { yoonHiragana } from './YoonHiraData';

export default function HiraganaAmGhepTable() {
  return (
    <div className="flex flex-col gap-5">
      <div className="text-xl font-semibold text-[#f1a72b] ">ÂM GHÉP</div>
      <div className="w-full h-[1180px] p-1 rounded-2xl">
        <div className="w-full h-[1130px] ">
          <div className="grid grid-cols-3 gap-4">
            {yoonHiragana.map((charData, index) => {
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
