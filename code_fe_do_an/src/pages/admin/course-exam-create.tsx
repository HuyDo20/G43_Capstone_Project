import React, { useState, useEffect } from 'react';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hook/AuthContext';
import { AiOutlinePlus } from 'react-icons/ai';
import styled from 'styled-components';
import MultiChoiceQuestion from '@/components/exam/MultiChoiceQuestion';
import ReadingQuestion from '@/components/exam/ReadingQuestion';
import ListeningQuestion from '@/components/exam/ListeningQuestion';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface MultiChoiceOption {
  id: number;
  content: string;
}

interface SubQuestion {
  id: number;
  questionContent: string;
  options: MultiChoiceOption[];
  correctOptionId: number | null;
  imageUrl: string | null;
}

interface MultiChoiceQuestionType {
  id: number;
  type: 'Multi-choice';
  content: string;
  options: MultiChoiceOption[];
  correctOptionId: number | null;
  imageUrl: string | null;
  confirmed: boolean;
}

interface ReadingQuestionType {
  id: number;
  type: 'Reading';
  content: string;
  subQuestions: SubQuestion[];
  imageUrl: string | null;
  confirmed: boolean;
}

interface ListeningQuestionType {
  id: number;
  type: 'Listening';
  subQuestions: SubQuestion[];
  audioUrl: string | null;
  confirmed: boolean;
}

type Question = MultiChoiceQuestionType | ReadingQuestionType | ListeningQuestionType;

const generateRandomId = () => {
  return Math.floor(100000 + Math.random() * 900000); 
};

const defaultMultiChoiceQuestion: MultiChoiceQuestionType = {
  id: 0,
  type: 'Multi-choice',
  content: '',
  options: [],
  correctOptionId: null,
  imageUrl: null,
  confirmed: false,
};

const defaultReadingQuestion: ReadingQuestionType = {
  id: 0,
  type: 'Reading',
  content: '',
  subQuestions: [],
  imageUrl: null,
  confirmed: false,
};

const defaultListeningQuestion: ListeningQuestionType = {
  id: 0,
  type: 'Listening',
  subQuestions: [],
  audioUrl: null,
  confirmed: false,
};

