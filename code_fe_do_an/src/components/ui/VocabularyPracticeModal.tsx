import React, { useState } from 'react';
import { Modal, Carousel as AntCarousel, Button } from 'antd';
import VocabularyTestItem from '@/components/ui/VocabularyTestItem'; 

const VocabularyPracticeModal = ({ practiceData, isModalVisible, onClose }) => {
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const onAnswerSelect = (isCorrect) => {
    if (userAnswers.length <= currentSlide) {
      setUserAnswers([...userAnswers, isCorrect]);
    }

    setFeedback(isCorrect ? "Correct!" : "Incorrect, try again!");

    setTimeout(() => {
      setFeedback(null);
      if (currentSlide < practiceData.length - 1) {
        setCurrentSlide(currentSlide + 1);
      }
    }, 1500); // 1.5 seconds delay for feedback
  };

  const calculateSummary = () => {
    const correctAnswers = userAnswers.filter(answer => answer).length;
    return {
      total: practiceData.length,
      correct: correctAnswers,
      incorrect: practiceData.length - correctAnswers,
    };
  };

  return (
    <Modal
      title="Practice Vocabulary"
      visible={isModalVisible}
      onCancel={onClose}
      footer={[
        <Button key="submit" type="primary" onClick={onClose}>
          OK
        </Button>
      ]}
      width={800}
      centered
    >
      <AntCarousel
        dots={true}
        arrows
        afterChange={(current) => setCurrentSlide(current)}
        initialSlide={currentSlide}
        dotPosition="bottom"
      >
        {practiceData.map((item, index) => (
          <div key={index} className="practice-item">
            <VocabularyTestItem
              question={item.question}
              options={item.options}
              correctAnswer={item.correctAnswer}
              onAnswerSelect={onAnswerSelect}
            />
            {feedback && <div className="feedback">{feedback}</div>}
          </div>
        ))}
      </AntCarousel>
      <div className="summary-section p-4">
        <h3>Practice Summary</h3>
        <p>Total Questions: {calculateSummary().total}</p>
        <p>Correct Answers: {calculateSummary().correct}</p>
        <p>Incorrect Answers: {calculateSummary().incorrect}</p>
      </div>
    </Modal>
  );
};

export default VocabularyPracticeModal;
