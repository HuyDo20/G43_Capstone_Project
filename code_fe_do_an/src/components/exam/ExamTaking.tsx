import React, { useState, useEffect } from 'react';
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

const ExamTaking = ({ courseTitle, examTitle, questions, mode, onSubmit }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [errors, setErrors] = useState({});
  const [results, setResults] = useState(null);
  const { readingQuestions, listeningQuestions, multiChoiceQuestions } = splitQuestions(questions);

  useEffect(() => {
    if (mode === 'reviewing') {
      handleReview();
    }
  }, [mode]);

  const handleReadingAnswerSelect = (questionId, optionId) => {
    setSelectedAnswers(prevState => ({
      ...prevState,
      [questionId]: optionId
    }));
    setErrors(prevState => ({
      ...prevState,
      [questionId]: undefined
    }));
  };

  const handleListeningAnswerSelect = (questionId, optionId) => {
    setSelectedAnswers(prevState => ({
      ...prevState,
      [questionId]: optionId
    }));
    setErrors(prevState => ({
      ...prevState,
      [questionId]: undefined
    }));
  };

  const handleVocabularyAnswerSelect = (questionId, optionId) => {
    setSelectedAnswers(prevState => ({
      ...prevState,
      [questionId]: optionId
    }));
    setErrors(prevState => ({
      ...prevState,
      [questionId]: undefined
    }));
  };

  const handleSubmit = () => {
    const unansweredQuestions = {};
    const allQuestions = [
      ...multiChoiceQuestions.map(q => q.id),
      ...readingQuestions.flatMap(q => q.subQuestions.map(sq => sq.id)),
      ...listeningQuestions.flatMap(q => q.subQuestions.map(sq => sq.id))
    ];

    allQuestions.forEach(questionId => {
      if (selectedAnswers[questionId] === undefined) {
        unansweredQuestions[questionId] = true;
      }
    });

    if (Object.keys(unansweredQuestions).length > 0) {
      setErrors(unansweredQuestions);
      return;
    }

    let correctAnswersCount = 0;
    allQuestions.forEach(questionId => {
      const isCorrect = questions.multiChoiceQuestions.some(q => q.id === questionId && q.correctOptionId === selectedAnswers[questionId]);
      if (isCorrect) correctAnswersCount++;
    });

    const totalQuestionsCount = allQuestions.length;
    const score = (correctAnswersCount / totalQuestionsCount) * 100;

    setResults({
      score,
      selectedAnswers
    });

    onSubmit(selectedAnswers);
  };

  const handleReview = () => {
    const allQuestions = [
      ...multiChoiceQuestions.map(q => q.id),
      ...readingQuestions.flatMap(q => q.subQuestions.map(sq => sq.id)),
      ...listeningQuestions.flatMap(q => q.subQuestions.map(sq => sq.id))
    ];

    let correctAnswersCount = 0;
    allQuestions.forEach(questionId => {
      const isCorrect = questions.multiChoiceQuestions.some(q => q.id === questionId && q.correctOptionId === selectedAnswers[questionId]);
      if (isCorrect) correctAnswersCount++;
    });

    const totalQuestionsCount = allQuestions.length;
    const score = (correctAnswersCount / totalQuestionsCount) * 100;

    setResults({
      score,
      selectedAnswers
    });
  };

  return (
    <div className="bg-white rounded-lg p-8 w-full max-w-5xl max-h-full overflow-y-auto relative">
      <div className="header mb-8">
        <h1 className="text-4xl font-bold">{courseTitle}</h1>
        <h2 className="text-2xl font-semibold">{examTitle}</h2>
      </div>
      {results && (
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Your Score: {results.score}%</h3>
        </div>
      )}
      <div className="questions-container">
        <div className="multi-choice-section mb-8">
          <h3 className="text-2xl font-semibold mb-4">Multiple Choice Questions</h3>
          {multiChoiceQuestions.map((question) => (
            <div key={question.id}>
              <VocabularyTestItem
                question={question.content}
                options={question.options.map(opt => ({ id: opt.id, content: opt.content }))}
                correctAnswer={question.options.find(opt => opt.id === question.correctOptionId).id}
                onAnswerSelect={(optionId) => handleVocabularyAnswerSelect(question.id, optionId)}
                image={question.imageUrl || undefined}
                error={errors[question.id]}
                showResults={results}
                selectedAnswer={results ? selectedAnswers[question.id] : null}
                mode={mode}
              />
            </div>
          ))}
        </div>
        <div className="reading-section mb-8">
          <h3 className="text-2xl font-semibold mb-4">Reading Questions</h3>
          {readingQuestions.map((question) => (
            <div key={question.id}>
              <ReadingTestItem
                content={question.content}
                image={question.imageUrl}
                subQuestions={question.subQuestions}
                onAnswerSelect={handleReadingAnswerSelect}
                errors={errors}
                showResults={results}
                selectedAnswers={results ? selectedAnswers : null}
                mode={mode}
              />
            </div>
          ))}
        </div>
        <div className="listening-section mb-8">
          <h3 className="text-2xl font-semibold mb-4">Listening Questions</h3>
          {listeningQuestions.map((question) => (
            <div key={question.id}>
              <ListeningTestItem
                audioUrl={question.audioUrl}
                subQuestions={question.subQuestions}
                onAnswerSelect={handleListeningAnswerSelect}
                errors={errors}
                showResults={results}
                selectedAnswers={results ? selectedAnswers : null}
                mode={mode}
              />
            </div>
          ))}
        </div>
      </div>
      {mode === 'doing' && (
        <button
          onClick={handleSubmit}
          className="mt-8 p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
          disabled={results !== null}
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default ExamTaking;
export { splitQuestions };
