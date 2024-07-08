import { Form, Input, Button, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import axios from "axios";
import { useEffect } from "react";

const StepOne = ({
  course,
  setCourse,
  fileList,
  setFileList,
  onPreview,
  handleNextStep,
}) => {

  const onChange = (info) => {
    if (info.file.status === "done") {
      const newImageUrl = info.file.response.filePath;
      setFileList((prevUrls) => [...prevUrls, newImageUrl]);
    }
  };

  const handleUpload = async (options) => {
    const { file } = options;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload-file",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { filePath } = response.data; 
      setFileList([
        ...fileList,
        {
          uid: file.uid,
          name: file.name,
          status: "done",
          url: filePath,
        },
      ]);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      course_name: course.course_name,
      week: course.week,
      description: course.description,
    });
  }, [course, form]);

  return (
    <>
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Course Name"
          name="course_name"
          rules={[{ required: true, message: "Please input the course name!" }]}
        >
          <Input
            placeholder="Enter course name"
            name="course_name"
            value={course.course_name}
            onChange={handleChangeInput}
          />
        </Form.Item>

        <Form.Item label="Week" name="week">
          <Input
            placeholder="Enter number of weeks"
            type="number"
            name="week"
            value={course.week}
            onChange={handleChangeInput}
          />
        </Form.Item>

        <Form.Item label="Image" name="course_image">
          <ImgCrop rotationSlider>
            <Upload
              customRequest={handleUpload}
              action="http://localhost:5000/upload-file"
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              name="files"
            >
              {fileList.length < 5 && "+ Upload"}
            </Upload>
          </ImgCrop>
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea
            rows={4}
            placeholder="Enter description"
            name="description"
            value={course.description}
            onChange={handleChangeInput}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            onClick={handleNextStep}
            style={{ width: "100%" }}
          >
            Next
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default StepOne;
