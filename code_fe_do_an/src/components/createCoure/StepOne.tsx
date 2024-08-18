import { Form, Input, Button, Upload, notification, Select } from "antd";
import ImgCrop from "antd-img-crop";
import axios from "axios";
import { useEffect } from "react";

const { Option } = Select;

const StepOne = ({
  course,
  setCourse,
  fileList,
  setFileList,
  onPreview,
  handleNextStep,
  mode,
}) => {
  const onChange = (info) => {
    if (info.file.status === "done") {
      const newImageUrl = info.file.response.filePath;
      setFileList([newImageUrl]);
    }
  };

  const beforeUpload = (file) => {
    if (fileList.length >= 1) {
      alert("Upload failed, just have one image in here");
      return false;
    }
    return true;
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
        {
          uid: file.uid,
          name: file.name,
          status: "done",
          url: filePath,
        },
      ]);
    } catch (error) {
       notification.error({
          message: "Upload failed:",
          description: `Error: ${error.message}`,
        });
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setCourse({ ...course, [name]: value });
  };

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      course_name: course.course_name,
      week: course.week,
      description: course.description,
      course_skill: course.course_skill,
      course_level: course.course_level,
    });
  }, [course, form]);

  return (
    <>
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Tên khóa học"
          name="course_name"
          rules={[{ required: true, message: "Hãy nhập tên khóa học!" }]}
        >
          <Input
            placeholder="Nhập tên khóa học"
            name="course_name"
            value={course.course_name}
            onChange={handleChangeInput}
            readOnly={mode === "view"}
          />
        </Form.Item>

        <Form.Item label="Số tuần" name="week">
          <Input
            readOnly={mode === "view"}
            placeholder="Enter number of weeks"
            type="number"
            name="week"
            value={course.week}
            min={0}
            max={12}
            onChange={handleChangeInput}
          />
        </Form.Item>

        <Form.Item label="Hình ảnh" name="course_image">
          <ImgCrop rotationSlider>
            <Upload
              customRequest={handleUpload}
              action="http://localhost:5000/upload-file"
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              name="files"
              disabled={mode === "view"}
              beforeUpload={beforeUpload}
              maxCount={1}
              onRemove={() => setFileList([])}
              showUploadList={{
                showPreviewIcon: false,
                showRemoveIcon: true,
                showDownloadIcon: false,
              }}
            >
              {fileList.length < 5 && "+ Chọn ảnh"}
            </Upload>
          </ImgCrop>
        </Form.Item>

        <Form.Item
          label="Mô tả khóa học :"
          name="description"
          rules={[{ required: true, message: "Hãy nhập mô tả!!" }]}
        >
          <Input.TextArea
            readOnly={mode === "view"}
            rows={4}
            placeholder="Nhập nội dung mô tả khóa học......"
            name="description"
            value={course.description}
            onChange={handleChangeInput}
          />
        </Form.Item>

        {/* New Form Item for Course Level */}
        <Form.Item
          label="Course Level"
          name="course_level"
          rules={[{ required: true, message: "Please select a course level!" }]}
        >
          <Select
            disabled={mode === "view"}
            value={course.course_level}
            onChange={(value) => handleSelectChange("course_level", value)}
          >
            {["N1", "N2", "N3", "N4", "N5"].map((level) => (
              <Option key={level} value={level}>
                {level}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* New Form Item for Course Skill */}
        <Form.Item
          label="Course Skill"
          name="course_skill"
          rules={[{ required: true, message: "Please enter course skill!" }]}
        >
          <Input
            placeholder="Enter course skill"
            name="course_skill"
            value={course.course_skill}
            onChange={handleChangeInput}
            readOnly={mode === "view"}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            onClick={handleNextStep}
            style={{ width: "100%" }}
          >
            Tiếp theo 
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default StepOne;
