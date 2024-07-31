import React, { useState, useRef, useEffect } from 'react';
import { Modal, Carousel as AntCarousel, Button } from 'antd';
import PracticeItem from '@/components/ui/PracticeItem';
import Confetti from 'react-confetti';

const VocabularyPracticeModal = ({ title, practiceData, isModalVisible, onSubmit,onClose, onPass }) => {
  const [userAnswers, setUserAnswers] = useState([]);
  const [practicalData, setPracticalData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const carouselRef = useRef(null);
  const [passThreshold, setPassThreshold] = useState(0);
 
  useEffect(() => {
    const handleFetchPracticalData = async () => {
      if (practiceData === null) {
      alert("Test data is null");
      }
      setPracticalData(practiceData);
      setPassThreshold(practiceData.length);
    };
    if (isModalVisible) {
      handleFetchPracticalData();
    }

     if (showResult && hasPassed) {
      onPass(); 
    }

  }, [isModalVisible]);

  const onAnswerSelect = (isCorrect) => {
    if (userAnswers.length <= currentSlide) {
      setUserAnswers([...userAnswers, isCorrect]);
    }
    setFeedback(isCorrect ? "Chính xác!" : "Sai rồi!");
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

    if (index === 0 || userAnswers[index - 1] !== undefined) { 
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

  const correctAnswersCount = userAnswers.filter(answer => answer).length;
  const hasPassed = correctAnswersCount >= passThreshold;
  return (
    <Modal
      title={title}
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
              <PracticeItem
                question={item.question}
                options={item.options}
                correctAnswer={item.correctAnswer}
                onAnswerSelect={onAnswerSelect}
                image={item.image}
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
                <h2 className="text-2xl font-bold mb-4">Chúc mừng! Bạn đã vượt qua bài luyện tập!</h2>
                <p className="text-lg">Ban đã trả lời đúng {correctAnswersCount} câu hỏi. Làm tốt lắm!</p>
                <Button type="primary" onClick={onSubmit} className="mt-4">Hoàn thành</Button>
              </div>
            ) : (
              <div className="try-again">
                <h2 className="text-2xl font-bold mb-4">Trượt ròi</h2>
                    <p className="text-lg mb-4">Bạn đã trả lời đúng {correctAnswersCount} câu hỏi. Bạn cần trả lời đúng ít nhất {passThreshold} câu để hoàn thiện bài luyện tập</p>
                <Button type="primary" onClick={handleRetry} className="mt-4">Thử lại</Button>
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
