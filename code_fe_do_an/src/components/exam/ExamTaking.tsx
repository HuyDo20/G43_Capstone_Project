import React, { useState } from 'react';
import VocabularyTestItem from '../ui/PracticeItem'; // Ensure correct import path

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

const ExamTaking = ({ courseTitle, examTitle, questions, onClose }) => {
  const { readingQuestions, listeningQuestions, multiChoiceQuestions } = splitQuestions(questions);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-3xl max-h-full overflow-y-auto relative">
        <button
          className="absolute top-4 right-4 text-xl font-bold text-gray-600"
          onClick={onClose}
        >
          &times;
        </button>
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
                options={question.options.map(opt => opt.content)}
                correctAnswer={question.options.find(opt => opt.id === question.correctOptionId).content}
                onAnswerSelect={(isCorrect) => console.log(`Question ${question.id} answered: ${isCorrect}`)}
                image={question.imageUrl || undefined}
              />
            ))}
          </div>
          <div className="reading-section mb-8">
            <h3 className="text-2xl font-semibold mb-4">Reading Questions</h3>
            {readingQuestions.map((question) => (
              <div key={question.id} className="mb-4">
                <div className="mb-2">
                  <p>{question.content}</p>
                  {question.imageUrl && <img src={question.imageUrl} alt="Reading" className="my-2" />}
                </div>
                {question.subQuestions.map(subQuestion => (
                  <VocabularyTestItem
                    key={subQuestion.id}
                    question={subQuestion.questionContent}
                    options={subQuestion.options.map(opt => opt.content)}
                    correctAnswer={subQuestion.options.find(opt => opt.id === subQuestion.correctOptionId)?.content}
                    onAnswerSelect={(isCorrect) => console.log(`SubQuestion ${subQuestion.id} answered: ${isCorrect}`)}
                    image={subQuestion.imageUrl || undefined}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="listening-section mb-8">
            <h3 className="text-2xl font-semibold mb-4">Listening Questions</h3>
            {listeningQuestions.map((question) => (
              <div key={question.id} className="mb-4">
                <div className="mb-2">
                  <audio controls className="mb-4">
                    <source src={question.audioUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
                {question.subQuestions.map(subQuestion => (
                  <VocabularyTestItem
                    key={subQuestion.id}
                    question={subQuestion.questionContent}
                    options={subQuestion.options.map(opt => opt.content)}
                    correctAnswer={subQuestion.options.find(opt => opt.id === subQuestion.correctOptionId)?.content}
                    onAnswerSelect={(isCorrect) => console.log(`SubQuestion ${subQuestion.id} answered: ${isCorrect}`)}
                    image={subQuestion.imageUrl || undefined}
                  />
                ))}
              </div>
            ))}
          </div>
       
        </div>
      </div>
    </div>
  );
};

const ExamTakingPopup = ({ courseTitle, examTitle, questions, onClose }) => {
  return (
    <>
      <ExamTaking
        courseTitle={courseTitle}
        examTitle={examTitle}
        questions={questions}
        onClose={onClose}
      />
    </>
  );
};

export default ExamTakingPopup;
export { splitQuestions };
