import React, { useState, useRef, useEffect } from 'react';
import { Modal, Carousel as AntCarousel, Button } from 'antd';
import PracticeItem from '@/components/ui/PracticeItem';
import Confetti from 'react-confetti';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const PracticeModal = ({ title, practiceData, isModalVisible, onSubmit, onClose, onPass }) => {
  const [userAnswers, setUserAnswers] = useState([]);
  const [practicalData, setPracticalData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const carouselRef = useRef(null);
  const [passThreshold, setPassThreshold] = useState(0);

  useEffect(() => {
    const handleFetchPracticalData = async () => {
      if (!practiceData) {
        alert("Test data is null");
        return;
      }
      setPracticalData(practiceData);
      if (practiceData.length > 1)
      {
        setPassThreshold(Math.ceil(practiceData.length * 0.7)); 
      } else {
         setPassThreshold(1); 
      }

    };
    if (isModalVisible) {
      handleFetchPracticalData();
    }

    if (showResult && hasPassed) {
      onPass();
    }
  }, [isModalVisible, showResult]);

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
  const totalQuestions = practicalData.length;
  const incorrectAnswersCount = totalQuestions - correctAnswersCount;

  const pieData = {
    labels: ['Đám án chính xác', 'Đáp án sai'],
    datasets: [
      {
        data: [correctAnswersCount, incorrectAnswersCount],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384']
      }
    ]
  };

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
            <Confetti width={800} height={auto} recycle={false} numberOfPieces={500} />
          )}
          <div className="relative z-10">
            {hasPassed ? (
              <div className="congratulations">
                <h2 className="text-2xl font-bold mb-4">Chúc mừng! Bạn đã vượt qua bài luyện tập!</h2>
                <p className="text-lg">Bạn đã trả lời đúng {correctAnswersCount} câu hỏi. Làm tốt lắm!</p>
                <Button type="primary" onClick={onSubmit} className="mt-4">Hoàn thành</Button>
              </div>
            ) : (
              <div className="try-again">
                <h2 className="text-2xl font-bold mb-4">Trượt rồi</h2>
                <p className="text-lg mb-4">Bạn đã trả lời đúng {correctAnswersCount} câu hỏi. Bạn cần trả lời đúng ít nhất {passThreshold} câu để hoàn thiện bài luyện tập.</p>
              </div>
            )}
          </div>
          
        </div>
      )}
    {showResult && (
  <div className="result-summary-container flex">
    <div className="pie-chart-section flex-1">
      <Pie data={pieData} />
    </div>
    <div className="summary-section flex-1 ml-4 overflow-auto max-h-64">
      {practicalData.map((item, index) => (
        <div key={index} className="summary-item mt-2">
          <div className="summary-question font-bold">
            {index + 1}. {item.question}
          </div>
          <div className="summary-result">
            {userAnswers[index] === true ? (
              <span className="text-green-500">Correct</span>
            ) : (
              <span className="text-red-500">
                Incorrect - Correct answer: {item.correctAnswer}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
)}

      {!hasPassed && showResult && (
        <div className="flex justify-center mt-4">
          <Button type="primary" onClick={handleRetry}>Thử lại</Button>
        </div>
      )}
    </Modal>
  );
};

export default PracticeModal;
