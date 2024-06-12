import { useState } from "react";
import { numberData } from "./NumberData";

export default function NumberDisplay() {
  const [selectedNumber, setSelectedNumber] = useState(numberData[0]);

  const handleNumberClick = (number: (typeof numberData)[0]) => {
    setSelectedNumber(number);
    // Thêm code để phát audio nếu cần
    // const audio = new Audio(number.alphabet_audio);
    // audio.play();
  };

  return (
    <div className="container mx-auto">
      <div className="text-xl font-semibold text-[#f1a72b] ">SỐ ĐẾM</div>
      <div className="p-4 text-center bg-[#f1a72b] border border-[#f1a72b] rounded-lg mt-7">
        <h1 className="text-3xl font-semibold text-white">
          {selectedNumber.romaji_character} -{" "}
          {selectedNumber.japanese_character}
        </h1>
      </div>
      <div className="grid grid-cols-5 gap-4 p-4 mt-5">
        {numberData.map((number, index) => (
          <button
            key={index}
            onClick={() => handleNumberClick(number)}
            className={`p-4 text-2xl font-semibold border h-[100px] rounded-lg ${
              selectedNumber.romaji_character === number.romaji_character
                ? "bg-[#f1a72b] text-white"
                : "bg-white text-black"
            }`}
          >
            {number.romaji_character}
          </button>
        ))}
      </div>
    </div>
  );
}
