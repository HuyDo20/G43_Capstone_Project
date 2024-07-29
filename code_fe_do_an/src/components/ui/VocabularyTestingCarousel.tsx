import React from 'react';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import VocabularyTestItem from './VocabularyTestItem';

const VocabularyTestingCarousel = ({ activeIndex, setActiveIndex }) => {

  const handleAnswerSelect = (isCorrect) => {
    if (isCorrect) {
      alert("Correct answer!");
    } else {
      alert("Incorrect answer. Try again!");
    }
  };

  return (
    <Carousel className="w-[1200px]" activeIndex={activeIndex} >
      <CarouselContent>
        <CarouselItem active={true}>
          <VocabularyTestItem
            question="What is the meaning of 'example'?"
            options={['Example 1', 'Example 2', 'Example 3', 'Example 4']}
            correctAnswer="Example 2"
            onAnswerSelect={handleAnswerSelect}
          />
              </CarouselItem>
                <CarouselItem active={true}>
          <VocabularyTestItem
            question="What is the meaning of 'example'?"
            options={['Example 1', 'Example 2', 'Example 3', 'Example 4']}
            correctAnswer="Example 2"
            onAnswerSelect={handleAnswerSelect}
          />
              </CarouselItem>
                <CarouselItem active={true}>
          <VocabularyTestItem
            question="What is the meaning of 'example'?"
            options={['Example 1', 'Example 2', 'Example 3', 'Example 4']}
            correctAnswer="Example 2"
            onAnswerSelect={handleAnswerSelect}
          />
        </CarouselItem>
          <CarouselItem active={true}>
          <VocabularyTestItem
            question="What is the meaning of 'example'?"
            options={['Example 1', 'Example 2', 'Example 3', 'Example 4']}
            correctAnswer="Example 2"
            onAnswerSelect={handleAnswerSelect}
          />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default VocabularyTestingCarousel;
