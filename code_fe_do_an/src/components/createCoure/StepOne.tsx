import { Form, Input, Button, Upload } from "antd";
import ImgCrop from "antd-img-crop";

const StepOne = ({
  course,
  setCourse,
  fileList,
  setFileList,
  onPreview,
  handleNextStep,
}) => {
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  return (
    <Form layout="vertical">
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
            action="https://your-upload-url"
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
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
  );
};

export default StepOne;
