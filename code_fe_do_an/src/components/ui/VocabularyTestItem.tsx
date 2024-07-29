import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const VocabularyTestItem = ({ question, options, correctAnswer, onAnswerSelect }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    onAnswerSelect(answer === correctAnswer);
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white rounded-lg shadow-md">
        <div className="text-2xl font-bold mb-4">Test Your Vocabulary</div>
        <div className="text-xl mb-6">{question}</div>
        <div className="grid grid-cols-2 gap-4">
          {options.map((option, index) => (
            <button
              key={index}
              className={`p-4 text-lg rounded-md transition-all duration-300 ${selectedAnswer === option ? 'bg-green-500' : 'bg-white text-black hover:bg-gray-200'}`}
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
