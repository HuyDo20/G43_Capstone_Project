import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const VocabularyTestItem = ({ question, options, correctAnswer, onAnswerSelect, image }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerClick = (optionId, optionContent) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(optionId);
      onAnswerSelect(optionId === correctAnswer);
    }
  };

  const optionPrefixes = ['A', 'B', 'C', 'D'];

  return (
    <Card className="m-8">
      <CardContent className="p-8 bg-white rounded-lg shadow-md">
        <div>
          <div className="text-2xl font-bold mb-4">{question}</div>
          {image && (
            <div className="flex justify-center mb-4">
              <img src={image} alt="Vocabulary" className="max-w-full h-auto" />
            </div>
          )}
          <div className="text-lg mb-4">Select the correct answer:</div>
          <div className="flex flex-col gap-4">
            {options.map((option, optionIndex) => {
              const isSelected = selectedAnswer === option.id;
              let buttonClass = 'p-4 text-lg border rounded-md transition-all duration-300 flex items-center ';

              if (isSelected) {
                buttonClass += 'bg-blue-500 text-white';
              } else {
                buttonClass += 'bg-white text-black hover:bg-gray-200';
              }

              return (
                <button
                  key={option.id}
                  className={buttonClass}
                  onClick={() => handleAnswerClick(option.id, option.content)}
                  disabled={selectedAnswer !== null}
                >
                  <span className="mr-2">{optionPrefixes[optionIndex]}.</span>
                  <span>{option.content}</span>
                </button>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VocabularyTestItem;
