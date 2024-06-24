import { Modal, Form, Input, Button } from "antd";
import { useState } from "react";

function AddDayModal({ visible, onCancel, setDayData, dayData }) {
  const [dayTitle, setDayTitle] = useState("");
  const onSubmit = () => {
    setDayData([
      ...dayData,
      { day_name: dayTitle, lessons: [], day_status_id: 1, week_id: null },
    ]);
    setDayTitle("");
    onCancel();
  };
  return (
    <Modal
      title="Add New Day"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      destroyOnClose={true}
    >
      <Form>
        <Form.Item
          name="day_name"
          label="Day Name"
          rules={[{ required: true, message: "Day Name is required!" }]}
        >
          <Input
            value={dayTitle}
            onChange={(e) => setDayTitle(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={onSubmit}>
            Add Day
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddDayModal;
