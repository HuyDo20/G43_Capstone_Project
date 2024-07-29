import React, { useState, useRef, useEffect } from 'react';
import { Modal, Carousel as AntCarousel, Button } from 'antd';
import VocabularyTestItem from '@/components/ui/VocabularyTestItem';

const VocabularyPracticeModal = ({ vocabIds, isModalVisible, onClose }) => {
  const [userAnswers, setUserAnswers] = useState([]);
  const [practicalData, setPracticalData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [feedback, setFeedback] = useState(null);
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
        // await axios.post('/update-all-vocabulary-learned', {
        //   accountId: JSON.parse(userEncode)?.account_id,
        //   vocabularyIds: vocabularyIds,
        // }, {
        //   headers: {
        //     Authorization: token,
        //   },
        // });
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
      }
    }, 1500); 
  };

  const handleSummaryClick = (index) => {
    setCurrentSlide(index);
    carouselRef.current.goTo(index);
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
