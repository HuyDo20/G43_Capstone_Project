import { Button, Card, DatePicker, Form, Input, Modal, Table, Typography } from "antd";
import { useState } from "react";

interface Notification {
  noti_id: number
  title: string
  content: string
  is_read: boolean,
  action: string
  target_id: number
  source_id: number
  noti_date: Date 
  created_at: Date 
}

const initNoti: Notification = {
  noti_id: 0,
  title: "",
  content: "",
  is_read: false,
  action: "",
  target_id: 0,
  source_id: 0,
  noti_date: new Date(),
  created_at: new Date(),
}

export default function NotiManagementPage() {

  const [loading, setLoading] = useState(false)
  const [openCreateDialog, setOpenCreateDialog] = useState(false)

  const [newNotification, setNewNotification] = useState<Notification>(initNoti)

  const fetchNoti = () => {

  }

  const handleCreateNoti = () => {
    setOpenCreateDialog(true);
  }

  const handleSubmitCreateNoti = () => {
    setOpenCreateDialog(false);
  }

  const handleCancelCreateNoti = () => {
    setOpenCreateDialog(false);
  }

  return (
    <div className="notification-page h-full">
        <Typography.Title level={2} className="text-center">Notification management</Typography.Title>
        <section className="notification-content h-full">
            <div className="notication-content__action flex justify-end mb-3">
                <Button 
                  type="primary" 
                  className=""
                  onClick={handleCreateNoti}
                >
                  Create new notification
                </Button>
            </div>
            <Table className="notication-content__list">
                
            </Table>
        </section>
        <Modal
          open={openCreateDialog}
          onOk={handleSubmitCreateNoti}
          onCancel={handleCancelCreateNoti}
          title="Create new notification"
          centered
          // confirmLoading={true}
          maskClosable={false}
          destroyOnClose={true}
          okText="Create"
        >
          <Form layout="vertical" autoComplete="off">
            <Form.Item label="Title">
              <Input
                value={newNotification.title}
                onChange={() => {}}
                name="title"
              />
            </Form.Item>

            <Form.Item label="Content">
            <Input
                value={newNotification.content}
                onChange={() => {}}
                name="content"
              />
            </Form.Item>

            <Form.Item label="Notify date" className="">
              <DatePicker onChange={() => {}} className="block"/>
            </Form.Item>
          </Form>
        </Modal>
    </div>
  );
}
