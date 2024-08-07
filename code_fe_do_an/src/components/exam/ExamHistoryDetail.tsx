import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const ExamHistoryDetail = ({ exam }) => {
  const {
    examTitle,
    createdTime,
    multiChoice,
    reading,
    listening,
    score
  } = exam;

  return (
    <Card className="m-8">
      <CardContent className="p-8 bg-white rounded-lg shadow-md">
        <div className="text-2xl font-bold mb-4">{examTitle}</div>
        <div className="text-lg mb-2">Created Time: {new Date(createdTime).toLocaleString()}</div>
        <div className="text-lg mb-2">Multi Choice: {multiChoice.correct} / {multiChoice.total}</div>
        <div className="text-lg mb-2">Reading: {reading.correct} / {reading.total}</div>
        <div className="text-lg mb-2">Listening: {listening.correct} / {listening.total}</div>
        <div className="text-lg mb-4">Score: {score}%</div>
        <button className="mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-all duration-300">
          View Detailed Exam Result
        </button>
      </CardContent>
    </Card>
  );
};

export default ExamHistoryDetail;
