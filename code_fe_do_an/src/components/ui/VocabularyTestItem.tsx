import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; 

const VocabularyTestItem = ({ question, options, correctAnswer, onAnswerSelect }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerClick = (answer) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answer);
      onAnswerSelect(answer === correctAnswer);
    }
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-4 bg-white rounded-lg shadow-md">
        <div className="flex">
          <div className="w-1/2 flex items-center justify-center">
            <div>
              <img
                src="/path/to/image.png"
                alt="Vocabulary"
                className="mb-4"
              />
              <div className="text-2xl font-bold">{question}</div>
            </div>
          </div>
          <div className="w-1/2 p-4">
            <div className="text-lg mb-4">Please select the correct answer:</div>
            <div className="grid grid-cols-2 gap-4">
              {options.map((option, index) => {
                const isCorrect = option === correctAnswer;
                const isSelected = option === selectedAnswer;
                let buttonClass = 'p-4 text-lg border rounded-md transition-all duration-300 flex items-center justify-center ';
                
                if (selectedAnswer !== null) {
                  if (isSelected && isCorrect) {
                    buttonClass += 'bg-green-500 text-white';
                  } else if (isSelected && !isCorrect) {
                    buttonClass += 'bg-red-500 text-white';
                  } else if (isCorrect) {
                    buttonClass += 'bg-green-500 text-white';
                  } else {
                    buttonClass += 'bg-white text-black';
                  }
                } else {
                  buttonClass += 'bg-white text-black hover:bg-gray-200';
                }

                return (
                  <button
                    key={index}
                    className={buttonClass}
                    onClick={() => handleAnswerClick(option)}
                    disabled={selectedAnswer !== null}
                  >
                    {isSelected && isCorrect && <FaCheckCircle className="mr-2" />}
                    {isSelected && !isCorrect && <FaTimesCircle className="mr-2" />}
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VocabularyTestItem;
