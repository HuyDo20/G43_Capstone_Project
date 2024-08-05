import { convertDateToString } from "@/helper";
import { Button, DatePicker, Form, Input, Modal, notification, Pagination, Table, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

export interface Notification {
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

type NotiType = 'all'|'read'|'unread'
type PushNotiType = 'success' | 'info' | 'warning' | 'error';

interface NofiFetchResponse {
  current_page: number
  total_pages: number
  data: Notification[]
}

interface NotiFetchPayload {
  type: NotiType
  source_id?: number
  target_id?: number
  next_page?: number
  limit?: number
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

  const [notifications, setNotifications] = useState<Notification[]>([])
  const [newNotification, setNewNotification] = useState<Notification>(initNoti)

  const [activePage, setActivePage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)

  const [toast, contextHolder] = notification.useNotification() // TODO: update this notification for global use later

  const PAGE_LIMIT = 10
  const columns = [
    {
      title: "Id",
      dataIndex: "noti_id",
      key: "noti_id",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Noti date",
      dataIndex: "noti_date",
      key: "noti_date",
      render: (date: Date) => <span>{convertDateToString(date)}</span>,
    },
    {
      title: "Status",
      dataIndex: "noti_date",
      key: "noti_date",
      render: (date: Date) => <span>{(date < new Date()) ? 'Sent' : 'Not send'}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_value: any, record: Notification) => {
        return (
          <section>
            <Button color="warning" className="mr-4">EDIT</Button>
            <Button danger className="">DELETE</Button>
          </section>
        );
      },
    },
  ];

  useEffect(() => {
    fetchNoti()
  }, [])

  // ==== ASYNC FUNCTIONS ==== 
  const fetchNoti = (type: NotiType = 'all', next_page: number = 1, limit: number = PAGE_LIMIT) => {
    setLoading(true)
    const fetchNotiPayload : NotiFetchPayload = {
      type,
      // source_id: 1,
      next_page,
      limit
    }
    axios.post('/noti/findById', fetchNotiPayload)
      .then(res => {
        const data : NofiFetchResponse = res.data.data.data
        setNotifications(data.data)
        setActivePage(data.current_page)
        setTotalPages(data.total_pages)
      }).catch(err => {
        pushScreenNoti('Can not get notifications', 'error')
        console.error('Can not get notifications: ', err)
      }).finally(() => {
        setLoading(false)
      })
  }

  const createNoti = async () => {
    try {
      let token = "";
      const userEncode = localStorage.getItem("user");
      if (userEncode) {
        const userDecode = JSON.parse(userEncode);
        token = userDecode?.token;
      }

      const createNotiPayload = { 
        title: newNotification.title, 
        content: newNotification.content, 
        action: '', 
        target_id: 0, 
        source_id: 1,
        noti_date: convertDateToString(newNotification.noti_date, true)
      }

      console.log({createNotiPayload});
      
      const request = await axios.post("/noti", createNotiPayload , {
        headers: {
          Authorization: token,
        },
      });
      const response = request.data;
      if (response.statusCode === 201) {
        pushScreenNoti(response.data.message, 'success')
        return true
      }

      console.log('what is this?', response);
      return false
    } catch (error) {
      pushScreenNoti('Can not create new notification', 'error')
      console.error('Can not create new notification', error);
      return false
    }
  }

  // ==== LOGIC FUNCTIONS ====
  const handleChangeNewNoti = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewNotification({ ...newNotification, [name]: value });
  };

  const handleChangeNotiDate = (dateString: string) => {
    const notiDate = new Date(dateString)
    setNewNotification({ ...newNotification, noti_date: notiDate})
  }

  const handleCreateNoti = () => {
    setOpenCreateDialog(true);
  }

  const handleSubmitCreateNoti = async () => {

    setLoading(true);

    const isCreateNotiSuccess = await createNoti()

    if(isCreateNotiSuccess) {
      fetchNoti()
    }
    setLoading(false)
    setOpenCreateDialog(false);
  }

  const handleCancelCreateNoti = () => {
    setNewNotification(initNoti);
    setOpenCreateDialog(false);
  }

  const handleChangePageNoti = (page: number, pageSize: number) => {
    fetchNoti('all', page, pageSize)
  }

  // ==== UTILITY FUNCTIONS ====

  const pushScreenNoti = (message: string, type: PushNotiType = 'info') => {
    toast[type]({
      message,
    });
  };

  return (
    <div className="notification-page h-full">
        {contextHolder}
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
            <Table 
              className="notication-content__list"
              dataSource={notifications}
              columns={columns}
              pagination={false}
            />
            <Pagination
              className="mt-4"
              align="center"
              current={activePage}
              total={totalPages * PAGE_LIMIT}
              onChange={handleChangePageNoti}
            />
        </section>
        <Modal
          open={openCreateDialog}
          onOk={handleSubmitCreateNoti}
          onCancel={handleCancelCreateNoti}
          title="Create new notification"
          centered
          confirmLoading={loading}
          maskClosable={false}
          destroyOnClose={true}
          okText="Create"
        >
          <Form layout="vertical" autoComplete="off">
            <Form.Item label="Title">
              <Input
                value={newNotification.title}
                disabled={loading}
                onChange={handleChangeNewNoti}
                name="title"
              />
            </Form.Item>

            <Form.Item label="Content">
            <Input
                value={newNotification.content}
                disabled={loading}
                onChange={handleChangeNewNoti}
                name="content"
              />
            </Form.Item>

            <Form.Item label="Notify date" className="">
              <DatePicker
                showNow
                disabled={loading}
                onChange={(date: any, dateString: string) => handleChangeNotiDate(dateString)}
                className="block"
              />
            </Form.Item>
          </Form>
        </Modal>
    </div>
  );
}
