import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Tag } from "antd";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { HiMiniSpeakerWave } from "react-icons/hi2";

const VocabularyCarousel = ({ dayCurrent, learnedVocab, handlePlayAudio }) => {
  const [viewedItems, setViewedItems] = useState(new Set());
  const itemRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index);
          setViewedItems((prev) => new Set(prev).add(index));
        }
      });
    }, { threshold: 0.3 });

    itemRefs.current.forEach((ref) => ref && observer.observe(ref));

    return () => {
      itemRefs.current.forEach((ref) => ref && observer.unobserve(ref));
    };
  }, []);

  const handleSummaryClick = (index) => {
    if (viewedItems.has(index)) {
      setActiveIndex(index);
      const targetItem = itemRefs.current[index];
      if (targetItem) {
        targetItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  const handleCarouselPrevious = () => {
    if (activeIndex > 0) {
      setActiveIndex((prevIndex) => {
        const newIndex = prevIndex - 1;
        const targetItem = itemRefs.current[newIndex];
        if (targetItem) {
          targetItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
        return newIndex;
      });
    }
  };

  const handleCarouselNext = () => {
    if (activeIndex < dayCurrent?.lessons?.length - 1) {
      setActiveIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        const targetItem = itemRefs.current[newIndex];
        if (targetItem) {
          targetItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
        return newIndex;
      });
    }
  };

  return (
    <div>
      <Carousel className="w-[1200px]" activeIndex={activeIndex}>
        <CarouselContent>
          {dayCurrent?.lessons
            ?.filter((item) => item.vocab_id)
            ?.map((lesson, index) => (
              <CarouselItem key={index} active={index === activeIndex}>
                <div
                  className="p-1"
                  ref={(el) => (itemRefs.current[index] = el)}
                  data-index={index}
                >
                  <Card>
                    <CardContent className={`flex flex-row px-16 pt-10 h-[670px] w-[1200px] ${viewedItems.has(index) ? 'bg-[#e0f7fa]' : 'bg-[#f2fae9]'}`}>
                      <div className="flex flex-col gap-9 basis-2/5">
                        <div className="text-2xl text-[#7db660] font-semibold">
                          Từ vựng
                          {parseInt(lesson.day_id) !== parseInt(dayCurrent?.day_id) && (
                            <>
                              &ensp; <Tag color="green">Nhắc lại</Tag>
                            </>
                          )}
                        </div>
                        <div className="flex flex-col items-center gap-5">
                          <img
                            className="h-[450px] w-[450px] rounded-md shadow-md"
                            src={lesson?.vocab_image ? lesson?.vocab_image.split(", ")[0] : "/banner.png"}
                          />
                          <HiMiniSpeakerWave
                            size={30}
                            className="cursor-pointer"
                            onClick={() => handlePlayAudio(lesson.vocab_audio)}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col p-16 basis-3/5">
                        <div className="flex flex-row basis-1/4">
                          <div className="flex flex-col items-center justify-center gap-3 basis-1/2">
                            <div className="bg-[#b6da9f] w-[140px] h-[40px] p-2 text-center rounded-md shadow-sm font-semibold">
                              Từ vựng
                            </div>
                            <div>{lesson.vocab_name}</div>
                          </div>
                          <div className="flex flex-col items-center justify-center gap-3 basis-1/2">
                            <div className="bg-[#b6da9f] w-[140px] h-[40px] p-2 text-center rounded-md shadow-sm font-semibold">
                              Kanji
                            </div>
                            <div>{lesson.vocab_kanji}</div>
                          </div>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-3 basis-1/4">
                          <div className="bg-[#b6da9f] w-[140px] h-[40px] p-2 text-center rounded-md shadow-sm font-semibold">
                            Nghĩa
                          </div>
                          <div>{lesson.vocab_meaning}</div>
                        </div>

                        <div className="flex flex-col items-center gap-5 pt-10 basis-2/4">
                          <div className="flex flex-col items-center justify-center gap-3">
                            <div className="bg-[#b6da9f] w-[140px] h-[40px] p-2 text-center rounded-md shadow-sm font-semibold">
                              Ví dụ
                            </div>
                            <div className="flex flex-col gap-2">
                              <div>{lesson.vocab_example}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
        <button
          onClick={handleCarouselPrevious}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 shadow-lg"
        >
          <HiOutlineChevronLeft size={30} />
        </button>
        <button
          onClick={handleCarouselNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 shadow-lg"
        >
          <HiOutlineChevronRight size={30} />
        </button>
      </Carousel>
      <div className="summary-section flex justify-center mt-4">
        {dayCurrent?.lessons
          ?.filter((item) => item.vocab_id)
          ?.map((_, index) => (
            <div
              key={index}
              onClick={() => handleSummaryClick(index)}
              className={`w-6 h-6 m-1 rounded-full flex items-center justify-center text-white cursor-pointer ${
                index === activeIndex ? 'bg-blue-500' : viewedItems.has(index) ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              {index + 1}
            </div>
          ))}
      </div>
    </div>
  );
};

export default VocabularyCarousel;
