import React, { useState, useRef, useEffect } from 'react';
import { Modal, Carousel as AntCarousel, Button } from 'antd';
import VocabularyTestItem from '@/components/ui/VocabularyTestItem';
import Confetti from 'react-confetti';
import axios from 'axios';

const VocabularyPracticeModal = ({ vocabIds, isModalVisible, onClose }) => {
  const [userAnswers, setUserAnswers] = useState([]);
  const [practicalData, setPracticalData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const carouselRef = useRef(null);
  const [passThreshold, setPassThreshold] = useState(0);
 
  useEffect(() => {
    const handleFetchPracticalData = async () => {
      try {
        const userEncode = localStorage.getItem("user");
        const token = userEncode ? JSON.parse(userEncode)?.token : '';
        const request = await axios.post('/generate-vocabulary-practice-data', {
          accountId: JSON.parse(userEncode)?.account_id,
          vocabularyIds: vocabIds,
        }, {
          headers: {
            Authorization: token,
          },
        });
        const response = request.data;
        console.log(response);
        if (response.statusCode === 200) {
          setPracticalData(response.data);
        }
        else {
          alert("fail");
        }
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
    setPassThreshold(practicalData.length);

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

    if (index === 0 || userAnswers[index-1] !== undefined) { // Check if the question at this index has been answered
      setCurrentSlide(index);
      carouselRef.current.goTo(index);
    }
  };

  const handleRetry = () => {
    setUserAnswers([]);
    setCurrentSlide(0);
    setShowResult(false);
    carouselRef.current.goTo(0);
  };

  const handleSubmitClick = () => {
  }

  const correctAnswersCount = userAnswers.filter(answer => answer).length;
  const hasPassed = correctAnswersCount >= passThreshold;
  return (
    <Modal
      title="Practice Vocabulary"
      visible={isModalVisible}
      onCancel={onClose}
      footer={[]}
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
        <div className="result-section text-center p-5 relative">
          {hasPassed && (
            <Confetti width={800} height={300} recycle={false} numberOfPieces={500} />
          )}
          <div className="relative z-10">
            {hasPassed ? (
              <div className="congratulations">
                <h2 className="text-2xl font-bold mb-4">Congratulations! You passed the test!</h2>
                <p className="text-lg">You've answered {correctAnswersCount} questions correctly. Great job!</p>
                <Button type="primary" onClick={handleSubmitClick} className="mt-4">Finish</Button>
              </div>
            ) : (
              <div className="try-again">
                <h2 className="text-2xl font-bold mb-4">You didn't pass this time.</h2>
                <p className="text-lg mb-4">You answered {correctAnswersCount} questions correctly. Don't worry, you can try again to improve your score!</p>
                <Button type="primary" onClick={handleRetry} className="mt-4">Try Again</Button>
              </div>
            )}
          </div>
        </div>
      )}
      {!hasPassed && (<div className="summary-section flex justify-center mt-4">
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
      </div>)}
    </Modal>
  );
};

export default VocabularyPracticeModal;
