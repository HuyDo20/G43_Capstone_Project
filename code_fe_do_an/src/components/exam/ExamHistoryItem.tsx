import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import ExamHistoryDetail from './ExamHistoryDetail';

const ExamHistoryItem = ({ exam }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Card className="m-8">
      <CardContent className="p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-xl font-bold mb-2">{exam.examTitle}</div>
            <div className="text-md mb-2">Created Time: {new Date(exam.createdTime).toLocaleString()}</div>
            <div className="text-md mb-2">Score: {exam.score}%</div>
          </div>
          <button onClick={handleToggleCollapse} className="text-2xl">
            {isCollapsed ? <FiChevronDown /> : <FiChevronUp />}
          </button>
        </div>
        {!isCollapsed && <ExamHistoryDetail exam={exam} />}
      </CardContent>
    </Card>
  );
};

export default ExamHistoryItem;