const CourseExamCreate: React.FC = () => {
  const [examName, setExamName] = useState('');
  const [multiChoiceQuestions, setMultiChoiceQuestions] = useState<MultiChoiceQuestionType[]>([]);
  const [readingQuestions, setReadingQuestions] = useState<ReadingQuestionType[]>([]);
  const [listeningQuestions, setListeningQuestions] = useState<ListeningQuestionType[]>([]);
  const [selectedType, setSelectedType] = useState('');
  const [editingQuestionId, setEditingQuestionId] = useState<number | null>(null);
  const [reload, setReload] = useState(false);
  const [isEditingQuestion, setIsEditingQuestion] = useState(false);
  const navigate = useNavigate();
  const { handleFetch } = useAuth();

  useEffect(() => {
    if (reload) {
      setReload(false);
    }
  }, [reload]);

  useEffect(() => {
    console.log("current list data multi:" + JSON.stringify(multiChoiceQuestions));
  }, [multiChoiceQuestions]);

    useEffect(() => {
    console.log("current list data reading ques:" + JSON.stringify(readingQuestions));
    }, [multiChoiceQuestions]);
  
    useEffect(() => {
    console.log("current list data listning quest:" + JSON.stringify(listeningQuestions));
  }, [multiChoiceQuestions]);


  const handleAddQuestion = () => {
    if (isEditingQuestion) {
      message.warning('Please confirm the current question before adding a new one.');
      return;
    }
    
    let newQuestion: Question;

    if (selectedType === 'Multi-choice') {
      newQuestion = { ...defaultMultiChoiceQuestion, id: generateRandomId() };
      setMultiChoiceQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    } else if (selectedType === 'Reading') {
      newQuestion = { ...defaultReadingQuestion, id: generateRandomId() };
      setReadingQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    } else if (selectedType === 'Listening') {
      newQuestion = { ...defaultListeningQuestion, id: generateRandomId() };
      setListeningQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    } else {
      message.warning('Please select a question type before adding a question.');
      return;
    }

    setEditingQuestionId(newQuestion.id);
    setIsEditingQuestion(true);
  };

  const handleDeleteQuestion = (type: string, id: number) => {
    if (isEditingQuestion) {
      message.warning('Please confirm the current question before deleting.');
      return;
    }

    if (type === 'Multi-choice') {
      setMultiChoiceQuestions(multiChoiceQuestions.filter((question) => question.id !== id));
    } else if (type === 'Reading') {
      setReadingQuestions(readingQuestions.filter((question) => question.id !== id));
    } else if (type === 'Listening') {
      setListeningQuestions(listeningQuestions.filter((question) => question.id !== id));
    }
    setIsEditingQuestion(false);
  };

  const handleSaveExam = async () => {
    const examData = {
      name: examName,
      multiChoiceQuestions: multiChoiceQuestions.map(({ confirmed, ...rest }) => rest),
      readingQuestions: readingQuestions.map(({ confirmed, ...rest }) => rest),
      listeningQuestions: listeningQuestions.map(({ confirmed, ...rest }) => rest),
    };

    try {
      await handleFetch('/api/save-exam', 'POST', examData);
      message.success('Exam saved successfully!');
      setReload(true);
    } catch (error) {
      message.error('Failed to save exam.');
    }
  };

  const handleDragEnd = (result: DropResult, questions: Question[], setQuestions: React.Dispatch<React.SetStateAction<Question[]>>) => {
    if (!result.destination) return;
    const items = Array.from(questions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setQuestions(items);
  };

  const handleConfirmQuestion = (
    type: string,
    id: number,
    questionContent: string,
    options: any[],
    correctOptionId: number | null,
    imageUrl: string | null,
    subQuestions?: any[],
    audioUrl?: string | null
  ) => {
    if (type === 'Multi-choice') {
      updateOrCreateMultiChoiceQuestion(id, questionContent, options, correctOptionId, imageUrl);
    } else if (type === 'Reading') {
      updateOrCreateReadingQuestion(id, questionContent, subQuestions || [], imageUrl);
    } else if (type === 'Listening') {
      updateOrCreateListeningQuestion(id, subQuestions || [], audioUrl || null);
    }
    setEditingQuestionId(null);
    setIsEditingQuestion(false);
  };

  const updateOrCreateMultiChoiceQuestion = (
    id: number,
    questionContent: string,
    options: any[],
    correctOptionId: number | null,
    imageUrl: string | null
  ) => {
    const questionExists = multiChoiceQuestions.some((q) => q.id === id);
    if (questionExists) {
      setMultiChoiceQuestions((prevQuestions) =>
        prevQuestions.map((q) => (q.id === id ? { ...q, content: questionContent, options, correctOptionId, imageUrl, confirmed: true } : q))
      );
    } else {
      const newQuestion = {
        ...defaultMultiChoiceQuestion,
        id,
        content: questionContent,
        options,
        correctOptionId,
        imageUrl,
        confirmed: true,
      };
      setMultiChoiceQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    }
  };

  const updateOrCreateReadingQuestion = (
    id: number,
    content: string,
    subQuestions: any[],
    imageUrl: string | null
  ) => {
    const questionExists = readingQuestions.some((q) => q.id === id);
    if (questionExists) {
      setReadingQuestions((prevQuestions) =>
        prevQuestions.map((q) => (q.id === id ? { ...q, content, subQuestions, imageUrl, confirmed: true } : q))
      );
    } else {
      const newQuestion = {
        ...defaultReadingQuestion,
        id,
        content,
        subQuestions,
        imageUrl,
        confirmed: true,
      };
      setReadingQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    }
  };

  const updateOrCreateListeningQuestion = (
    id: number,
    subQuestions: any[],
    audioUrl: string | null
  ) => {
    const questionExists = listeningQuestions.some((q) => q.id === id);
    if (questionExists) {
      setListeningQuestions((prevQuestions) =>
        prevQuestions.map((q) => (q.id === id ? { ...q, subQuestions, audioUrl, confirmed: true } : q))
      );
    } else {
      const newQuestion = {
        ...defaultListeningQuestion,
        id,
        subQuestions,
        audioUrl,
        confirmed: true,
      };
      setListeningQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    }
  };

  const handleEditQuestion = (type: string, id: number) => {
    if (type === 'Multi-choice') {
      const question = multiChoiceQuestions.find(q => q.id === id);
      if (question) {
        setEditingQuestionId(id);
        setIsEditingQuestion(true);
      }
    } else if (type === 'Reading') {
      const question = readingQuestions.find(q => q.id === id);
      if (question) {
        setEditingQuestionId(id);
        setIsEditingQuestion(true);
      }
    } else if (type === 'Listening') {
      const question = listeningQuestions.find(q => q.id === id);
      if (question) {
        setEditingQuestionId(id);
        setIsEditingQuestion(true);
      }
    }
  };

  const renderQuestionsByType = (type: string, questions: Question[], setQuestions: React.Dispatch<React.SetStateAction<Question[]>>) => (
    <Droppable droppableId={type} key={type}>
      {(provided) => (
        <QuestionSection ref={provided.innerRef} {...provided.droppableProps}>
          <h3>{type} Questions</h3>
          {questions.map((question, index) => (
            <Draggable key={question.id} draggableId={String(question.id)} index={index} isDragDisabled={!question.confirmed}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...(question.confirmed ? provided.dragHandleProps : {})}>
                  {type === 'Multi-choice' ? (
                    <MultiChoiceQuestion
                      questionId={question.id}
                      onDelete={() => handleDeleteQuestion(question.type, question.id)}
                      onConfirm={(id, content, options, correctOptionId, imageUrl) =>
                        handleConfirmQuestion(question.type, id, content, options, correctOptionId, imageUrl)
                      }
                      onEdit={() => handleEditQuestion(question.type, question.id)}
                      isConfirmed={question.confirmed}
                      isEditing={editingQuestionId === question.id}
                    />
                  ) : type === 'Reading' ? (
                    <ReadingQuestion
                      questionId={question.id}
                      onDelete={() => handleDeleteQuestion(question.type, question.id)}
                      onConfirm={(id, content, subQuestions, imageUrl) =>
                        handleConfirmQuestion(question.type, id, content, [], null, imageUrl, subQuestions)
                      }
                      onEdit={() => handleEditQuestion(question.type, question.id)}
                      isConfirmed={question.confirmed}
                      isEditing={editingQuestionId === question.id}
                    />
                  ) : type === 'Listening' ? (
                    <ListeningQuestion
                      questionId={question.id}
                      onDelete={() => handleDeleteQuestion(question.type, question.id)}
                      onConfirm={(id, subQuestions, audioUrl) =>
                        handleConfirmQuestion(question.type, id, '', [], null, null, subQuestions, audioUrl)
                      }
                      onEdit={() => handleEditQuestion(question.type, question.id)}
                      isConfirmed={question.confirmed}
                      isEditing={editingQuestionId === question.id}
                    />
                  ) : null}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </QuestionSection>
      )}
    </Droppable>
  );

  return (
    <ExamCreatePage>
      <h2>JPD113 - Week 1:</h2>
      <Form layout="vertical">
        <Form.Item label="Name">
          <Input value={examName} onChange={(e) => setExamName(e.target.value)} />
        </Form.Item>
      </Form>
      <DragDropContext
        onDragEnd={(result) => {
          if (selectedType === 'Multi-choice') {
            handleDragEnd(result, multiChoiceQuestions, setMultiChoiceQuestions);
          } else if (selectedType === 'Reading') {
            handleDragEnd(result, readingQuestions, setReadingQuestions);
          } else if (selectedType === 'Listening') {
            handleDragEnd(result, listeningQuestions, setListeningQuestions);
          }
        }}
      >
        {renderQuestionsByType('Multi-choice', multiChoiceQuestions, setMultiChoiceQuestions)}
        {renderQuestionsByType('Reading', readingQuestions, setReadingQuestions)}
        {renderQuestionsByType('Listening', listeningQuestions, setListeningQuestions)}
      </DragDropContext>
      <StyledButton type="dashed" onClick={handleAddQuestion} icon={<AiOutlinePlus />} disabled={isEditingQuestion}>
        Add Question
      </StyledButton>
      <Sidebar>
        <Button onClick={() => setSelectedType('Multi-choice')} disabled={isEditingQuestion}>Multi-choice</Button>
        <Button onClick={() => setSelectedType('Reading')} disabled={isEditingQuestion}>Reading</Button>
        <Button onClick={() => setSelectedType('Listening')} disabled={isEditingQuestion}>Listening</Button>
      </Sidebar>
      <StyledButton type="primary" onClick={handleSaveExam}>
        Complete
      </StyledButton>
    </ExamCreatePage>
  );
};

export default CourseExamCreate;

const ExamCreatePage = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Sidebar = styled.div`
  margin-top: 20px;
  button {
    display: block;
    margin-bottom: 10px;
  }
`;

const StyledButton = styled(Button)`
  display: block;
  margin: 10px 0;
`;

const QuestionSection = styled.div`
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;

  &:nth-child(1) {
    border-color: #ffa07a; /* Light Salmon for Multi-choice */
  }

  &:nth-child(2) {
    border-color: #8fbc8f; /* Dark Sea Green for Reading */
  }

  &:nth-child(3) {
    border-color: #6495ed; /* Cornflower Blue for Listening */
  }

  h3 {
    margin-bottom: 10px;
  }
`;
