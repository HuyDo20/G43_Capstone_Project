import React, { useState } from 'react';
import VocabularyTestItem from './VocabularyTestItem';
import ReadingTestItem from './ReadingTestItem';
import ListeningTestItem from './ListeningTestItem';

const splitQuestions = (data) => {
  const readingQuestions = [];
  const listeningQuestions = [];
  const multiChoiceQuestions = [];

  data.readingQuestions.forEach(question => {
    readingQuestions.push(question);
  });

  data.listeningQuestions.forEach(question => {
    listeningQuestions.push(question);
  });

  data.multiChoiceQuestions.forEach(question => {
    multiChoiceQuestions.push(question);
  });

  return { readingQuestions, listeningQuestions, multiChoiceQuestions };
};

const ExamTaking = ({ courseTitle, examTitle, questions }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const { readingQuestions, listeningQuestions, multiChoiceQuestions } = splitQuestions(questions);

  const handleReadingAnswerSelect = (questionId, optionId) => {
    setSelectedAnswers(prevState => ({
      ...prevState,
      [questionId]: optionId
    }));
    console.log(`Question ${questionId} selected answer ID: ${optionId}`);
  };

  const handleListeningAnswerSelect = (questionId, optionId) => {
    setSelectedAnswers(prevState => ({
      ...prevState,
      [questionId]: optionId
    }));
    console.log(`Question ${questionId} selected answer ID: ${optionId}`);
  };

  const handleVocabularyAnswerSelect = (questionId, isCorrect) => {
    setSelectedAnswers(prevState => ({
      ...prevState,
      [questionId]: isCorrect
    }));
    console.log(`Question ${questionId} answered: ${isCorrect}`);
  };

  return (
    <div className="bg-white rounded-lg p-8 w-full max-w-3xl max-h-full overflow-y-auto relative">
      <div className="header mb-8">
        <h1 className="text-4xl font-bold">{courseTitle}</h1>
        <h2 className="text-2xl font-semibold">{examTitle}</h2>
      </div>
      <div className="questions-container">
        <div className="multi-choice-section mb-8">
          <h3 className="text-2xl font-semibold mb-4">Multiple Choice Questions</h3>
          {multiChoiceQuestions.map((question) => (
            <VocabularyTestItem
              key={question.id}
              question={question.content}
              options={question.options.map(opt => ({ id: opt.id, content: opt.content }))}
              correctAnswer={question.options.find(opt => opt.id === question.correctOptionId).id}
              onAnswerSelect={(isCorrect) => handleVocabularyAnswerSelect(question.id, isCorrect)}
              image={question.imageUrl || undefined}
            />
          ))}
        </div>
        <div className="reading-section mb-8">
          <h3 className="text-2xl font-semibold mb-4">Reading Questions</h3>
          {readingQuestions.map((question) => (
            <ReadingTestItem
              key={question.id}
              content={question.content}
              image={question.imageUrl}
              subQuestions={question.subQuestions}
              onAnswerSelect={handleReadingAnswerSelect}
            />
          ))}
        </div>
        <div className="listening-section mb-8">
          <h3 className="text-2xl font-semibold mb-4">Listening Questions</h3>
          {listeningQuestions.map((question) => (
            <ListeningTestItem
              key={question.id}
              audioUrl={question.audioUrl}
              subQuestions={question.subQuestions}
              onAnswerSelect={handleListeningAnswerSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamTaking;
export { splitQuestions };
