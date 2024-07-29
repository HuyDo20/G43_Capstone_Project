// VocabularyTestItem.tsx

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";

const VocabularyTestItem = ({ question, options, correctAnswer, onAnswerSelect }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    onAnswerSelect(answer === correctAnswer);
  };

  return (
    <Card>
      <CardContent className="flex flex-col p-16 h-[670px] w-[1200px] bg-[#f2fae9]">
        <div className="text-2xl font-semibold mb-4">Test Your Vocabulary</div>
        <div className="text-xl mb-8">{question}</div>
        <div className="grid grid-cols-2 gap-4">
          {options.map((option, index) => (
            <button
              key={index}
              className={`p-4 text-lg rounded-md ${selectedAnswer === option ? 'bg-green-200' : 'bg-white'}`}
              onClick={() => handleAnswerClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VocabularyTestItem;
