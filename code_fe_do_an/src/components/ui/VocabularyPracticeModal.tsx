import React, { useState, useRef, useEffect } from 'react';
import { Modal, Carousel as AntCarousel, Button } from 'antd';
import VocabularyTestItem from '@/components/ui/VocabularyTestItem';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const VocabularyPracticeModal = ({ vocabIds, isModalVisible, onClose }) => {
  const { width, height } = useWindowSize(); // Hook to get the window size
  const [userAnswers, setUserAnswers] = useState([]);
  const [practicalData, setPracticalData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const carouselRef = useRef(null); 

  useEffect(() => {
    const handleFetchPracticalData = async () => {
      console.log("fetch quest data for list vocab id: " + vocabIds);
      const dataTest = [
        {
          "question": "What is the meaning of 'example'?",
          "options": ["Example 1", "Example 2", "Example 3", "Example 4"],
          "correctAnswer": "Example 2"
        },
        {
          "question": "Which Kanji represents 'water'?",
          "options": ["水", "火", "木", "土"],
          "correctAnswer": "水"
        },
        {
          "question": "Translate 'neko' into English.",
          "options": ["Dog", "Cat", "Bird", "Fish"],
          "correctAnswer": "Cat"
        }
      ];
      try {
        const userEncode = localStorage.getItem("user");
        const token = userEncode ? JSON.parse(userEncode)?.token : '';
        setPracticalData(dataTest);
      } catch (error) {
        console.error("Error update vocabulary process", error);
        alert('An error occurred');
      }
    };
    
    if (isModalVisible) {
      handleFetchPracticalData();
    }
  }, [isModalVisible]);

  const onAnswerSelect = (isCorrect) => {
    if (userAnswers.length <= currentSlide) {
      setUserAnswers([...userAnswers, isCorrect]);
    }

    setFeedback(isCorrect ? "Correct!" : "Incorrect, try again!");

    setTimeout(() => {
      setFeedback(null);
      if (currentSlide < practicalData.length - 1) {
        setCurrentSlide(currentSlide + 1);
        carouselRef.current.goTo(currentSlide + 1);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const handleSummaryClick = (index) => {
    setCurrentSlide(index);
    carouselRef.current.goTo(index);
  };

  const handleRetry = () => {
    setUserAnswers([]);
    setCurrentSlide(0);
    setShowResult(false);
    carouselRef.current.goTo(0);
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
      {!showResult ? (
        <AntCarousel
          ref={carouselRef}
          dots={false}
          arrows
          afterChange={(current) => setCurrentSlide(current)}
          initialSlide={currentSlide}
        >
          {practicalData.map((item, index) => (
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
      ) : (
        <div className="result-section text-center p-5">
          {userAnswers.every(answer => answer) ? (
            <div className="congratulations relative">
              <Confetti width={width} height={height} />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-4">Congratulations! You passed the test!</h2>
                <p className="text-lg">You've answered all the questions correctly. Great job!</p>
                <Button type="primary" onClick={onClose} className="mt-4">Finish</Button>
              </div>
            </div>
          ) : (
            <div className="try-again">
              <h2 className="text-2xl font-bold mb-4">You didn't pass this time.</h2>
              <p className="text-lg mb-4">Don't worry, you can try again to improve your score!</p>
              <Button type="primary" onClick={handleRetry} className="mt-4">Try Again</Button>
            </div>
          )}
        </div>
      )}
      <div className="summary-section flex justify-center mt-4">
        {practicalData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSummaryClick(index)}
            className={`w-6 h-6 m-1 rounded-full flex items-center justify-center text-white cursor-pointer ${
              index === currentSlide
                ? 'bg-blue-500'
                : userAnswers[index] === true
                ? 'bg-green-500'
                : userAnswers[index] === false
                ? 'bg-red-500'
                : 'bg-gray-300'
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default VocabularyPracticeModal;
