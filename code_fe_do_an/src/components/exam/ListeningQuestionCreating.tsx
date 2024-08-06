import React, { useState, useEffect } from 'react';
import { Input, Button, Upload, message } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';
import { RcFile } from 'antd/es/upload/interface';
import ImgCrop from 'antd-img-crop';
import { AiOutlinePlus, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import styled from 'styled-components';
import axios from 'axios';
import MultiChoiceQuestion from './MultiChoiceQuestionCreating';

interface ListeningQuestionProps {
  questionId: number;
  onDelete: (id: number) => void;
  onConfirm: (id: number, questions: any[], audioUrl: string | null) => void;
  onEdit: (id: number) => void;
  isEditing?: boolean;
  isConfirmed?: boolean;
}

const ListeningQuestionCreating: React.FC<ListeningQuestionProps> = ({ questionId, onDelete, onConfirm, onEdit, isEditing = true, isConfirmed = false }) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (!isEditing && !isConfirmed) {
      setQuestions([]);
      setAudioUrl(null);
      setFileList([]);
    }
  }, [isEditing, isConfirmed]);

  const handleAddQuestion = () => {
    if (isEditing) {
      setQuestions([...questions, { id: Date.now(), isEditing: true }]);
    }
  };

  const handleDeleteQuestion = (id: number) => {
    if (isEditing) {
      setQuestions(questions.filter(question => question.id !== id));
    }
  };

  const handleConfirmQuestion = (id: number, questionContent: string, options: any[], correctOptionId: number, imageUrl: string | null) => {
    setQuestions(questions.map(question =>
      question.id === id ? { ...question, questionContent, options, correctOptionId, imageUrl, isEditing: false } : question
    ));
  };

  const handleAudioUpload = async (info: UploadChangeParam) => {
    if (info.file.status === 'done') {
      const newAudioUrl = URL.createObjectURL(info.file.originFileObj as RcFile);
      setAudioUrl(newAudioUrl);
      setFileList([{
        uid: info.file.uid,
        name: info.file.name,
        status: 'done',
        url: newAudioUrl,
      }]);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleUpload = async (options: any) => {
    const { file } = options;

    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('http://localhost:5000/upload-file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { filePath } = response.data;
      setFileList([{
        uid: file.uid,
        name: file.name,
        status: 'done',
        url: filePath,
      }]);
      setAudioUrl(filePath);
    } catch (error) {
      message.error('Upload failed.');
    }
  };

  const beforeUpload = (file: RcFile) => {
    if (fileList.length >= 1) {
      alert('You can only upload one audio file.');
      return false;
    }
    return true;
  };

  const handleRemoveAudio = () => {
    setAudioUrl(null);
    setFileList([]);
  };

  const handleConfirm = () => {
    if (questions.length === 0 || audioUrl === null) {
      message.warning('Please ensure at least one question is added and an audio file is uploaded.');
      return;
    }
    onConfirm(questionId, questions, audioUrl);
  };

  return (
    <ListeningContainer>
      <ListeningHeader>
        <h3>Listening Question {questionId}:</h3>
        <ListeningActions>
          {isConfirmed && <AiOutlineEdit onClick={() => onEdit(questionId)} />}
          <AiOutlineDelete onClick={() => onDelete(questionId)} />
        </ListeningActions>
      </ListeningHeader>
      {isEditing && (
        <>
          <Upload
            customRequest={handleUpload}
            listType="picture-card"
            fileList={fileList}
            onChange={handleAudioUpload}
            beforeUpload={beforeUpload}
            maxCount={1}
            onRemove={handleRemoveAudio}
            showUploadList={{
              showPreviewIcon: false,
              showRemoveIcon: true,
              showDownloadIcon: false,
            }}
          >
            {fileList.length < 1 && '+ Upload Audio'}
          </Upload>
        </>
      )}
      {questions.map((question) => (
        <MultiChoiceQuestion
          key={question.id}
          questionId={question.id}
          onDelete={handleDeleteQuestion}
          onConfirm={handleConfirmQuestion}
          onEdit={() => isEditing && setQuestions(questions.map(q => q.id === question.id ? { ...q, isEditing: true } : q))}
          isConfirmed={!question.isEditing}
          isEditing={question.isEditing}
          isParentEditing={isEditing}
        />
      ))}
      {isEditing && (
        <AddQuestionButton type="dashed" onClick={handleAddQuestion} icon={<AiOutlinePlus />}>
          Add Question
        </AddQuestionButton>
      )}
      {isEditing && (
        <ConfirmButton type="primary" onClick={handleConfirm}>
          Confirm
        </ConfirmButton>
      )}
    </ListeningContainer>
  );
};

export default ListeningQuestion;

const ListeningContainer = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
`;

const ListeningHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ListeningActions = styled.div`
  display: flex;
  gap: 10px;
  svg {
    cursor: pointer;
  }
`;

const AddQuestionButton = styled(Button)`
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ConfirmButton = styled(Button)`
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;
