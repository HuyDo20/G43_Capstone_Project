import {
  Modal,
  Form,
  Radio,
  Button,
  Space,
  Input,
  Flex,
  Divider,
  Select,
  Upload,
} from "antd";
const { Option } = Select;
import ImgCrop from "antd-img-crop";
import { useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import type { GetProp, UploadFile, UploadProps } from "antd";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

function AddLessonModal({ visible, onCancel, dayData, setDayData }) {
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);
  const [userChose, setUserChose] = useState(0);
  const [userSelected, setUserSelected] = useState(null);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onSubmit = (values) => {
    const cloneDayData = [...dayData];
    cloneDayData[values.day_id].lessons.push({
      ...values,
      type: values.vocab_name
        ? "vocab"
        : values.kanji_name
        ? "kanji"
        : values.video_name
        ? "video"
        : values.grammar_name
        ? "grammar"
        : null,
    });
    setDayData(cloneDayData);
    onCancel();
  };
  return (
    <Modal
      title="Add New Lesson"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      destroyOnClose={true}
    >
      {userChose === 0 ? (
        <Form layout="vertical">
          <Form.Item
            name="lessonType"
            label="Select Lesson Type:"
            rules={[
              { required: true, message: "Please select the lesson type!" },
            ]}
          >
            <Radio.Group onChange={(e) => setUserSelected(e.target.value)}>
              <Space direction="vertical">
                <Radio value={1}>Vocab</Radio>
                <Radio value={2}>Kanji</Radio>
                <Radio value={3}>Grammar</Radio>
                <Radio value={4}>Video</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={() => setUserChose(userSelected)}>
              Next
            </Button>
          </Form.Item>
        </Form>
      ) : userChose === 1 ? (
        <>
          <Form layout="vertical" onFinish={onSubmit}>
            <Form.Item
              name="vocab_name"
              label="Vocabulary Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="day_id"
              label="Select Day"
              rules={[{ required: true, message: "Please select the day!" }]}
            >
              <Select placeholder="Select a day">
                {dayData.map((day, index) => (
                  <Option key={index} value={index}>
                    Day {index + 1}: {day.day_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="vocab_kanji" label="Kanji">
              <Input />
            </Form.Item>
            <Form.Item name="vocab_meaning" label="Meaning">
              <Input />
            </Form.Item>
            <Form.Item name="vocab_example" label="Example">
              <Input />
            </Form.Item>
            <Form.Item
              name="vocab_status_id"
              label="Example"
              style={{ display: "none" }}
            >
              <Input value={"1"} />
            </Form.Item>
            {/* <Form.Item name="vocab_image" label="Image URL">
              <Input />
            </Form.Item> */}
            <Form.Item label="Image" name="vocab_image">
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
            {/* <Form.Item name="vocab_audio" label="Audio URL">
              <Input />
            </Form.Item> */}
            <Form.Item label="Audio" name="vocab_audio">
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
            <Form.Item>
              <Flex
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  type="dashed"
                  onClick={() => {
                    setUserChose(0);
                  }}
                >
                  Return
                </Button>
                <Button type="primary" htmlType="submit">
                  Submit Vocabulary
                </Button>
              </Flex>
            </Form.Item>
          </Form>
        </>
      ) : userChose === 2 ? (
        <>
          <Form layout="vertical" onFinish={onSubmit}>
            <Form.Item
              name="kanji_name"
              label="Kanji Name"
              rules={[
                { required: true, message: "Please enter the kanji name." },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="day_id"
              label="Select Day"
              rules={[{ required: true, message: "Please select the day!" }]}
            >
              <Select placeholder="Select a day">
                {dayData.map((day, index) => (
                  <Option key={index} value={index}>
                    Day {index + 1}: {day.day_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="kanji_status_id"
              label="Example"
              style={{ display: "none" }}
            >
              <Input value={"1"} />
            </Form.Item>
            <Form.Item name="cv_spelling" label="CV Spelling">
              <Input />
            </Form.Item>
            <Form.Item name="kanji_kunyomi" label="Kunyomi">
              <Input />
            </Form.Item>
            <Form.Item name="kanji_onyomi" label="Onyomi">
              <Input />
            </Form.Item>
            {/* <Form.Item name="kanji_image" label="Image URL">
              <Input />
            </Form.Item> */}
            <Form.Item label="Image" name="kanji_image">
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
            <Form.List name="kanji_words">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "kanji_word"]}
                        rules={[
                          { required: true, message: "Missing Kanji word" },
                        ]}
                      >
                        <Input placeholder="Kanji Word" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "hiragana_character"]}
                      >
                        <Input placeholder="Hiragana Character" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "kanji_word_meaning"]}
                      >
                        <Input placeholder="Meaning" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Kanji Word
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item>
              <Flex
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  type="dashed"
                  onClick={() => {
                    setUserChose(0);
                  }}
                >
                  Return
                </Button>
                <Button type="primary" htmlType="submit">
                  Submit Kanji
                </Button>
              </Flex>
            </Form.Item>
          </Form>
        </>
      ) : userChose === 3 ? (
        <>
          <Form name="grammar_form" autoComplete="off" onFinish={onSubmit}>
            <Form.Item
              name="grammar_name"
              label="Grammar Name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter Grammar name" />
            </Form.Item>
            <Form.Item
              name="grammar_status_id"
              label="Example"
              style={{ display: "none" }}
            >
              <Input value={"1"} />
            </Form.Item>
            <Form.Item
              name="day_id"
              label="Select Day"
              rules={[{ required: true, message: "Please select the day!" }]}
            >
              <Select placeholder="Select a day">
                {dayData.map((day, index) => (
                  <Option key={index} value={index}>
                    Day {index + 1}: {day.day_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="grammar_structure" label="Grammar Structure">
              <Input placeholder="Enter Grammar structure" />
            </Form.Item>
            <Form.Item name="grammar_description" label="Grammar Description">
              <Input placeholder="Enter Grammar description" />
            </Form.Item>
            {/* <Form.Item name="grammar_image" label="Image URL">
              <Input placeholder="Enter image URL" />
            </Form.Item> */}
            <Form.Item label="Image" name="grammar_image">
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

            <Form.List name="grammar_examples">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "grammar_example"]}
                        rules={[
                          {
                            required: true,
                            message: "Please enter a grammar example",
                          },
                        ]}
                      >
                        <Input placeholder="Grammar Example" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "grammar_example_meaning"]}
                      >
                        <Input placeholder="Example Meaning" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Grammar Example
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Form.Item>
              <Flex
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  type="dashed"
                  onClick={() => {
                    setUserChose(0);
                  }}
                >
                  Return
                </Button>
                <Button type="primary" htmlType="submit">
                  Submit Grammar
                </Button>
              </Flex>
            </Form.Item>
          </Form>
        </>
      ) : userChose === 4 ? (
        <>
          <Form autoComplete="off" layout="vertical" onFinish={onSubmit}>
            <Form.Item
              name="video_name"
              label="Video Name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter video name" />
            </Form.Item>
            <Form.Item
              name="video_status_id"
              label="Example"
              style={{ display: "none" }}
            >
              <Input value={"1"} />
            </Form.Item>
            {/* <Form.Item
              name="video_link"
              label="Video Link"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter video link" />
            </Form.Item> */}
            <Form.Item label="Video" name="video_link">
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
              name="day_id"
              label="Select Day"
              rules={[{ required: true, message: "Please select the day!" }]}
            >
              <Select placeholder="Select a day">
                {dayData.map((day, index) => (
                  <Option key={index} value={index}>
                    Day {index + 1}: {day.day_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.List name="questions">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: 8,
                      }}
                      align="start"
                    >
                      <Divider>Question {key + 1}</Divider>
                      <Form.Item
                        {...restField}
                        name={[name, "question_content"]}
                        label="Question Content"
                        rules={[
                          {
                            required: true,
                            message: "Missing question content",
                          },
                        ]}
                      >
                        <Input placeholder="Enter question content" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "question_answer"]}
                        label="Question Answer"
                      >
                        <Input placeholder="Enter correct answer" />
                      </Form.Item>

                      <Form.List name={[name, "options"]}>
                        {(
                          optionFields,
                          { add: addOption, remove: removeOption }
                        ) => (
                          <>
                            {optionFields.map((option) => (
                              <Space key={option.key} align="baseline">
                                <Form.Item
                                  {...option}
                                  name={[option.name, "option_content"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing option content",
                                    },
                                  ]}
                                >
                                  <Input placeholder="Option content" />
                                </Form.Item>
                                <MinusCircleOutlined
                                  onClick={() => removeOption(option.name)}
                                />
                              </Space>
                            ))}
                            <Form.Item>
                              <Button
                                type="dashed"
                                onClick={() => addOption()}
                                icon={<PlusOutlined />}
                              >
                                Add Option
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>

                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    >
                      Add Question
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Form.Item>
              <Flex
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  type="dashed"
                  onClick={() => {
                    setUserChose(0);
                  }}
                >
                  Return
                </Button>
                <Button type="primary" htmlType="submit">
                  Submit Video
                </Button>
              </Flex>
            </Form.Item>
          </Form>
        </>
      ) : null}
    </Modal>
  );
}

export default AddLessonModal;
