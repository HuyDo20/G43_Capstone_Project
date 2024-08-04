import React, { useState, useEffect } from 'react';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hook/AuthContext';
import { AiOutlinePlus } from 'react-icons/ai';
import styled from 'styled-components';
import MultiChoiceQuestion from '@/components/exam/MultiChoiceQuestion';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface Question {
  id: number;
  type: string;
  content: string;
  options: any[];
  correctOptionId: number | null;
  imageUrl: string | null;
  confirmed: boolean;
}

const defaultQuestion: Question = {
  id: 0,
  type: '',
  content: '',
  options: [],
  correctOptionId: null,
  imageUrl: null,
  confirmed: false,
};

const generateRandomId = () => {
  return Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit random number
};

const CourseExamCreate: React.FC = () => {
  const [examName, setExamName] = useState('');
  const [multiChoiceQuestions, setMultiChoiceQuestions] = useState<Question[]>([]);
  const [readingQuestions, setReadingQuestions] = useState<Question[]>([]);
  const [listeningQuestions, setListeningQuestions] = useState<Question[]>([]);
  const [selectedType, setSelectedType] = useState('');
  const [editingQuestionId, setEditingQuestionId] = useState<number | null>(null);
  const [reload, setReload] = useState(false);
  const [isEditingQuestion, setIsEditingQuestion] = useState(false);
  const navigate = useNavigate();
  const { handleFetch } = useAuth();

  useEffect(() => {
    if (reload) {
      // fetch exam data if needed
      setReload(false);
    }
  }, [reload]);
  useEffect(() => {
    console.log("current list data:" + JSON.stringify(multiChoiceQuestions));
  }, [multiChoiceQuestions]);

  const handleAddQuestion = () => {
    if (isEditingQuestion) {
      message.warning('Please confirm the current question before adding a new one.');
      return;
    }
    const newQuestion = { ...defaultQuestion, type: 'Multi-choice', id: generateRandomId() };
    setMultiChoiceQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    setEditingQuestionId(newQuestion.id);
    setIsEditingQuestion(true);
  };

  const handleDeleteQuestion = (type: string, id: number) => {
      if (isEditingQuestion) {
      message.warning('Please confirm the current question before adding a new one.');
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
    correctOptionId: number,
    imageUrl: string
  ) => {
    if (type === 'Multi-choice') {
      updateOrCreateQuestion(multiChoiceQuestions, setMultiChoiceQuestions, id, type, questionContent, options, correctOptionId, imageUrl);
    } else if (type === 'Reading') {
      updateOrCreateQuestion(readingQuestions, setReadingQuestions, id, type, questionContent, options, correctOptionId, imageUrl);
    } else if (type === 'Listening') {
      updateOrCreateQuestion(listeningQuestions, setListeningQuestions, id, type, questionContent, options, correctOptionId, imageUrl);
    }
    setEditingQuestionId(null);
    setIsEditingQuestion(false);
  };

  const updateOrCreateQuestion = (
    questions: Question[],
    setQuestions: React.Dispatch<React.SetStateAction<Question[]>>,
    id: number,
    type: string,
    questionContent: string,
    options: any[],
    correctOptionId: number,
    imageUrl: string
  ) => {
    const questionExists = questions.some((q) => q.id === id);
    if (questionExists) {
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) => (q.id === id ? { ...q, content: questionContent, options, correctOptionId, imageUrl, confirmed: true } : q))
      );
    } else {
      const newQuestion = {
        ...defaultQuestion,
        id,
        type,
        content: questionContent,
        options,
        correctOptionId,
        imageUrl,
        confirmed: true,
      };
      setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    }
  };

  const handleEditQuestion = (id: number) => {
    setEditingQuestionId(id);
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
                  {question.type === 'Multi-choice' && (
                    <MultiChoiceQuestion
                      questionId={question.id}
                      onDelete={() => handleDeleteQuestion(question.type, question.id)}
                      onConfirm={(id, content, options, correctOptionId, imageUrl) =>
                        handleConfirmQuestion(question.type, id, content, options, correctOptionId, imageUrl)
                      }
                      onEdit={() => handleEditQuestion(question.id)}
                      isConfirmed={question.confirmed}
                      isEditing={editingQuestionId === question.id}
                    />
                  )}
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
