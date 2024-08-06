import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const ReadingTestItem = ({ content, image, subQuestions, onAnswerSelect }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleAnswerClick = (questionId, optionId) => {
    setSelectedAnswers(prevState => ({
      ...prevState,
      [questionId]: optionId
    }));
    onAnswerSelect(questionId, optionId);
  };

  const optionPrefixes = ['A', 'B', 'C', 'D'];

  return (
    <Card className="m-8">
      <CardContent className="p-8 bg-white rounded-lg shadow-md">
        <div>
          <div className="text-2xl font-bold mb-4">{content}</div>
          {image && (
            <div className="flex justify-center mb-4">
              <img src={image} alt="Reading" className="max-w-full h-auto" />
            </div>
          )}
          {subQuestions.map((subQuestion, questionIndex) => (
            <div key={subQuestion.id} className="mb-4">
              <div className="text-lg mb-4">
                {questionIndex + 1}. {subQuestion.questionContent}
              </div>
              <div className="flex flex-col gap-4">
                {subQuestion.options.map((option, optionIndex) => {
                  const isSelected = selectedAnswers[subQuestion.id] === option.id;
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
                      onClick={() => handleAnswerClick(subQuestion.id, option.id)}
                      disabled={selectedAnswers[subQuestion.id] !== undefined}
                    >
                      <span className="mr-2">{optionPrefixes[optionIndex]}.</span>
                      <span>{option.content}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReadingTestItem;
